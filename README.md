<p align="center">
  <a href="https://github.com/cfa-mit/github-notifications-for-discord-action/actions"><img alt="typescript-action status" src="https://github.com/cfa-mit/github-notifications-for-discord-action/workflows/build-test/badge.svg"></a>
</p>

# Description

Github notifications for Discord action was built to facilitate Github <> Discord integration. Here at [CodeForAll](https://github.com/cfa-mit) we've felt the need to have a more intrusive way of understanding what's going on in Github - similar to what Github and Slack provide with the real time alerts - but also with more granularity and control comparing to the ordinary Github <> Discord webhooks.

This action's implementation is highly opinionated - notifications are not, by design, open to parameterization. The upside is that it should work out of the box with very few configuration required. Supported events are currently limited but we're always open to contributions.

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will check in the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
