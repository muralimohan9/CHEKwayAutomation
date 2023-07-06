/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    
    it('Test case 1',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.contains('Automation Project').click()
        cy.get('#react-tabs-2').should('have.text','New').click()
        cy.waitUntil(() => {  return Cypress.$('button').length > 0;}, 5000);  
        cy.get('#text-filter-column-assignedTo').type('admin')
        // cy.get('#text-filter-column-status').type('Open')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1) > :nth-child(10) > div > :nth-child(1) > .blue2').should('be.visible')
        cy.get(':nth-child(1) > :nth-child(10) > div > :nth-child(1) > .blue2').click()
        cy.get('.breadcrumb-item > span').should('have.text','Extraction (Open)')
        cy.get('b > :nth-child(2)').should('have.text','Automation Project')
        cy.get('h2 > span').should('be.visible')
        cy.get('.col-lg-1 > .actionButton').should('be.visible')
        cy.get('.col-lg-1 > .actionButton').click()
        
    })
})