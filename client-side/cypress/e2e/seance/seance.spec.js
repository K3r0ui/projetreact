
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
  
  
        cy.get('#name').clear().type("nom seance de teste");
        cy.get('#date').click();
        cy.get('.ant-picker-now-btn').click();
        cy.get('#competencess').click();
        cy.get('#competencess').click();
        cy.selectDropdown(":nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector", "localhost")
        cy.selectDropdown(":nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow", "test STAT")
        cy.get('#statistiquesList_626a0a016b80d3cfd61842fd').type(50);


        cy.selectDropdown("#joueur", "belhadj najib1")
        cy.selectDropdown("#programme", "Test")
        cy.selectDropdown("#lieu", "Tunis1")
        cy.wait(1000)
        cy.get('.ant-space-item > .ant-btn > span').click();
        cy.wait(1000)
        cy.get('.ant-table').find('tbody')
        .last().should('contain', "nom seance de teste")



        
   
        
     


      
        
    
      })
      it('test filter seance  ', () => {
        
  
       
   
         cy.visit('/')
         cy.get('#collasible-nav-dropdown').click();
         cy.get('[href="/seances"]').click();
         cy.url().should('include', '/seance')
         cy.wait(2000)
         cy.get('.ant-radio-group > :nth-child(2)').click();

         cy.wait(1000)

         cy.log("filtrage par date d'aujourduit ")

         cy.get('.ant-table-row > :nth-child(4)').invoke('text').then(date=>{
            const date2 = date.substring(0, 10);
            const date3 = new Date(date2);
            const today = new Date();
            
            expect(date3).to.be.lte(today);


         })
         
    
         cy.wait(1000)

         cy.log("filtrage par joueur  ")
         cy.selectDropdown(":nth-child(3) > .ant-select-selector", "najib1")
        /* cy.get('.ant-table').find('tbody').get('tr')
         .each(($tr) => {

         expect($tr).to.have.to.contain("najib1")
         })*/
         cy.get('.ant-table').find('tbody')
        .last().should('contain', "najib1")




         cy.wait(1000)

         cy.log("filtrage par lieux  ")
         cy.selectDropdown(":nth-child(4) > .ant-select-selector", "Tunis1")
         cy.get('.ant-table').find('tbody')
         .last().should('contain', "Tunis1")
         








    
         
       
       })
   
    })