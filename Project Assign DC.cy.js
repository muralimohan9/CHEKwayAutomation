/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Adding new data collection to new project',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)        
        cy.wait(2000)
        // Project assign Data collection icon
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.get('.fa-project-diagram').click()
        
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(2)>:nth-child(5)>:nth-child(1)>div>[title="Assign Data Collection"]>.fas')
          .click()
        
        // cy.get('[type="submit"]').click({force:true})
        // cy.get('[title="Back"]').click()
        cy.get(':nth-child(1) > #dataCollectionNameId > .css-mg4ywt-control').type('Merged{enter}')
        cy.get('.col-2 > #dataCollectionNameId > .css-mg4ywt-control').type('Grid{enter}')
        cy.wait(2000)
        // cy.get('#displayNameId').clear().type('Automate DC')
        cy.get('.green').click()
        cy.get('.panel-body').scrollTo('bottom')      
    })
    it('Removing data collection from project',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)        
        cy.wait(2000)
        // Remove Data collection icon
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.get('.fa-project-diagram').click()
        cy.get(':nth-child(2)>:nth-child(5)>:nth-child(1)>div>[title="Assign Data Collection"]>.fas')
          .click()
        cy.get('.panel-body').scrollTo('bottom')
        // cy.focus(':nth-child(12)>label>.nodeLabel>.nodeactionscontainer>.none>.fas')
        cy.get(':nth-child(12)>label>.nodeLabel>.nodeactionscontainer>.none>.fas').click()
        cy.get('.minimize > span').click()
        cy.get('.minimizedModal > .blue').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you really want to delete this Data Collection to this Project ?')
        })
        cy.contains('Cancel').click()
    })
})