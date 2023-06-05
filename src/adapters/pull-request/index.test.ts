import { PullRequestEvent } from '@octokit/webhooks-definitions/schema';
import {
  pullRequest,
  repository,
  sender,
  review
} from '../../test-utils/mockData';
import { PullRequestAdapter } from '.';

const eventMock = {
  action: 'ready_for_review',
  number: 123,
  sender,
  pull_request: pullRequest,
  repository,
  review
} as PullRequestEvent;

const adapter = new PullRequestAdapter();

describe('PullRequestAdapter', () => {
  it('Generates an embed object from a Pull Request event', () => {
    expect(adapter.mapPayloadToEmbed(eventMock)).toEqual({
      author: {
        icon_url: 'https://avatars.githubusercontent.com/u/123?v=4',
        name: 'test-user',
        url: 'https://github.com/test-user'
      },
      title: `[cfa-mit/github-notifications-for-discord-action] Pull request ready for review: #123 Some PR title`,
      url: 'https://github.com/cfa-mit/github-notifications-for-discord/pull/1',
      description: 'Some description'
    });
  });
});
