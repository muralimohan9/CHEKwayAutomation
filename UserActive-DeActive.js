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
    it('User Activation/DeActivation',function()
    {
        cy.contains('TestSantoshiMP').click()
        cy.wait(1000)
        cy.get(':nth-child(8) > .nav-link').click()
        cy.get('h2').should('have.text','Users')
        cy.wait(1000)

        //user Deactivation
        cy.get(':nth-child(1) > :nth-child(8) > :nth-child(1) > div > .switch > .slider').click()
        cy.contains('Yes').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you really want to De-Activate this user?')
        })
        cy.wait(2000)
        //user Activation
        cy.get(':nth-child(1) > :nth-child(8) > :nth-child(1) > div > .switch > .slider').click()
        cy.contains('Yes').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you really want to De-Activate this user?')
        })
    });
})