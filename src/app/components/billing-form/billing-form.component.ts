import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-billing-form",
  templateUrl: "./billing-form.component.html",
  styleUrls: ["./billing-form.component.scss"]
})
export class BillingFormComponent implements OnInit {
  @Output() public billingForm = new EventEmitter<FormGroup>();
  form: FormGroup;
  paymentMethods: string[] = ["Visa", "MasterCard", "Paypal"];

  constructor(private fb: FormBuilder) {
    //This form contains "fake" form controls in order to look more real
    this.form = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      paymentMethod: ["", [Validators.required]],
      address: this.fb.group({
        addressLine: ["", [Validators.required]],
        city: ["", [Validators.required]],
        postalCode: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
        country: ["", [Validators.required]]
      })
    });
  }

  ngOnInit() {
    const storedForm = sessionStorage.getItem("form");
    storedForm && this.setFormValues(storedForm);
  }

  setFormValues(myStoredForm: string) {
    let {
      firstName,
      lastName,
      email,
      paymentMethod,
      address: { addressLine, city, postalCode, country }
    } = JSON.parse(myStoredForm);

    this.firstName.setValue(firstName);
    this.lastName.setValue(lastName);
    this.email.setValue(email);
    this.paymentMethod.setValue(paymentMethod);
    this.addressLine.setValue(addressLine);
    this.city.setValue(city);
    this.postalCode.setValue(postalCode);
    this.country.setValue(country);
  }

  handleOrder() {
    this.billingForm.emit(this.form.value);
    this.storeForm();
  }

  storeForm() {
    sessionStorage.setItem("form", JSON.stringify(this.form.value));
  }

  get firstName() {
    return this.form.get("firstName") as FormControl;
  }

  get lastName() {
    return this.form.get("lastName") as FormControl;
  }

  get email() {
    return this.form.get("email") as FormControl;
  }

  get addressLine() {
    return this.form.get("address").get("addressLine") as FormControl;
  }

  get postalCode() {
    return this.form.get("address").get("postalCode") as FormControl;
  }

  get city() {
    return this.form.get("address").get("city") as FormControl;
  }

  get country() {
    return this.form.get("address").get("country") as FormControl;
  }

  get paymentMethod() {
    return this.form.get("paymentMethod") as FormControl;
  }
}
