describe('Test Detail seance ', () => {
   beforeEach(() => {
      cy.loginJoueur();
   });
   it('test l url /seance this day', () => {
      cy.visit('/');
      cy.get('#collasible-nav-dropdown').click();
      cy.get('[href="/seancesJ"]').click();
      cy.url().should('include', '/seancesJ');
      cy.get(':nth-child(3) > span').click();
   });

   it('filtrage par date ', () => {
      cy.visit('/');
      cy.get('#collasible-nav-dropdown').click();
      cy.get('[href="/seancesJ"]').click();
      cy.url().should('include', '/seancesJ');
      cy.wait(3000);
      cy.get('.ant-picker-input-active > input').click();
      cy.contains('19').click();
      //cy.get('.ant-picker-input-active > input').click()
   });
});
