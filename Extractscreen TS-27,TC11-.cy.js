/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    
    it('Test case 11',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        // downloading the help document
        // cy.get('[title="Download or View File"]').should('be.visible')
        // cy.get('[title="Download or View File"]').click()
        // cy.get('[download="WB_Dashboard"]').should('be.visible')

        // cy.get('[download="WB_Dashboard"]').click()
        
        // viewing the help document
        cy.get('[title="Download or View File"]').click()
        cy.get('[target="_blank"]').should('be.visible')
        // cy.get('[target="_blank"]').click()

        cy.contains('Automation Project').click()
        cy.get('#react-tabs-2').should('have.text','New').click()
        cy.waitUntil(() => {  return Cypress.$('button').length > 0;}, 5000);  
        cy.get('#text-filter-column-assignedTo').type('admin')
        // cy.get('#text-filter-column-status').type('Open')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1) > :nth-child(10) > div > :nth-child(1) > .blue2').should('be.visible')
        cy.get(':nth-child(1) > :nth-child(10) > div > :nth-child(1) > .blue2').click()
        
        // full screen and normal mode
        cy.get('.col-lg-6 > :nth-child(1) > .actionButton > .fas').click()
        cy.get('.col-lg-6 > :nth-child(1) > .actionButton > .fas').click()
        
        // cy.get(':nth-child(3) > .nav-link').click()
        // cy.contains('Ok').click()
        // cy.on('window:alert', (str) => {
        //     expect(str).to.equal('Do you really want leave extraction screen ?')
        // })
    })
})