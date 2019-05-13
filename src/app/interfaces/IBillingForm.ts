import { IOrderRows } from "./IOrderRows";

export interface IBillingForm {
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: IOrderRows[];
}
