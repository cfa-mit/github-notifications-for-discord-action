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
  description?: string
  color?: number
}

export abstract class AbstractAdapter {
  abstract readonly eventName: string
  supportsEvent({eventName}: Context): boolean {
    return this.eventName === eventName
  }
  abstract mapPayloadToEmbed(payload: WebhookPayload): Embed
}

export class AdapterRegistry {
  constructor(readonly adapters: AbstractAdapter[]) {}

  getAdapterForContext(context: Context): AbstractAdapter | undefined {
    return this.adapters.find(adapter => adapter.supportsEvent(context))
  }
}
