
describe('Login Coach',()=>{
    it('Acceder a la login page then write un lieu', () => {
     cy.visit('http://localhost:3000')
     cy.get('.container > :nth-child(2)').click();
     cy.get('#nest-messages_email').type('coach2@gmail.com');
     
     cy.get('#nest-messages_password').type('12345678');
     cy.get('.ant-btn').click();

    })
   
})