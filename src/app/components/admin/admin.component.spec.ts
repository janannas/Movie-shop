import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AdminComponent } from "./admin.component";
import { MovieService } from "src/app/services/movie.service";
import { MockService } from "src/app/services/mock.service";
import { ErrorComponent } from "../error/error.component";

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminComponent, ErrorComponent]
    })
      .overrideComponent(AdminComponent, {
        set: {
          providers: [{ provide: MovieService, useClass: MockService }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should remove order", () => {
    expect(component.orders.length).toBe(2);
    component.spliceOrder(1);
    expect(component.orders.length).toBe(1);
  });
});
