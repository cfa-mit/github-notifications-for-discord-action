import {
  PullRequest,
  PullRequestReviewEvent,
  Repository,
  User,
  DeploymentStatusCreatedEvent,
  WorkflowRun
} from '@octokit/webhooks-definitions/schema';

export const sender = {
  login: 'test-user',
  avatar_url: 'https://avatars.githubusercontent.com/u/123?v=4',
  html_url: 'https://github.com/test-user'
} as User;

export const pullRequest = {
  title: 'Some PR title',
  number: 123,
  body: 'Some description',
  html_url: 'https://github.com/cfa-mit/github-notifications-for-discord/pull/1'
} as PullRequest;

export const repository = {
  full_name: 'cfa-mit/github-notifications-for-discord-action'
} as Repository;

export const review = {
  html_url: 'https://github.com/cfa-mit/github-notifications-for-discord',
  state: 'approved'
} as PullRequestReviewEvent['review'];

export const deploymentStatus = {
  state: 'success',
  environment: 'staging'
} as DeploymentStatusCreatedEvent['deployment_status'];

export const workflowRun = {
  html_url:
    'https://github.com/cfa-mit/github-notifications-for-discord-action/actions/runs/5146845657/jobs/9266459776'
} as WorkflowRun;
