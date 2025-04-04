export type DBType = {
  [key: string]: ItemType[];
};

export interface ItemType {
  title: string | null;
  price: string | null;
  image: string | null;
  href: string | null;
}
