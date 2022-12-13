export interface IGoods {
  title: string;
  source: string;
  produce: string;
  year: number;
  color: string;
  memory: string;
  price: number;
  favorite: boolean;
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
