context("Erros", () => {
  const errorMsg = "Oops! Tente novamente mais tarde.";

  it("testa erro no servidor", () => {
    cy.intercept("GET", "**/search?query=cypress", { statusCode: 500 }).as(
      "getServerFailure"
    );

    cy.visit("https://example.com/search");

    cy.get('[data-cy="search-field"]')
      .should("be.visible")
      .type("cypress{enter}");
    cy.wait("@getServerFailure");

    cy.contains(errorMsg).should("be.visible");
  });

  it("testa erro na rede", () => {
    cy.intercept("GET", "**/search?query=cypressio", {
      forceNetworkError: true,
    }).as("getNetworkFailure");

    cy.visit("https://example.com/search");

    cy.get('[data-cy="search-field"]')
      .should("be.visible")
      .type("cypressio{enter}");
    cy.wait("@getNetworkFailure");

    cy.contais(errorMsg).should("be.visible");
  });
});
