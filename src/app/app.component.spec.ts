import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CatalogComponent } from "./components/catalog/catalog.component";
import { ProductComponent } from "./components/product/product.component";
import { DetailsComponent } from "./components/details/details.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        CatalogComponent,
        ProductComponent,
        DetailsComponent
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
