import { IOrder } from "../interfaces/IOrder";

export const mockOrders: IOrder[] = [
  {
    id: 1,
    companyId: 1,
    created: "11-11-11",
    createdBy: "testUser@test.com",
    paymentMethod: "Visa",
    totalPrice: 111,
    status: 0,
    orderRows: []
  },
  {
    id: 2,
    companyId: 2,
    created: "22-22-22",
    createdBy: "testUser@test.com",
    paymentMethod: "Visa",
    totalPrice: 222,
    status: 0,
    orderRows: []
  }
];
