interface IProductCategory {
  categoryId: number;
  category: string | null;
}

export interface IMovie {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: string;
  productCategory: IProductCategory[];
}
