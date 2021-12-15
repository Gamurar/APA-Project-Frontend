React.js + Node.js + MongoDB project with **Aho–Corasick algorithm** implementation on backend.
This is the React.js frontend part.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deploying to a Server (e.g. `DigitalOcean`)

**Docker** and **Docker Compose** based deploys are compatible with `Ubuntu 20.04 (LTS) x64` (or similar)
and were tested on `DigitalOcean` ecosystem.

> You can run this script as soon as you create a DigitalOcean droplet, no additional setup required...

Deploying WHOLE infrastructure (e.g. as development environment) with help of **Docker Compose**:

```bash
# Set SSH_KEY=~/.ssh/custom_id_rsa to override default SSH key used (~/.ssh/id_rsa)
# Set DEPLOY_SERVER_ROOT=/custom/root to override default server root (/root/frontend)
# Set RENEW_CERTIFICATE=1 to force certificate renewal in case it's chained incorectly
DEPLOY_SERVER_DSN=root@138.68.83.144 DOMAIN=www.example.com ./bin/deploy.sh
```

> The script will deploy development infrastructure based on `docker-compose.yml`.

Tail logs of **Docker Compose** services:

```bash
# Set SSH_KEY=~/.ssh/custom_id_rsa to override default SSH key used (~/.ssh/id_rsa)
# Set DEPLOY_SERVER_ROOT=/custom/root to override default server root (/root/frontend)
# Available Docker services: frontend, https-portal
DEPLOY_SERVER_DSN=root@138.68.83.144 ./bin/logs.sh frontend
```

## Configure `Gitlab` CI/CD

```bash
# Set SSH_KEY=~/.ssh/custom_id_rsa to override default SSH key used (~/.ssh/id_rsa)
# Set DEPLOY_SERVER_ROOT=/custom/root to override default server root (/root/frontend)
ACCESS_TOKEN=kjKJkjhlkjhKLJHlkj PROJECT_ID=343 \
  DEPLOY_SERVER_DSN=root@159.65.127.249 DOMAIN=www.example.com \
    ./bin/gitlab-configure.sh dev
```

Updating from Boilerplate
-------------------------

In case boilerplate codebase updated after you extended your application codebase, you
might want to update (e.g. bugfixes) in an automated fashion:

```bash
./bin/self-update.sh
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
