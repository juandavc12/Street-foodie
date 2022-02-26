describe('Street Foodie', () => {
  it('Page can be opened', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Log in').click();
    cy.contains('Do not have account? Sign Up').click();
    cy.get('input').eq(0).type('cypress@test.test');
    cy.get('input').eq(1).type('test123456');
    cy.get('button').eq(0).click();
  });
});
