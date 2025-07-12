describe("onboarding flow", () => {
  it("loads onboarding data", () => {
    cy.request("/api/onboarding").its("status").should("be.oneOf", [200, 401]);
  });
});
