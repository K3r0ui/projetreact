describe('Register Coach',()=>{
    it('Acceder a la register page then sinscrire', () => {
     cy.visit('http://localhost:3000')
     cy.get('.container > :nth-child(2)').click();
     cy.get('a').click();
     cy.get('#nest-messages_firstName').type('coachfirstname');
     cy.get('#nest-messages_lastName').type('coachlastname');
     cy.get('#nest-messages_dob').type('1998-11-11');
     cy.get('#nest-messages_email').type('coache2e@gmail.com');
     cy.get('#nest-messages_password').type('12345678');
     cy.get('#nest-messages_confirm').type('12345678');
     cy.get('.ant-btn').click();
     
    })
   
})