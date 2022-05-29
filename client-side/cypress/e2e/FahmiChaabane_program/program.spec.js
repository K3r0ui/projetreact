describe('Test Program seance', () => {
   beforeEach(() => {
      cy.login();
   });
   it('test l url /program add program', () => {
      cy.visit('/');
      cy.get('#collasible-nav-dropdown').click();
      cy.get('[href="/prorammes"]').click();
      cy.url().should('include', '/prorammes');

      cy.wait(2000);
      cy.get('.btn-primary').click();

      cy.get('#name').clear().type('Program test');
      cy.get('#description').clear().type('desc test');
      cy.get('#image').clear().type('imagetest');
      cy.get('#videoLink').clear().type('http://linktest.com');
      cy.wait(2000);

      cy.get('.ant-space-item > .ant-btn > span').click();
   });

   it('test update', () => {
      cy.visit('/');
      cy.get('#collasible-nav-dropdown').click();
      cy.get('[href="/prorammes"]').click();
      cy.url().should('include', '/prorammes');

      cy.wait(2000);
      cy.get('.table')
         .find('tbody tr:last')
         .get('.btn-secondary')
         .last()
         .click();

      cy.get('#description').should('have.value', 'desc test');
      cy.get('#description')
         .clear()
         .type('desc test update')
         .should('have.value', 'desc test update');

      cy.get('.ant-space-item > .ant-btn > span').click();
      //cy.wait(2000)
      cy.get('.table')
         .find('tbody')
         .get('tr')
         .last()
         .should('contain', 'desc test update');
   });
   it('delete Competence test', () => {
      cy.visit('/');
      cy.get('#collasible-nav-dropdown').click();
      cy.get('[href="/prorammes"]').click();
      cy.url().should('include', '/prorammes');
      cy.wait(2000);

      cy.get('.table')
         .find('tbody tr:last')
         .get('.btn-danger')
         .last()
         .click()
         .get(
            '.ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary'
         )
         .click();
   });
});
