import { IOrderRows } from "./IOrderRows";

export interface IBillingForm {
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: Function;
  status: number;
  orderRows: IOrderRows[];
}
