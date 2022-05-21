
describe('Test (consulter participer)evennement cote joueur ', () => {
    beforeEach(() => {
      cy.loginJoueur()
    })
      it.only('tester l url "/joueur/events" , consulter un evennement ', () => {
        
       
      
  
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/joueur/events"]').click();
        cy.wait(1000)
        cy.url().should('include', '/joueur/events')
        //cy.get('.table mt-3');
        cy.get('.ant-radio-button-wrapper-checked').should('have.text',"Evenement publiques")  
        cy.log("consulter le dernier evenement public ")
        cy.get('.table')
        .find('tbody tr:last')
        .get('.btn-secondary')
        .last()
        .click()
        cy.wait(1000)
        cy.log("verifier que l'evennement est public  ")
        cy.get(".ant-modal-body").should("contain","Etat : public")


        cy.log("quitter le modal ")
        cy.get('.ant-btn-default').click();

        
        cy.get('.ant-radio-group > :nth-child(2)').click();
        cy.wait(1000)
        cy.get('.ant-radio-button-wrapper-checked').should('have.text'," Evenement privés") 

        cy.log("consulter le dernier evenement privé ")
        cy.get('.table')
        .find('tbody tr:last')
        .get('.btn-secondary')
        .last()
        .click()
        cy.wait(1000)
        cy.log("verifier que l'evennement est privé ")
        cy.get(".ant-modal-body").should("contain","Etat : privé")
        cy.log("quitter le modal ")
        cy.get('.ant-btn-default').click();


       
        
        


    
    
    
    })



    it.only('tester l operation participer dans un evenement ', () => {
        
       
      
  
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/joueur/events"]').click();
        cy.wait(1000)
        cy.url().should('include', '/joueur/events')
        //cy.get('.table mt-3');
        cy.get('.ant-radio-button-wrapper-checked').should('have.text',"Evenement publiques")  
        cy.log("participer ...  ")
        cy.get('.table')
        .find('tbody tr:last')
        .get('.btn-danger')
        .last()
        .click()
        cy.wait(1000)
        cy.get('.ant-btn-primary ').click();
       
    })



})