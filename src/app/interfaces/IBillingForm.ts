interface IOrderRows {
  productId: number;
  amount: number;
}
export interface IBillingForm {
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: IOrderRows[];
}
