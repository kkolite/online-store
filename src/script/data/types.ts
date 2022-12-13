export enum aviaCategory {
  Civil = 'civil',
  Military = 'miliary',
  VIP = 'vip',
  Cargo = 'cargo',
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
