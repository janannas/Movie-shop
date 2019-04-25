import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import * as moment from "moment";

import { MovieService } from "../../services/movie.service";
import { IBillingForm } from "src/app/interfaces/IBillingForm";

@Component({
  selector: "app-billing-form",
  templateUrl: "./billing-form.component.html",
  styleUrls: ["./billing-form.component.css"]
})
export class BillingFormComponent implements OnInit {
  billingForm: FormGroup;
  paymentMethods: string[] = ["Visa", "MasterCard", "Paypal", "Invoice"];

  constructor(private fb: FormBuilder, private movieService: MovieService) {}

  ngOnInit() {
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

  getBillingObject(): IBillingForm {
    return {
      companyId: 9,
      created: moment()
        .locale("sv")
        .format("YYYY-MM-DDTLTS"),
      createdBy: this.email.value,
      paymentMethod: this.paymentMethod.value,
      totalPrice: 0,
      status: 0,
      orderRows: []
    };
  }

  handleOrder() {
    console.log(this.getBillingObject());

    /*
    The billingObject-func returns the correct billingdata that is requred for
    the API. The form in template contains "fake" form controls in order to
    look more real
    */

    /*  this.movieService
      .sendOrder(this.billingObject())
      .subscribe(
        response => console.log("success", response),
        error => console.log("error", error)
      ); */
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
