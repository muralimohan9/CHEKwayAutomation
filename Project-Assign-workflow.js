/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Assign-Project-Workflow',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(2)>:nth-child(5)>:nth-child(1)>div>[title="Assign Workflow"]>.fas')
          .click()
        cy.get('.css-1hwfws3').type('3{enter}').should('include.text','workflow3')
            // .type('1{enter}').should('include.text','workflow1')
            // .type('2{enter}').should('include.text','workflow2')
        cy.get('[type="submit"]').click({force:true})
        cy.get('[title="Back"]').click()
    })
    it('Update-Project-Workflow',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => { return false; });
        cy.get(':nth-child(2)>:nth-child(5)>:nth-child(1)>div>[title="Assign Workflow"]>.fas')
        .click()
        cy.get('.css-xb97g8').click()
        cy.get('.css-1wy0on6').click()
        cy.get('.css-1hwfws3').type('2{enter}').should('include.text','workflow2')
        cy.get('[type="submit"]').click({force:true})
        cy.get('[title="Back"]').click()
    })
})