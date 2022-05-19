describe('Test Croud Defi', () => {
  beforeEach(() => {
    cy.login()
  })
    it('tester l url /defi && creer un defi de teste', () => {
      
     
    

      cy.visit('/')
      cy.get('#collasible-nav-dropdown').click();
      cy.get('[href="/defis"]').click();
      cy.url().should('include', '/defi')
      //cy.get('.table mt-3');
      
  

      //ant-modal
      cy.contains('description defi test').should('not.exist');
      //ajouter defi 
      cy.get('.btn-primary').click();
      cy.get('.ant-modal-header').should('have.text','Ajouter un defi')


      cy.get('#lien').clear().type("https://www.google.com");
      cy.get('#description').type("description defi test");

      //cliquer sur la bouton d'ajout 
      cy.get('.ant-space-item > .ant-btn > span').click();

      


      cy.get('.table').find('tbody')
       .last().should('contain', "description defi test")
       cy.get('.ant-modal').should('be.visible')


  
  
      // Should be on a new URL which includes '/commands/actions'
    })
    it('modifacation defi du test', () => {
      

     
 
       cy.visit('/')
       cy.get('#collasible-nav-dropdown').click();
       cy.get('[href="/defis"]').click();
       cy.url().should('include', '/defi')
       //cy.get('.table mt-3');
       cy.get('.table')
        .find('tbody tr:last')
        .get('.btn-secondary')
        .last()
        .click();
        cy.get('#lien').should('have.value','https://www.google.com');
        cy.get('#description').should('have.value','description defi test');
        cy.get('#lien').clear().type('https://www.google.com update').should('have.value','https://www.google.com update');
        cy.get('#description').clear().type('description defi test update').should('have.value','description defi test update');
        cy.get('.ant-space-item > .ant-btn').click();
        cy.get('.table').find('tbody').get('tr')
        .last().should('contain', "description defi test update")

       
   
 
 
 
   
   
       // Should be on a new URL which includes '/commands/actions'
     })
     it('delite defi', () => {
      

     
 
      cy.visit('/')
      cy.get('#collasible-nav-dropdown').click();
      cy.get('[href="/defis"]').click();
      cy.url().should('include', '/defi')
      //cy.get('.table mt-3');
      cy.get('.table')
       .find('tbody tr:last')
       .get('.btn-danger')
       .last()
       .click()
        .get('.ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
        .click()
     

      
  



  
  
      // Should be on a new URL which includes '/commands/actions'
    })
  })