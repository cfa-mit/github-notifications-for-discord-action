import {
  DeploymentStatusEvent,
  WorkflowRun
} from '@octokit/webhooks-definitions/schema'
import {AbstractAdapter, Embed} from '..'
import {toHumanReadable} from '../../utils'

const EMOJI_STATE_MAPPING: Record<string, string> = {
  success: '✅',
  error: '❌',
  failure: '❌',
  in_progress: '⌛️'
}

export class DeploymentStatusAdapter extends AbstractAdapter {
  readonly eventName = 'deployment_status'

  mapPayloadToEmbed({
    deployment_status: {state, environment},
    sender: {avatar_url, html_url: github_profile_url, login},
    workflow_run: {html_url},
    repository: {full_name}
  }: DeploymentStatusEvent & {workflow_run: WorkflowRun}): Embed {
    return {
      title: `[${full_name}] Deployment for environment **${environment}**: ${toHumanReadable(
        state
      )} ${EMOJI_STATE_MAPPING[state]}`,
      url: html_url,
      author: {
        name: login,
        icon_url: avatar_url,
        url: github_profile_url
      }
    }
  }
}
