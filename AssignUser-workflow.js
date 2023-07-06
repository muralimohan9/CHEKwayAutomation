/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it('Signin',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)
    })
    it('Assign Users', function(){
        cy.intercept('/workbench/dashboard/getProjectDataByUserIDOrProjectID?projectId=210&status=Draft')
        .as('draft')
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        // cy.get('[title="2"] > .page-link').click()
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
          .click()
        // cy.wait('@draft')
        cy.get(':nth-child(1)>.selection-cell>input').check().should('be.checked')
        // cy.get('select').eq(1).select('1').should('include.text','workflow1')
        // cy.get('select').eq(1).select('2').should('include.text','workflow2')
        cy.get('select').eq(1).select('3').should('include.text','workflow3')
        cy.wait(1000)
        // cy.get('select').eq(0).select('14').should('include.text','lalitha g')
        cy.get('select').eq(0).select('18').should('include.text','Lavanya  Lavanya ')
        // cy.get('.test-header>:nth-child(4)').select('Lavanya  Lavanya').should('include.text','Lavanya  Lavanya ')
        // cy.get('.test-header>:nth-child(4)').select('firstname Lokireddy').should('include.text','firstname Lokireddy')        
        cy.get('.blue').click()
    })
})