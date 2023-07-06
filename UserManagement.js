/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
describe('Workbench login and Dashboard',function()
{
    
    it('Admin Login',function()
    {
        cy.visit('http://localhost:9001/workbench/projects')
        cy.get('[name="username"]').type('admin@grn.com').should('have.value','admin@grn.com')
        cy.get('[name="password"]').type('password').should('have.value','password')
        cy.get('[type="submit"]').click()
    })
    it('Admins User page',function()
    {
        cy.contains('TestSantoshiMP').click()
        cy.wait(1000)
        cy.get(':nth-child(8) > .nav-link').click()
        cy.get('h2').should('have.text','Users')
        cy.wait(1000)
        cy.get('[placeholder="Enter UserName..."]').type('ymurali')
        cy.get('tbody > tr > :nth-child(2)').should('include.text','ymurali')
        cy.wait(1000)
        cy.get('[placeholder="Enter UserName..."]').clear()
        cy.wait(1000)
        cy.get('[aria-label="UserName sortable"] > [draggable="true"] > div > .order-4').click()
        cy.get('tbody > tr > :nth-child(2)').should('include.text','ymurali')
    })
})