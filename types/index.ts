export type DBType = {
  [key: string]: { data: ItemType[] };
};

export interface ItemType {
  title: string | null;
  price: string | null;
  image: string | null;
  href: string | null;
}

export interface ProviderType {
  name: string;
  hebSelector: string;
  engSelector: string;
}
