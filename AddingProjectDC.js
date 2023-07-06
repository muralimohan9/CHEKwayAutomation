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
    it('Adding-Project-DC', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('TestCypProject').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign Data Collection"] > .fas')
          .click()
        // cy.get('.fa-minus').click()
        // cy.contains('Ok').click()
        // cy.on('window:alert', (str) => {
        //     expect(str).to.equal('Do you really want to delete this Data Collection to this Project ?')
        // })
        // cy.wait(2000)
        cy.get(':nth-child(1)>#dataCollectionNameId>.css-mg4ywt-control>.css-1hwfws3')
            .type('XRT{enter}').should('have.text','XRT1')
        cy.get('.col-2 > #dataCollectionNameId > .css-mg4ywt-control')
            .type('G{enter}').should('have.text','Grid View')
        cy.get('.green').click()
        cy.xpath('//*[@id="createdatacollection"]/div/ol/li[2]/label/div/span[1]').click()
        cy.wait(1000)
        cy.get('.panel-body').scrollTo('bottom')
        // // cy.get('.form-style-3').scrollTo('bottom')
        // // cy.xpath('//*[@id="react-tabs-17"]/div/div/form/div/div/div[8]/div/div[3]/div[2]/div[1]/label/input')
        // //     .clear().type('UNKNOWN')
        cy.get('[title="Submit"]').click()
        cy.get('#react-tabs-28').click({force:true})
        cy.get('.panel-body').scrollTo('top')
        cy.get('[title="Back"]').click({force:true})
    })
})