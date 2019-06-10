import { browser, by, element, ElementFinder } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navigateToRoute(path: string) {
    return browser.get(path);
  }

  getPageTitle() {
    return element(by.css("h1")).getText() as Promise<string>;
  }

  getNavLink() {
    return element(by.css("nav a")).getText() as Promise<string>;
  }

  getProductTitle() {
    return element(by.className("label"))
      .element(by.css("h2"))
      .getText() as Promise<string>;
  }

  getToggleCategoriesButton() {
    return element(by.className("categories-container")).element(
      by.css("button")
    ) as ElementFinder;
  }

  getListElement() {
    return element(by.css("ul")).element(by.css("li")) as ElementFinder;
  }
}
