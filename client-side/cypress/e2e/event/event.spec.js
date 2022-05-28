describe('Test Croud event', () => {
    beforeEach(() => {
      cy.login()
    })
      it('tester l url /events && creer un evennement de teste', () => {
        
       
      
  
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/events"]').click();
        cy.url().should('include', '/events')
        //cy.get('.table mt-3');
        
    
  
        //ant-modal
        cy.contains('description defi test').should('not.exist');
        //ajouter defi 
        cy.get('.btn-primary').click();
        cy.get('.ant-modal-header').should('have.text','Ajouter un evennement')
  
  
        cy.get('#name').clear().type("evennement de teste");
        cy.get('#description').type("description evennement de teste");
        cy.get('.ant-radio [type="radio"]')
        .check('public').should('be.checked')
  
        //cliquer sur la bouton d'ajout 
        cy.get('.ant-space-item > .ant-btn > span').click();
  
        
  
  
        cy.get('.table').find('tbody')
         .last().should('contain', "evennement de teste")
         cy.get('.ant-modal').should('be.visible')
  
  
    
    
        // Should be on a new URL which includes '/commands/actions'
      })
      it('tester la modification d un evennement ', () => {
        
  
       
   
         cy.visit('/')
         cy.get('#collasible-nav-dropdown').click();
         cy.get('[href="/events"]').click();
         
         cy.get('.table')
          .find('tbody tr:last')
          .get('.btn-secondary')
          .last()
          .click();
          cy.get('#name').should('have.value','evennement de teste');
          cy.get('#description').should('have.value','description evennement de teste');
          cy.get('.ant-radio-checked [type="radio"]').should('have.value','public')

          cy.get('#name').clear().type('evennement de teste update').should('have.value','evennement de teste update');
          cy.get('#description').clear().type('description evennement de teste update').should('have.value','description evennement de teste update');
          cy.get('.ant-radio [type="radio"]')
          .check('privé').should('be.checked')

          cy.get('.ant-space-item > .ant-btn').click();
          cy.get('.table').find('tbody').get('tr')
          .last().should('contain', "evennement de teste update")

       
  
         
     
   
   
   
     
     
         // Should be on a new URL which includes '/commands/actions'
       })
       it('tester la suppression d un evennement', () => {
        
  
       
   
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/events"]').click();
    
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