# Zendesk Theme

## Getting Started
1. [Install node](https://nodejs.org/en/)
2. Install all dependencies with `npm install`

### Setting up local theme preview
Zendesk apps tools (ZAT) allows the capability to set up local theme preview. To get started:
1. [Install ruby](https://www.ruby-lang.org/en/) version 2.0 or later.
2. Install the same version of `ruby-dev` (ie: `ruby2.5-dev` if you are on version 2.5.0).
3. [Install bundler](https://bundler.io/) via `gem install bundler`.
4. In the root directory, run `bundle install`.
5. To update to the latest version of ZAT, run `bundle update zendesk_apps_tools`.
6. Enable API access in Zendesk Support account by going to *Admin > Channels > API*, make sure to save the auth token.

### Using local theme preview
1. [Build](#build-&-zip), then run `zat theme preview` in the `dist` folder.
2. At prompt, enter your Zendesk login email with the string `/token` for username. For example `joe.bloggs@client.com/token`. Use the actual API token for password.
3. Follow the prompt and navigate to the `Ready` URL to see a local preview of the theme.
4. Make changes in `src`,refresh the browser window to see your changes reflected.

## Build & Zip
- `npm run build` to create a `dist` folder containing all the necessary minified theme files for Zendesk.
- `npm run build:dev` is meant to be used for development purposes. It will not minify css and javascript for debugging purposes.
- `npm run zip` to zip the theme files, which can be imported into Zendesk.

Either of the build scripts will watch for changes and when used in conjunction with local theme preview, will reflect live updates.  

## Browser Support
- [Browser support list](http://browserl.ist/?q=>0.25%25%2C+ie+11%2C+not+op_mini+all).
