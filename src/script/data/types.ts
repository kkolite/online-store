export enum aviaCategory {
  Civil = 'Civil',
  Military = 'Military',
  VIP = 'VIP',
  Cargo = 'Cargo',
}

export interface IGoods {
  title: string;
  produce: string;
  category: aviaCategory;
  description: string;
  source: string[];
  price: number;
  onstock: number;
  capacity: number;
  range: number;
}

export interface IPromocode {
  key: string;
  discount: number;
}

export interface ISort {
  createGoods(data: IGoods[]): void;
}

export interface IFilter {
  sortGoods(data: IGoods[]): void;
}

export enum sortBy {
  alphabetUp,
  alphabetDown,
  priceUp,
  priceDown,
}

export type Callback = (data: IGoods) => boolean;
