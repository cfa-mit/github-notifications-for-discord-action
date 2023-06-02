import * as core from '@actions/core'
import {context} from '@actions/github'
import axios from 'axios'
import {AdapterRegistry} from './adapters'
import {PullRequestAdapter} from './adapters/pull-request'

const adapterRegistry = new AdapterRegistry([new PullRequestAdapter()])

async function run(): Promise<void> {
  try {
    const adapter = adapterRegistry.getAdapterForContext(context)

    if (!adapter) {
      throw new Error('Github event not supported')
    }

    const embed = adapter.mapPayloadToEmbed(context, context.payload)

    const discordWebhook = core.getInput('discord_webhook')

    await axios.post(
      `${discordWebhook}?wait=true`,
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
