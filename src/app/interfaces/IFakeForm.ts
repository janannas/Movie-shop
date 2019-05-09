interface IAddress {
  addressLine: string;
  city: string;
  postalCode: number;
  country: string;
}

export interface IFakeForm {
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod: string;
  adress: IAddress[];
}
