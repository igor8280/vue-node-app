# EPG Metadata

Project main goal is automation in creating EPG schemas using XMLTV format (human readable format). Also, creating database with augmented assets data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Latest LTS version of [NodeJS](https://nodejs.org/en/)
Advanced Production Process Manager for Node.js [PM2](https://pm2.io/runtime/). (can be installed globally)
Database [MongoDB](https://www.mongodb.com/) (there should be 2 database per instance. one for production and another one for testing!!!)

(installing NodeJS and MongoDB vary depending on the OS...)

```
npm install pm2 -g
```

### Installing

To create a running version of application, one should run 'build' script from package.json.
What build script will do is next:

1. Create 'dist/' folder with compiled code to ES5.
2. Install npm dependency packages
3. Start/restart pm2 process

For setting up environment for pm2 process, there is config file called ecosystem.config.js. This file should be configured properly!!! (depends on host environment)

```
npm run build
```

If success, you should be seeing this:
```
[PM2][WARN] Applications TestApp not running, starting...
[PM2] App [TestApp] launched (1 instances)
┌──────────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
│ App name     │ id │ mode │ pid  │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
├──────────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
│ TestApp      │ 0  │ fork │ 3961 │ online │ 0       │ 0s     │ 0%  │ 20.5 MB   │ igor │ disabled │
└──────────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## Running the tests

Test are run with 'test' command.

This is a API endpoint test. It test standard CRUD methods.

```
npm run test
```

## Deployment

No additional notes about how to deploy this on a live system (for now)

## Built With

* [NodeJS](NodeJS](https://nodejs.org/en/) - Server technology
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Express](https://expressjs.com/) - Used to generate routes
* [MongoDB](https://www.mongodb.com/) - Storage engine

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Igor Gojkovic <igor.gojkovic@team4js.com>** - *Hive Software Solutions*
* **Milos Markovic <milos.markovic@team4js.com>** - *Marsovski*
* **Andrija Gojkovic <andrija.gojkovic@team4js.com>** - *Remote Coding*

## License

This project is licensed under the Copyright License

