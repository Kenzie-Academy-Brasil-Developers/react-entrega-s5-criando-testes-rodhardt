context("Search", () => {
  it("Enters the page and tries to search for a CEP number", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);

    cy.get("input:first").type(8074000);
    cy.contains("Buscar pelo CEP").click();

    cy.contains("CEP inválido! São necessários 8 números");

    cy.get("input:first").type(0);
    cy.contains("Buscar pelo CEP").click();

    cy.contains("Logradouro");

    cy.get("input:first").type(1);
    cy.contains("Buscar pelo CEP").click();

    cy.contains("CEP inválido! São necessários 8 números");
  });
});
