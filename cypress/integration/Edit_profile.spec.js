describe('Street Foodie', () => {
  it('Page can be opened', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Profile').click();
    cy.get('button').eq(0).click();
    cy.get('input').eq(0).type('Test');
    cy.get('input').eq(1).type('Cypress');
    cy.get('input').eq(2).type('LocalHost');
    cy.get('.UploadProfilePhoto').click();
  });
});
