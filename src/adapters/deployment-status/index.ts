import {
  DeploymentStatusEvent,
  WorkflowRun
} from '@octokit/webhooks-definitions/schema';
import { AbstractAdapter } from '../adapter';
import { Embed } from '../../discord';

export type DeploymentEvent = DeploymentStatusEvent & {
  workflow_run: WorkflowRun;
};

const DEPLOYMENT_STATE_MAPPING: Record<
  string,
  { color?: number; label: string }
> = {
  success: { color: 0x07c300, label: 'succeeded ✅' },
  error: { color: 0xcc0202, label: 'errored ❌' },
  failure: { color: 0xcc0202, label: 'failed ❌' },
  in_progress: { label: 'in progress' }
};

export class DeploymentStatusAdapter extends AbstractAdapter {
  readonly eventName = 'deployment_status';

  mapPayloadToEmbed({
    deployment_status: { state, environment },
    sender: { avatar_url, html_url: github_profile_url, login },
    workflow_run: { html_url },
    repository: { full_name }
  }: DeploymentEvent): Embed {
    const { color, label } = DEPLOYMENT_STATE_MAPPING[state];

    return {
      title: `[${full_name}] Deployment for environment **${environment}** ${label}`,
      url: html_url,
      author: {
        name: login,
        icon_url: avatar_url,
        url: github_profile_url
      },
      color
    };
  }
}
