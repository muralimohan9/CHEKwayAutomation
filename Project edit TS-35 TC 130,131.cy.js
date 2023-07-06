/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    
    it('Test case 130',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            .should('include.text','Automation Project')
        // cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
        //   .click()
        cy.get(':nth-child(1)>:nth-child(5)>:nth-child(1)>div>[title="Edit"]>.fas').click()
        cy.get(':nth-child(15) > .stepper-item-outer').should('include.text',' 8 ')
        cy.get(':nth-child(15) > .stepper-item-outer').click()
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please activate the project to access the remaining steps ?')
        })
        cy.get(':nth-child(15) > .stepper-item-outer').click()
        // cy.get('.form-group > .blue').click()
        cy.get('#tabName').should('be.empty')
        cy.get('#tabName').focus().type('Test Report').should('contain.value','Test Report')
        cy.get('.css-1hwfws3').click()
        cy.get('.css-1hwfws3').type('consult{enter}')
        cy.get('.css-1hwfws3').should('include.text','Radiation Oncology Consult')
        // cy.get('#sourceMappingValue').click()
        cy.get('#sourceMappingValue').focus()
        cy.get('select').eq(0).select('CustomReports').should('include.text','Custom Reports')
        // cy.get('#displayType').click()
        // cy.get('#displayType')
        cy.get('select').eq(1).select('Table').should('include.text','Table')
        cy.wait(2000)
        cy.get('.css-1wa3eu0-placeholder').type('X{enter}')
        cy.get('.css-1wa3eu0-placeholder').type('numb{enter}')
        cy.get('#dbQuery_id').type('euid').should('contain.value','euid')
        cy.get('#columnMapping_id').type('euid').should('contain.value','euid')
        cy.get('select').eq(2).select('number').should('include.text','Number')
        cy.get('[style="width: 20%; margin: 0px auto;"] > .btn').click()
        cy.wait(2000)
        cy.get('.col-md-12 > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.get('.form-group > .blue').click()
    })
})