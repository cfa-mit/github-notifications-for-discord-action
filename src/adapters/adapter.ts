import { Context } from '@actions/github/lib/context';
import { WebhookPayload } from '@actions/github/lib/interfaces';
import { Embed } from '../discord';

export abstract class AbstractAdapter {
  abstract readonly eventName: string;
  supportsEvent({ eventName }: Context): boolean {
    return this.eventName === eventName;
  }
  abstract mapPayloadToEmbed(payload: WebhookPayload): Embed;
}

export class AdapterRegistry {
  constructor(readonly adapters: AbstractAdapter[]) {}

  getAdapterForContext(context: Context): AbstractAdapter | undefined {
    return this.adapters.find(adapter => adapter.supportsEvent(context));
  }
}
