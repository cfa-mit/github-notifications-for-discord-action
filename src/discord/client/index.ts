import { Axios } from 'axios';
import { Embed } from '../types';

export class DiscordClient {
  constructor(
    private readonly webhookUrl: string,
    private readonly axios: Axios
  ) {}

  async sendMessage(embed: Embed): Promise<unknown> {
    return this.axios.post(
      this.webhookUrl,
      JSON.stringify({ embeds: [embed] }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
