import * as core from '@actions/core'
import {context} from '@actions/github'
import axios from 'axios'
import {AdapterRegistry} from './adapters'
import {PullRequestAdapter} from './adapters/pull-request'
import {DeploymentStatusAdapter} from './adapters/deployment-status'
import {PullRequestReviewAdapter} from './adapters/pull-request-review'

const adapterRegistry = new AdapterRegistry([
  new PullRequestAdapter(),
  new DeploymentStatusAdapter(),
  new PullRequestReviewAdapter()
])

async function run(): Promise<void> {
  try {
    // context.eventName = 'deployment_status'
    // context.payload = payloadTest
    const adapter = adapterRegistry.getAdapterForContext(context)

    if (!adapter) {
      throw new Error(
        `Event not supported. Here's the list of supported events: ${adapterRegistry.adapters
          .map(({eventName}) => eventName)
          .toString()}`
      )
    }

    const {payload} = context
    const embed = adapter.mapPayloadToEmbed(payload)

    const discordWebhook = core.getInput('discord_webhook')
    // const discordWebhook =
    //   'https://discord.com/api/webhooks/1098905611082665984/IKsraGKkCalg5ChQJ3okKqO-Zvlr_mPlO3DeoAjjh5jyzE3hhAJxzNh-nANGM0aGWGEO'

    await axios.post(
      `${discordWebhook}?wait=true&thread_id=yo`,
      JSON.stringify({embeds: [embed]}),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
