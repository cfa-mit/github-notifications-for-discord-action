import { PullRequestEvent } from '@octokit/webhooks-definitions/schema';
import { AbstractAdapter } from '../adapter';
import { toHumanReadable } from '../../utils';
import { Embed } from '../../discord';

export class PullRequestAdapter extends AbstractAdapter {
  readonly eventName = 'pull_request';

  mapPayloadToEmbed({
    pull_request: { title, html_url, body },
    number,
    action,
    sender: { avatar_url, html_url: github_profile_url, login },
    repository: { full_name }
  }: PullRequestEvent): Embed {
    return {
      title: `[${full_name}] Pull request ${toHumanReadable(
        action
      )}: #${number} ${title}`,
      url: html_url,
      author: {
        name: login,
        icon_url: avatar_url,
        url: github_profile_url
      },
      description: body
    };
  }
}
