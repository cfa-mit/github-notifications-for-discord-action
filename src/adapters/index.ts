import {Context} from '@actions/github/lib/context'
import {WebhookPayload} from '@actions/github/lib/interfaces'

export interface Embed {
  title: string
  url: string
  author: {
    name: string
    icon_url: string
    url: string
  }
  description: string
}

export interface AdapterInterface {
  supportsEvent(context: Context): boolean
  mapPayloadToEmbed(context: Context, payload: WebhookPayload): Embed
}

export class AdapterRegistry {
  constructor(private readonly adapters: AdapterInterface[]) {}

  getAdapterForContext(context: Context): AdapterInterface | undefined {
    return this.adapters.find(adapter => adapter.supportsEvent(context))
  }
}
