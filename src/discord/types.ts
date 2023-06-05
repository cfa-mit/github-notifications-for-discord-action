export interface Embed {
  title: string;
  url: string;
  author: {
    name: string;
    icon_url: string;
    url: string;
  };
  description?: string;
  color?: number;
}
