describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("find the day that contains the text Tuesday and click on it", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
  });


});