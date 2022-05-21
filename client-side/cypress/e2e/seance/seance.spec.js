
describe('Test filter seance ', () => {
    beforeEach(() => {
      cy.login()
    })
      it('tester l url /seance && creer une seance de teste', () => {
        
       
      
  
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/seances"]').click();
        cy.url().should('include', '/seances')
        //cy.get('.table mt-3');
        
    
  
        //ant-modal
        cy.contains('description defi test').should('not.exist');
        //ajouter defi 
        cy.get('.btn').click();
        cy.get('.ant-modal-header').should('have.text','Ajouter une séance')
  
  
        cy.get('#name').clear().type(" nom seance de teste ");
        cy.get('#date').click();
        cy.get('.ant-picker-now-btn').click();
        cy.get('#competencess').click();
        cy.get('#competencess').click();

   
        
     
            cy.get('.ant-select-selection-item').should('have.text','test2').click();

        cy.get('#statistiques').click();

      
        
    
      })
      it.only('filtrage par date ', () => {
        
  
       
   
         cy.visit('/')
         cy.get('#collasible-nav-dropdown').click();
         cy.get('[href="/seances"]').click();
         cy.url().should('include', '/seance')
         cy.wait(3000)
         cy.get('.ant-radio-group > :nth-child(2)').click();


         cy.log("filtrage par date d'aujourduit ")

         cy.get('.ant-table-row > :nth-child(4)').invoke('text').then(date=>{
            const date2 = date.substring(0, 10);
            const date3 = new Date(date2);
            const today = new Date();
            
            expect(date3).to.be.lte(today);


         })





    
         
       
       })
   
    })