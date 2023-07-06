/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    
    it('Adding Cohort to project',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.get(':nth-child(3) > :nth-child(5) > :nth-child(1) > div > [title="Edit"] > .fas').click()
        cy.get(':nth-child(3) > .stepper-item-outer').click()
        // cy.get('.css-1hwfws3').click()
        cy.contains('Cancel').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please activate the project to access the remaining steps ?')
        })
        cy.get(':nth-child(3) > .stepper-item-outer').click()
        // cy.get('.css-mg4ywt-control').type('AutoC{enter}')
        // cy.get('.col-md-2 > .blue').click()
        cy.get('[title="Delete Cohort"] > .fas').click()
        cy.contains('Cancel').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you really want to delete this cohort ?')
        })
        cy.get('.fa-eye').click()
        cy.get(':nth-child(1) > .selection-cell > .selection-input-4').check().should('be.checked')
        cy.get('.card > :nth-child(2) > .orange').click()
        cy.contains('Cancel').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you really want to delete this cohort ?')
        })
        cy.get('.col-md-5 > :nth-child(1)>.row >:nth-child(1) > .react-bs-table-sizePerPage-dropdown > #pageDropDown').click()
        cy.get('.col-md-5 > :nth-child(1)>.row >:nth-child(1) > .react-bs-table-sizePerPage-dropdown > .dropdown-menu > [data-page="25"]').click()
        cy.get('[title="3"] > .page-link').click()
        
    })
})