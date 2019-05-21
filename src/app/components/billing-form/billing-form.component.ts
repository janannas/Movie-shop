import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-billing-form",
  templateUrl: "./billing-form.component.html",
  styleUrls: ["./billing-form.component.css"]
})
export class BillingFormComponent implements OnInit {
  @Output() public fakeForm = new EventEmitter<FormGroup>();
  billingForm: FormGroup;
  paymentMethods: string[] = ["Visa", "MasterCard", "Paypal", "Invoice"];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //This form contains "fake" form controls in order to look more real
    this.billingForm = this.fb.group({
      firstName: ["Johanna", Validators.required],
      lastName: ["Hellsjo", Validators.required],
      email: ["jan.hekk@gmail.com", [Validators.required, Validators.email]],
      paymentMethod: ["", [Validators.required]],
      address: this.fb.group({
        addressLine: ["Starrarpsgatan 36", [Validators.required]],
        city: ["Stockholm", [Validators.required]],
        postalCode: [
          "123 45",
          [Validators.required, Validators.pattern(/[0-9]/)]
        ],
        country: ["Sweden", [Validators.required]]
      })
    });
  }

  handleOrder() {
    this.fakeForm.emit(this.billingForm.value);
  }

  get firstName() {
    return this.billingForm.get("firstName") as FormControl;
  }

  get lastName() {
    return this.billingForm.get("lastName") as FormControl;
  }

  get email() {
    return this.billingForm.get("email") as FormControl;
  }

  get addressLine() {
    return this.billingForm.get("address").get("addressLine") as FormControl;
  }

  get postalCode() {
    return this.billingForm.get("address").get("postalCode") as FormControl;
  }

  get city() {
    return this.billingForm.get("address").get("city") as FormControl;
  }

  get country() {
    return this.billingForm.get("address").get("country") as FormControl;
  }

  get paymentMethod() {
    return this.billingForm.get("paymentMethod") as FormControl;
  }
}
