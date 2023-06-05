import * as core from '@actions/core';
import { context } from '@actions/github';
import axios from 'axios';
import {
  AdapterRegistry,
  PullRequestAdapter,
  DeploymentStatusAdapter,
  PullRequestReviewAdapter
} from './adapters';
import { DiscordClient } from './discord';

const adapterRegistry = new AdapterRegistry([
  new PullRequestAdapter(),
  new DeploymentStatusAdapter(),
  new PullRequestReviewAdapter()
]);

async function run(): Promise<void> {
  try {
    const adapter = adapterRegistry.getAdapterForContext(context);

    if (!adapter) {
      throw new Error(
        `Event not supported. This is the list of supported events: ${adapterRegistry.adapters
          .map(({ eventName }) => eventName)
          .toString()}`
      );
    }

    const { payload } = context;
    const embed = adapter.mapPayloadToEmbed(payload);
    const client = new DiscordClient(core.getInput('discord_webhook'), axios);

    await client.sendMessage(embed);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
