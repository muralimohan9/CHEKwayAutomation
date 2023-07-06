/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it('Signin',function()
    {
        cy.User1(CREDENTIALS.User1,
            CREDENTIALS.Pwd)
    })
    it('Workflow-1', function(){
        cy.intercept('/workbench/home').as('home')
        // cy.contains('Automation Project').click()
        // cy.wait(2000)
        // cy.get(':nth-child(3) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        
        // cy.get(':nth-child(3) > .nav-link > span').click({force:true})
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        // cy.get('#react-tabs-2').click().should('have.text','New')
        cy.get('#react-tabs-4').click().should('have.text','In Progress')
        // cy.get('tbody > tr > :nth-child(4)')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.blue2').click()
        cy.wait(2000)
        cy.get('.extractProjectname').click()
        cy.get('#react-tabs-14').should('include.text','patient_characteristics')
        cy.get('[title="Add"]').click()
        // Adding Data Elements
        cy.get('select').eq(0).select('Jan').should('include.text','Jan')
        cy.get('select').eq(1).select('1').should('include.text','1')
        cy.get('select').eq(2).select('1980').should('include.text','1980')
        
        cy.get('[name="3"]').type('Alive').should('have.value','Alive')

        cy.get('select').eq(3).select('Jan').should('include.text','Jan')
        cy.get('select').eq(4).select('1').should('include.text','1')
        cy.get('select').eq(5).select('2019').should('include.text','2019')
        cy.get('#react-select-wbSelectbox-1361 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
          .type('Wh{enter}').should('include.text','White')
        // cy.get('.react-datepicker-wrapper').find('.react-datepicker__month-read-view--down-arrow').contains('February')
        cy.get('.react-datepicker__input-container > input').click()
        cy.get(':nth-child(1) > .react-datepicker__day--001').click()
        cy.get(':nth-child(14) > .inputField > label > [style="width: 100%;"] > [style="white-space: nowrap;"] > [title="Not Applicable"] > .fas')
        .click()
        cy.get('.blue').click()
        cy.wait(5000)
        cy.get('#react-tabs-16').click().should('include.text','XRT1')
        cy.get('[title="Add"]').click()
        cy.get('#react-select-wbSelectbox-1007 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
          .type('No{enter}').should('include.text','No')
        cy.get('textarea').type('Radtion Nill')
        cy.get('center > .blue') .click()
        cy.wait(5000)       
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Active Review"]').click({force:true})
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('The task will be moved to Active Review. Please confirm.')
        })
        
    })
})