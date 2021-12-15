SCRIPT_DIR=$(cd `dirname "$0"` && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."

function _info() {
  echo ""
  echo " ===> $1"
  echo ""
}

function _fail() {
  if [ ! -z "$1" ]; then
    echo "$1" 1>&2
  fi
  exit 1
}

function _to_lower()  {
  echo "$1" | awk '{ print tolower($1) }'
}

function _human_yes_no() {
  [ "$1" == 1 ] && echo 'Yes' || echo 'No'
}

function _yes_no_prompt() {
  while true; do
    read -p ">> $1? [Y/N] " yn
    case $yn in
        [Yy]* ) return 1;;
        [Nn]* ) return 0;;
        * ) echo "Please answer yes (Y) or no (N).";;
    esac
  done
}
