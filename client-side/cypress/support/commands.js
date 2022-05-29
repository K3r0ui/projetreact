// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => { 
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/coach/login',
      body: {
       email:"coach2@gmail.com",
       password:"12345678"

      }
    })
    .then((resp) => {
      window.localStorage.setItem('token', resp.body.token)
      window.localStorage.setItem('isCoach', true)
    })
  
  })


  Cypress.Commands.add( 'multiSelect', ( selector , text) => {
    cy.get(`.ant-select${selector} > .ant-select-selector > .ant-select-selection-overflow`).click();
    cy.get(`.ant-select${selector} .ant-select-selection-search input`).clear()
    cy.get(`.ant-select${selector} .ant-select-selection-search input`).invoke('attr', 'id').then((selElm) => {
      const dropDownSelector = `#${selElm}_list`;
      cy.get(`.ant-select${selector} .ant-select-selection-search input`).type(`${text}`);
      cy.get(dropDownSelector).next().find('.ant-select-item-option-content').click()
    })
  })
  Cypress.Commands.add( 'selectDropdown', ( testId , optionText) => {
    cy.get(`.ant-select${selector} > .ant-select-selector > .ant-select-selection-overflow`).click();
    cy.get(`.ant-select${selector} .ant-select-selection-search input`).clear()
    cy.get(`.ant-select${selector} .ant-select-selection-search input`).invoke('attr', 'id').then((selElm) => {
      const dropDownSelector = `#${selElm}_list`;
      cy.get(`.ant-select${selector} .ant-select-selection-search input`).type(`${text}`);
      cy.get(dropDownSelector).next().find('.ant-select-item-option-content').click()
    })
  })

  