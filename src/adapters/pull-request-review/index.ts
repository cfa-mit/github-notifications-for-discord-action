import {PullRequestReviewSubmittedEvent} from '@octokit/webhooks-definitions/schema'
import {AbstractAdapter, Embed} from '..'

const PULL_REQUEST_REVIEW_STATE_MAPPING: Record<
  string,
  {color?: number; message: string}
> = {
  approved: {color: 0x07c300, message: 'approved changes ✅'},
  changes_requested: {color: 0xcc0202, message: 'requested changes ❌'},
  commented: {message: 'commented 💬'}
}

export class PullRequestReviewAdapter extends AbstractAdapter {
  readonly eventName = 'pull_request_review'

  mapPayloadToEmbed({
    pull_request: {title, number},
    review: {state, html_url},
    sender: {avatar_url, html_url: github_profile_url, login},
    repository: {full_name}
  }: PullRequestReviewSubmittedEvent): Embed {
    const {message, color} = PULL_REQUEST_REVIEW_STATE_MAPPING[state]

    return {
      title: `[${full_name}] ${login} ${message}: #${number} ${title}`,
      url: html_url,
      author: {
        name: login,
        icon_url: avatar_url,
        url: github_profile_url
      },
      color
    }
  }
}
