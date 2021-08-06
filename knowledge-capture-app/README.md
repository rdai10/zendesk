# Knowledge Capture App

## Getting Started

### Dependencies

-   [Node.js](https://nodejs.org/en/) >= 6.11.5
-   [Ruby](https://www.ruby-lang.org/) >= 2.0.x

### Initial Setup

This project uses bundler 2.2.25 to manage Ruby dependencies. Install [bundler](https://bundler.io/) via `gem install bundler`.

In the root directory of this app, run `bundle install`.

To execute Zendesk App Tool [ZAT](https://developer.zendesk.com/apps/docs/apps-v2/getting_started#zendesk-app-tools) commands, run `bundle exect zat`.

Run `yarn install` to install npm dependencies.

### Running locally

To serve the app to your Zendesk instance with `?zat=true`, run

```
yarn run watch
zat server -p dist
```

### Building

To build for the development environment, run

```
yarn run build:dev
```

To build the production app, run

```
yarn run build
```

### Deploying

To check that your app will pass the server-side validation check, run

```
zat validate --path=dist
```

If validation is successful, you can upload the app into your Zendesk account by running

```
zat create --path=dist
```

To update your app after it has been created in your account, run

```
zat update --path=dist
```

Or, to create a zip archive for [manual upload](https://developer.zendesk.com/documentation/apps/getting-started/uploading-and-installing-a-private-app/#uploading-and-installing-a-private-app-in-zendesk-support), run

```
zat package --path=dist
```

### Zendesk Garden CSS Components

[Zendesk Garden CSS Components](https://garden.zendesk.com/css-components/) are listed dev dependencies. Instead of importing them into the app css bundle, the default behavior is loading the dev dependencies as [jsDelivr CDN](https://www.jsdelivr.com/) and injecting into `main.html` as another `<style>` tag.
