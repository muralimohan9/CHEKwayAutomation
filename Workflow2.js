// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Signin',function()
    {
        cy.User1(CREDENTIALS.User1,
            CREDENTIALS.Pwd)
    })
    it.skip('Workflow-2', function(){
        cy.intercept('/workbench/home').as('home')
        cy.intercept('/workbench/taskMapping/taskInprogress').as('PTC')
        cy.intercept('//workbench/formMetadata/tasks/279729/entities/2/eavobjects?projectId=210&projectDataId=1517&subCollectionParentId=&stateTypeId=1').as('XRT')
        cy.contains('TestSantoshiMP').click()
        cy.wait(2000)
        cy.get(':nth-child(3) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });        
        cy.get(':nth-child(3) > .nav-link > span').click({force:true})
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        cy.get('#react-tabs-16').click().should('have.text','New')
        // cy.get('#react-tabs-18').click().should('have.text','In Progress')
        cy.get('tbody > :nth-child(1) > :nth-child(4)').should('have.text','workflow2')
        cy.get('.react-bootstrap-table').scrollTo('right')
        // cy.get('.blue2').click() // extract data button click
        cy.get('tbody > :nth-child(1) > :nth-child(10)').should('be.visible').click()  // extract data button click
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
        cy.get('.react-datepicker__input-container > input').click()
        cy.get(':nth-child(1) > .react-datepicker__day--001').click()
        cy.get(':nth-child(14) > .inputField > label > [style="width: 100%;"] > [style="white-space: nowrap;"] > [title="Not Applicable"] > .fas')
        .click()
        cy.get('[title="Save"]').click()
        // cy.wait('@PTC')
        // XRT data collection
        cy.get('#react-tabs-30').click().should('include.text','XRT1')
        cy.wait(25000)
        cy.get('[title="Add"]').click()
        cy.get('#react-select-wbSelectbox-1007>.css-2b097c-container>.css-7aiczb-control>.css-1hwfws3')
          .type('No{enter}').should('include.text','No')
        cy.get('textarea').type('Radtion Nill')
        cy.get('center > .blue').click()
        cy.wait(25000)
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Submit To Reviewer"]').click({force:true})
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Task will be sent for review.Please select reviewer.')
        })
        cy.wait(4000)
        cy.get('.fa-caret-down').click().should('be.visible')
        cy.get('.fa-sign-out-alt').click({force:true})
    })
    it('Reviewer Signin',function()
    {
      cy.User2(CREDENTIALS.User2,CREDENTIALS.Pwd)
        cy.intercept('/workbench/home').as('home')
        cy.intercept('/workbench/taskMapping/taskInprogress').as('PTC')
        cy.intercept('//workbench/formMetadata/tasks/279729/entities/2/eavobjects?projectId=210&projectDataId=1517&subCollectionParentId=&stateTypeId=1').as('XRT')
        // cy.contains('TestSantoshiMP').click()
        // cy.wait(2000)
        // cy.get(':nth-child(3) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });        
        cy.get(':nth-child(3) > .nav-link > span').click({force:true})
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        cy.get('#react-tabs-6').click().should('have.text','Initial Review')
        cy.get('tbody > :nth-child(1) > :nth-child(5)').should('have.text','workflow2')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.orange2').should('be.visible').click()
        cy.wait(2000)
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
        cy.get('.react-datepicker__input-container > input').click()
        cy.get(':nth-child(1) > .react-datepicker__day--001').click()
        cy.get(':nth-child(14) > .inputField > label > [style="width: 100%;"] > [style="white-space: nowrap;"] > [title="Not Applicable"] > .fas')
        .click()
        cy.get('.blue').click()
        cy.wait(15000)
        // XRT data collection
        cy.get('#react-tabs-16').click().should('include.text','XRT1')
        cy.wait(25000)
        cy.get('[title="Add"]').click()
        cy.get('#react-select-wbSelectbox-1007>.css-2b097c-container>.css-7aiczb-control>.css-1hwfws3')
          .type('No{enter}').should('include.text','No')
        cy.get('[name="1008"]').type('Radtion Nill')
        cy.get('center > .blue').click()
        cy.wait(25000)
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Review Data"]').click({force:true})
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you like to lock all your task data and do review process ?')
        })
        cy.wait(4000)
        cy.get('#react-tabs-46').click({force:true}).should('include.text','patient_characteristics')
        cy.wait(25000)
        cy.get(':nth-child(4) > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1)>label>.nodeLabel>.node-green').click()
        cy.wait(25000)
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Active Review"]').click({force:true})
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('The task will be moved to Active Review. Please confirm.')
        })
        cy.get('.fa-caret-down').click().should('be.visible')
        cy.get('.fa-sign-out-alt').click()
    })
})