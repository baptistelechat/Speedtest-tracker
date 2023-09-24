<h1 align="center">SpeedTest Tracker 🚀</h1>

A full-stack web application for monitoring internet speed test data, including a Node.js backend with an API for data retrieval and a script with a CRON task to generate a JSON file periodically. A React frontend is available for visualization of key metrics.

## 📸 Project's Screenshots

### Main page

![main page](./screenshot.png)

## ✨ Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 🚩 Prerequisites

You need to install SpeedTest CLI from the Ookla website and NodeJS if you want to run the project locally:

- https://www.speedtest.net/apps/cli
- https://nodejs.org/en/download/

If you want to use Docker for deployment, you don't need this last step, but you do need to install Docker on the machine that will run the project:

- https://www.docker.com/

### ✔ Installing (Locally)

A step by step that tell you how to get a development env running.

Step 1: clone the project by using the commands below :

```bash
git clone https://github.com/baptistelechat/Speedtest-tracker.git
```

Step 2: Copy .env.example to the project root, rename it .env and configure it as required

```bash
# APP_MODE = WIN_DEVELOPMENT
# APP_MODE = WIN_PRODUCTION
# APP_MODE = UNIX_DEVELOPMENT
APP_MODE = UNIX_PRODUCTION

WINDOWS_SPEEDTEST_CLI_PATH = C:\\chemin\\vers\\speedtest.exe

API_PORT = 3000
APP_PORT = 5173
FRONTEND_URL_LOCAL = FRONTEND_URL_LOCAL
FRONTEND_URL_PUBLIC = FRONTEND_URL_PUBLIC
```

#### 🧠 Prerequisites (script)

Step 1: go to the "script" folder and install the packages :

```bash
pnpm install
```

Step 2: start your local server (script):

```bash
pnpm dev
```

Step 3 : The result of speedtest is printed in the terminal

#### 💻 Prerequisites (app)

Step 1: go to the "app" folder and do the same as previously. Copy .env.example to the project root, rename it .env and configure it as required :

```bash
VITE_API_URL = http://localhost:3000
```

Step 2: Install the packages :

```bash
pnpm install
```

Step 3: start your local server (frontend):

```bash
pnpm dev
```

Step 4 : open a browser and go to localhost:3000

```bash
http://localhost:3000 (or other if you setup a different port in vite.config.ts)
```

#### 🚦 Prerequisites (api)

Step 1: go to the "api" folder and install the packages :

```bash
pnpm install
```

Step 2: start your local server (api):

```bash
pnpm dev
```

Step 4 : open a browser and go to http://localhost:5000

```bash
localhost:5000 (or other if you setup a different port in root .env)
```

#### 🐳 Prerequisites (docker)

Step 1: Copy .env.example to the project root, rename it .env and configure it as required

```bash
# APP_MODE = WIN_DEVELOPMENT
# APP_MODE = WIN_PRODUCTION
# APP_MODE = UNIX_DEVELOPMENT
APP_MODE = UNIX_PRODUCTION

WINDOWS_SPEEDTEST_CLI_PATH = C:\\chemin\\vers\\speedtest.exe

API_PORT = 3000
APP_PORT = 5173
FRONTEND_URL_LOCAL = FRONTEND_URL_LOCAL
FRONTEND_URL_PUBLIC = FRONTEND_URL_PUBLIC
```

Step 2: go to the "app" folder and do the same as previously. Copy .env.example to the project root, rename it .env and configure it as required :

```bash
VITE_API_URL = http://localhost:3000
```

Step 3: Lauch docker-compose.yml file

```bash
docker-compose up -d
```

Step 4 : open a browser and go to localhost:3000 for watch app in action

```bash
http://localhost:3000 (or other if you setup a different port in vite.config.ts)
```

Step 5 : open a browser and go to http://localhost:5000 for watch API in action

```bash
localhost:5000 (or other if you setup a different port in root .env)
```

Step 6 : Check if script for speedTest run
```bash
docker logs -f <CONTAINER_ID>
```

## 📚 API Reference

[Go to API Documentation](https://github.com/baptistelechat/Speedtest-tracker/tree/main/api)

## 🏗 Built With

- React → https://fr.reactjs.org/
- TypeScript → https://fr.reactjs.org/
- PNPM → https://fr.reactjs.org/
- Shadcn/ui → https://ui.shadcn.com/
- Recharts → https://recharts.org/en-US/
- Express → https://expressjs.com/fr/
- Docker → https://www.docker.com/

<p align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" width="150">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" width="150">
<img src="https://avatars.githubusercontent.com/u/21320719?s=200&v=4" width="150">
<img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" width="150">
<img src="https://avatars.githubusercontent.com/u/5429470?s=200&v=4" width="150">
</p>

## 😸 Maintainers

This project is mantained by:

- [Baptiste LECHAT - baptistelechat](https://github.com/baptistelechat)

## 👨‍💻👩‍💻 Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push your branch (git push origin my-new-feature)
5. Create a new Pull Request

## ⭐ Show your support

Give a ⭐️ for support the project or if this project helped you !

## 😂 Gitmoji

This project use Gitmoji : "An emoji guide for your commit messages".

<p align="left">
	<a href="https://gitmoji.carloscuesta.me">
		<img src="https://cloud.githubusercontent.com/assets/7629661/20073135/4e3db2c2-a52b-11e6-85e1-661a8212045a.gif" width="250" alt="gitmoji">
	</a>
</p>
<p align="left">
	<a href="https://travis-ci.org/carloscuesta/gitmoji">
		<img src="https://img.shields.io/travis/carloscuesta/gitmoji/master?style=flat-square"
			 alt="Build Status">
	</a>
	<a href="https://gitmoji.carloscuesta.me">
		<img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
			 alt="Gitmoji">
	</a>
</p>
