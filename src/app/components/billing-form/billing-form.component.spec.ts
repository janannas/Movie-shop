import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule, FormGroup } from "@angular/forms";

import { MovieService } from "../../services/movie.service";
import { BillingFormComponent } from "./billing-form.component";
import { MockService } from 'src/app/services/mock.service';

describe("BillingFormComponent", () => {
  let component: BillingFormComponent;
  let fixture: ComponentFixture<BillingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [BillingFormComponent]
    })
      .overrideComponent(BillingFormComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit", () => {
    component.billingForm.subscribe((myFormData: FormGroup) => {
      expect(myFormData).toBeDefined();
    });
    component.handleOrder();
  });
});
