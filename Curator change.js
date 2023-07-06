/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Assign task to Curator',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;});
        // cy.get('[title="2"] > .page-link').click()
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
          .click()
        cy.get(':nth-child(1)>.selection-cell>input').check().should('be.checked')
        cy.get('select').eq(1).select('1').should('include.text','workflow1')
        cy.get('select').eq(0).select('14').should('include.text','lalitha g')
        cy.get('.blue').click()
    })
    it.skip('Extract data Curator',function()
    {
        cy.User1(CREDENTIALS.User1,CREDENTIALS.Pwd)
        cy.PTchars_dataextarct_WF1()
    })
    it.skip('Change Inprogress Curator',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;});
        // cy.get('[title="2"] > .page-link').click()
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
            .click()
        cy.get('#react-tabs-26').click().should('have.text','In Progress')
        cy.get('.selection-cell > input').check().should('be.checked')
        cy.get('select').eq(0).select('17').should('include.text','firstname Lokireddy')
        cy.get('.blue').click()
    })
    it('Login with Changed Curator',function()
    {
        cy.User2(CREDENTIALS.User2,CREDENTIALS.Pwd)
        cy.XRT1_dataextarct_WF1()
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Active Review"]').click({force:true})
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('The task will be moved to Active Review. Please confirm.')
        })
    })
})