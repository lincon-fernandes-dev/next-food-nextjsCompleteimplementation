export interface IMeal {
  id: number;
  title: string;
  slug: string;
  image: Iimage;
  summary: string;
  creator: string;
  instructions: string;
}
export interface Iimage {
  name: string;
  type: string;
  size: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
}