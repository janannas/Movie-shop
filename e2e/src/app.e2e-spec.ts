import { AppPage } from "./app.po";
import { browser, logging } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display shop as title", () => {
    page.navigateToRoute("/catalog");
    expect(page.getPageTitle()).toEqual("SHOP");
  });

  it("should contain navigation link", () => {
    page.navigateTo();
    expect(page.getNavLink()).toEqual("M");
  });

  it("should contain product title", () => {
    page.navigateToRoute("/catalog");
    expect(page.getProductTitle()).toEqual("The Dark Knight");
  });

  it("category option should display component with correct category title", () => {
    page.navigateToRoute("/catalog");
    page.getToggleCategoriesButton().click();

    expect(page.getListElement().getText()).toEqual("Action");

    page.getListElement().click();

    expect(page.getPageTitle()).toEqual("ACTION");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
