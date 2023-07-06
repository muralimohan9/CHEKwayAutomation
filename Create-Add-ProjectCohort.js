/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-file-upload';

describe('Workbench login and Dashboard',function()
{
    it('Signin',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)
    })
    it('Creating & Adding-Project-Cohort', function(){
        const NewCohort ="CohortTemplate.xslx"
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(7) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
        });
        cy.get('.fa-plus-circle').click()
        cy.get('[name="fileName"]').type('AutoCohort')
            .should('have.value','AutoCohort')
        // cy.get('.fa-download').click()
        cy.get('[type="file"]').attachFile({ filePath: 'CohortTemplate.xlsx', fileName: 'NewCohort' })
        cy.get('[type="submit"]').click().should('be.ok')

        /* Editing of cohort */

        cy.get(':nth-child(1) > [textalign="center"] > .icon').click({force:true})
        cy.get('#euidId').type('New101010101010').should('have.value','New101010101010')
        cy.get('[style="margin-top: 10px; width: 74%;"]>.css-2b097c-container >.select__control')
            .type('Mer{enter}').should('have.text','Mercy Health System')
        cy.get('[type="submit"]').click()
        cy.wait(2000)
        cy.get('[placeholder="Enter EUID..."]').type('New101010101010')
            .should('have.value','New101010101010')
        cy.get('.selection-cell').click()
        // cy.get('.selection-cell').first().check().should('be.checked')
        cy.get('#commentsId').type('Irrelevant EUID').should('have.value','Irrelevant EUID')
        cy.contains('Delete').click()
        cy.get('[style="float: right;"]').click()
        
        /* Adding of cohort in project */
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        cy.get(':nth-child(1)>:nth-child(5)>:nth-child(1)>div>[title="Assign Cohort"]>.fas')
          .click()
        cy.get('.css-1y9hbj8-placeholder').type('AutoCohort{enter}')
        cy.get('[type="submit"]').click().should('be.ok')
        cy.get('.fa-eye').click()
        cy.get(':nth-child(1) > .selection-cell > .selection-input-4').check().should('be.checked')
        cy.contains('Delete')
        cy.get('[title="Back"]').click()
    })
})