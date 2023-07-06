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
    it('User Creation',function()
    {
        cy.contains('TestSantoshiMP').click()
        cy.wait(1000)
        cy.get(':nth-child(8) > .nav-link').click()
        cy.get('h2').should('have.text','Users')
        cy.wait(1000)
        // creating new user
        cy.get('[title="New User"]').click()

        // // back button
        // cy.get('.fa-arrow-circle-left').click()
        // cy.get('h2').should('have.text','Users')
        cy.get('[name="username"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="username"]').type('Murali').should('have.value','Murali')
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('.css-1hwfws3').type('Us{enter}').should('include.text','User')
        cy.get('[name="firstName"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="firstName"]').type('Murali').should('have.value','Murali')
        cy.get('[name="lastName"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="lastName"]').type('Mohan').should('have.value','Mohan')
        cy.get('[name="email"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="email"]').type('murali@grn.com').should('have.value','murali@grn.com')
        cy.get('[name="password"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="password"]').type('Password').should('have.value','Password')
        cy.get('[name="confirmPwd"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="confirmPwd"]').type('Password').should('have.value','Password')

        // Reset Button 
        // cy.get('.form-group > .orange').click()
        // cy.get('.breadcrumb > :nth-child(2) > a').click()
        cy.get('[type="submit"]').click()
    })
})