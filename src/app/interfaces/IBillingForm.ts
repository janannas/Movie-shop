interface IAddress {
  addressLine: string;
  city: string;
  postalCode: number;
  country: string;
}

export interface IBillingForm {
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod: string;
  address: IAddress;
}
