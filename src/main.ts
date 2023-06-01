import * as core from '@actions/core'
import {context} from '@actions/github'
import axios from 'axios'
import {PullRequestEvent} from '@octokit/webhooks-definitions/schema'

const toHumanReadable = (action: string): string => action.split('_').join(' ')

async function run(): Promise<void> {
  try {
    if (context.eventName === 'pull_request') {
      const payload = context.payload as PullRequestEvent
      const exampleEmbed = {
        color: 0x63a18f,
        title: `Pull request ${toHumanReadable(payload.action)}: #${
          payload.number
        } ${payload.pull_request.title}`,
        url: payload.pull_request.html_url,
        author: {
          name: context.actor,
          icon_url: `https://avatars.githubusercontent.com/${context.actor}`,
          url: `https://github.com/${context.actor}`
        },
        description: payload.pull_request.body
      }

      console.log(JSON.stringify(exampleEmbed))

      const discordWebhook = core.getInput('discord_webhook')

      await axios.post(
        `${discordWebhook}?wait=true`,
        JSON.stringify({embeds: [exampleEmbed]}),
        {
          headers: {
            'Content-Type': 'application/json',
            'X-GitHub-Event': process.env.GITHUB_EVENT_NAME
          }
        }
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
