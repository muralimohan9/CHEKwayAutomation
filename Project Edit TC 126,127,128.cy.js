/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    
    it.skip('Test case 126',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
          .click()
        cy.get('#react-tabs-26').should('include.text','In Progress').click()
        cy.get('tbody > tr > :nth-child(4)').should('include.text','In Progress')
        cy.get('tbody > tr > :nth-child(5)').should('not.be.empty')
        cy.get('.selection-cell > input').check().should('be.checked')
        cy.get('select').eq(0).select('18').should('include.text','Lavanya  Lavanya ')
        cy.get('.blue').should('have.text','Submit')
        cy.get('.blue').click()
        cy.get('tbody > tr > :nth-child(5)').should('include.text','Lavanya  Lavanya ')
    })
    it.skip('Test case 127',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
          .click()
        cy.get('#react-tabs-32').should('include.text','Active Review').click()
        cy.get('tbody > :nth-child(1) > :nth-child(4)').should('include.text','Active Review')
        cy.get('#text-filter-column-workflowTemplateId').type('1')
        cy.get(':nth-child(1) > .selection-cell > input').check().should('be.checked')
        cy.wait(2000)
        // cy.get('.test-header > :nth-child(6)').select('ReOpen').should('include.text','ReOpen')
        cy.get('select').eq(1).select('ReOpen').should('include.text','Re-Open')
        cy.get('select').eq(0).select('14').should('include.text','lalitha g')
        cy.get('.blue').should('have.text','Submit')
    })
    it('Test case 127',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
          .click()
        cy.get('#react-tabs-24').should('include.text','New').click()
        cy.get('#text-filter-column-status').type('ReOpen')
        cy.get(':nth-child(1) > .selection-cell > input').check().should('be.checked')
        cy.get('select').eq(0).select('14').should('include.text','lalitha g')
        cy.get('select').eq(2).select('1').should('include.text','workflow1')
        // cy.get('.test-header > :nth-child(6)').select('workflow1').should('include.text','workflow1')
        cy.get('.blue').should('have.text','Submit')
    })
})