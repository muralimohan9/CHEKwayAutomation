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
    it.skip('Publish Project', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(1)>:nth-child(5)>:nth-child(1)>div>[title="Publish"]>.fas')
          .click()
        cy.contains('Yes').click()
        cy.on('window:alert', (txt) => {
              expect(txt).to.contains('Do you really want to publish this project ?')
              return false;
        })
    })
    it('Add Users', function(){
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get(':nth-child(1)>:nth-child(5)>:nth-child(1)>div>[title="Edit"]>.fas')
            .click()
        cy.contains('9').should('include.text','9').click()
        cy.wait(1000)
        cy.get('.dropdown-heading-value').type('lalitha g{enter}').click()
        cy.get('.dropdown-heading-value').type('Lavanya Lavanya{enter}').click()
        cy.get('.dropdown-heading-value').type('firstname Lokireddy{enter}').click()
        // cy.get('.dropdown-heading-value').type('lalitha g')
        //     .eq(0).click()
        // cy.get(':nth-child(2) > div > .blue').click()
        cy.get('[title="Back"]').click()
    })
    
})