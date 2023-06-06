import { PullRequestReviewEvent } from '@octokit/webhooks-definitions/schema';
import {
  pullRequest,
  repository,
  sender,
  review
} from '../../test-utils/mock-data';
import { PullRequestReviewAdapter } from '.';

const eventMock = {
  action: 'submitted',
  sender,
  pull_request: pullRequest,
  repository,
  review
} as PullRequestReviewEvent;

const adapter = new PullRequestReviewAdapter();

describe('PullRequestReviewAdapter', () => {
  it.each([
    ['commented', { message: 'commented 💬', color: undefined }],
    ['approved', { color: 0x07c300, message: 'approved changes ✅' }],
    ['changes_requested', { color: 0xcc0202, message: 'requested changes ❌' }]
  ])(
    'Generates an embed object from a Pull Request Review event for state [%s]',
    (state, { message, color }) => {
      const payload = {
        ...eventMock,
        review: { ...eventMock.review, state }
      } as PullRequestReviewEvent;

      expect(adapter.mapPayloadToEmbed(payload)).toEqual({
        author: {
          icon_url: 'https://avatars.githubusercontent.com/u/123?v=4',
          name: 'test-user',
          url: 'https://github.com/test-user'
        },
        color,
        title: `[cfa-mit/github-notifications-for-discord-action] test-user ${message}: #123 Some PR title`,
        url: 'https://github.com/cfa-mit/github-notifications-for-discord'
      });
    }
  );
});
