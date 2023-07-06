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
    it('Duplicate User Creation',function()
    {
        cy.contains('TestSantoshiMP').click()
        cy.wait(1000)
        cy.get(':nth-child(8) > .nav-link').click()
        cy.get('h2').should('have.text','Users')
        cy.wait(1000)
        // creating Duplicate user
        cy.get('[title="New User"]').click()
        cy.get('[name="username"]').type('sai').should('have.value','sai')
        cy.get('.css-1hwfws3').type('Us{enter}').should('include.text','User')
        cy.get('[name="firstName"]').type('sai').should('have.value','sai')
        cy.get('[name="lastName"]').type('murali').should('have.value','murali')
        cy.get('[name="email"]').type('sai@grn.com').should('have.value','sai@grn.com')
        cy.get('[name="password"]').type('Password').should('have.value','Password')
        cy.get('[name="confirmPwd"]').type('Password').should('have.value','Password')
        cy.get('[type="submit"]').click()

        cy.contains('OK').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('User name already in use.sai')
        })
    })
})