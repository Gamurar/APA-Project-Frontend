#!/usr/bin/env bash

AUTHORIZED_KEYS_FILE='~/.ssh/authorized_keys'
GITLAB_HOST="gitlab.titanium.codes"
SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

source "$SCRIPT_DIR/_helpers.sh"

if [ -z "$ACCESS_TOKEN" ]; then
  _fail "Missing Gitlab ACCESS_TOKEN"
elif [ -z "$PROJECT_ID" ]; then
  _fail "Missing Gitlab PROJECT_ID (e.g. 324)"
elif [ -z "$DOMAIN" ]; then
  _fail "Missing DOMAIN (e.g. www.example.com)"
elif [ -z "$DEPLOY_SERVER_DSN" ]; then
  _fail "Missing DEPLOY_SERVER_DSN (e.g. root@138.68.83.144)"
fi

function create_var() {
  echo "[CREATE] $1 >> `curl -w "%{http_code}" --silent --request POST --header "PRIVATE-TOKEN: $ACCESS_TOKEN" "https://$GITLAB_HOST/api/v4/projects/$PROJECT_ID/variables" --form "key=$1" --form "value=$2" -o /dev/null`"
}

function delete_var() {
  echo "[DELETE] $1 >> `curl -w "%{http_code}" --silent --request DELETE --header "PRIVATE-TOKEN: $ACCESS_TOKEN" "https://$GITLAB_HOST/api/v4/projects/$PROJECT_ID/variables/$1" -o /dev/null`"
}

_info "Accessing working directory"
cd "$PROJECT_ROOT/" || _fail

_info "Cleaning up CI/CD variables"
delete_var "DOMAIN"
delete_var "DEPLOY_SERVER_DSN"
delete_var "DEPLOY_SERVER_ROOT"
delete_var "SSH_KEY_CONTENT"

_info "Preparing deploy environment"
if [ -z "$SSH_KEY" ]; then
  SSH_KEY="$HOME/.ssh/id_rsa"
fi

if [ -z "$DEPLOY_SERVER_ROOT" ]; then
  DEPLOY_SERVER_ROOT="/root/frontend"
fi

echo "{VAR} DOMAIN=$DOMAIN"
echo "{VAR} DEPLOY_SERVER_DSN=$DEPLOY_SERVER_DSN"
echo "{VAR} DEPLOY_SERVER_ROOT=$DEPLOY_SERVER_ROOT"
echo "{VAR} SSH_KEY=$SSH_KEY"

_info "Creating a deployment ssh key"
tmp_ssh_key_file=$(mktemp)
ssh-keygen -q -t rsa -N '' -f "$tmp_ssh_key_file" <<<y 2>&1 >/dev/null || _fail
public_ssh_key=$(cat "$tmp_ssh_key_file.pub")

_info "Whitelisting deployment key on remote server"
_CMD="$(cat <<-EOF
function _info() {
  echo ""
  echo " ===> \$1"
  echo ""
}

function _fail() {
  if [ ! -z "\$1" ]; then
    echo "\$1" 1>&2
  fi
  exit 1
}

_info 'Adding authorized ssh key: $public_ssh_key'
echo '$public_ssh_key' >> $AUTHORIZED_KEYS_FILE || _fail
EOF
)"
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" -t "$DEPLOY_SERVER_DSN" "$_CMD" || _fail

_info "Persisting CI/CD variables"
create_var "SSH_KEY_CONTENT" "$(cat $tmp_ssh_key_file)" || _fail
create_var "DEPLOY_SERVER_DSN" "$DEPLOY_SERVER_DSN" || _fail
create_var "DEPLOY_SERVER_ROOT" "$DEPLOY_SERVER_ROOT" || _fail
create_var "DOMAIN" "$DOMAIN" || _fail

_info "Cleaning up artifacts"
rm "$tmp_ssh_key_file" "$tmp_ssh_key_file.pub" || _fail