export const toHumanReadable = (action: string): string =>
  action.split('_').join(' ')
