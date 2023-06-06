import {
  repository,
  sender,
  deploymentStatus,
  workflowRun
} from '../../test-utils/mock-data';
import { DeploymentStatusAdapter, DeploymentEvent } from '.';

const eventMock = {
  sender,
  repository,
  deployment_status: deploymentStatus,
  workflow_run: workflowRun
} as DeploymentEvent;

const adapter = new DeploymentStatusAdapter();

describe('PullRequestReviewAdapter', () => {
  it.each([
    ['success', { color: 0x07c300, label: 'succeeded ✅' }],
    ['error', { color: 0xcc0202, label: 'errored ❌' }],
    ['failure', { color: 0xcc0202, label: 'failed ❌' }],
    ['in_progress', { color: undefined, label: 'in progress' }]
  ])(
    'Generates an embed object from a Deployment Status Event event for state [%s]',
    (state, { label, color }) => {
      const payload = {
        ...eventMock,
        deployment_status: { ...eventMock.deployment_status, state }
      } as DeploymentEvent;

      expect(adapter.mapPayloadToEmbed(payload)).toEqual({
        author: {
          icon_url: 'https://avatars.githubusercontent.com/u/123?v=4',
          name: 'test-user',
          url: 'https://github.com/test-user'
        },
        color,
        title: `[cfa-mit/github-notifications-for-discord-action] Deployment for environment **staging** ${label}`,
        url: 'https://github.com/cfa-mit/github-notifications-for-discord-action/actions/runs/5146845657/jobs/9266459776'
      });
    }
  );
});
