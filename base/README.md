# BC Seed Application

## Requirements

```sh
node.js v4.*
npm i -g eslint eslint-plugin-angular typings plop
```

## Setting up

```sh
npm config set msvs_version 2013 --global
npm i
typings install # optional - it should be run automatically on `npm i`
```

We recommend using [VSCode](https://code.visualstudio.com/) for editing Front-End stuff as it has configured linters to work with this application.
Suggested VSCode plugins to install: `stylelint`, `tslint`, `eslint`, `JavaScript (ES6) code snippets`.

## Running the app

```sh
gulp serve # Starts the site in dev mode (watch + serve site using built-in web server)
gulp serve:dist # Builds the app (using release configuration) and serve it using built-in web server
gulp build # Builds the app (using release configuration)
gulp [build | serve] --theme ukvi # Use different theme to build the app
```

## Running tests

```sh
npm run test # Runs client-side unit tests using karma runner
npm run test-ci # Runs client-side unit tests with simple reporter dedicated for CI
npm run test-debug # Runs client-side unit tests with the watch process (tests will rerun, when you save changes)
npm run test-baywatch # Did you break something and tests fail? Run this. Adds really verbose logging.

npm run e2e # Runs acceptance (e2e) tests
```

## Generate angular components

`plop`
 

## Working with the Seed Repository

### Create a new project using Seed

```
git clone -o boilerplate git@SEED_PROJ_URL.git new_proj
cd new_proj
git remote add origin git@PROJ_URL.git
git push origin master
```

#### Application Customization

You may also want to customize application name. You do this in following files:

`package.json` - this name will be used if you want to communicate with npm

`src/app/index.config.ts` and `src/index.html` - **appName** should be changed. You have to use the same name in those 2 files.

### Clone existing repo

```
git clone git@PROJ_URL.git new_proj
cd new_proj
git remote add boilerplate git@SEED_PROJ_URL.git
git fetch boilerplate
git branch --set-upstream-to=boilerplate/master seed
git checkout master
```

> When complete, your local repository will have 2 remotes attached:
> `boilerplate` - which points to the local `seed` branch (use this only if you want to send some changes directly to the seed project. And do so only from the `seed` branch)
> `origin` - which points to the local `master` branch (for every-day use)

> When doing anything on the `seed` branch, please be very careful and review thoroughly changes before commiting and sending them to the `boilerplate` remote. Also - good practice - use forking and Pull Request system for managing `boilerplate`'s code.

### Add something to the seed boilerplate

```
git checkout seed
git pull
# do something... (or cherry-pick)
git commit
git push boilerplate HEAD:master
```

> And propagate to the app by:

### Update project from the boilerplate

```
git fetch boilerplate
git merge boilerplate/master
# ... fix potential conflicts
git commit
```
