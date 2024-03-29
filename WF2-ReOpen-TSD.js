/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Signin',function()
    {
        cy.User1(CREDENTIALS.User1,CREDENTIALS.Pwd)
    })
    it.skip('Workflow-2', function(){
        cy.Workflow2()
    })
    it.skip('Workflow-2/Reviewer', function(){
        cy.Workflow2_Reviewer()
    })
    it.skip('ReOpen / Workflow-2', function(){
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.get(':nth-child(4)>.nav-link').click().should('have.text',' Projects')
        cy.get(':nth-child(1)>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(1)>div>[title="Task Summary Data Report"]')
          .click()
        //Status and euid
        cy.get(':nth-child(1) > .css-10xt3zp-container > .css-tu25sd-control').type('Act{enter}')
          .should('have.text','Active Review')
        cy.get(':nth-child(2) > .css-10xt3zp-container > .css-tu25sd-control').type('48adc{enter}')
          .should('have.text','165bd5fca3ce98a48adc')
        cy.get('.row > :nth-child(1) > input').check().should('be.checked')
        cy.get('.blue').click().should('have.text','Get Data')
        cy.wait(10000)
        // cy.get('#react-tabs-24').click().should('include.text','XRT1')
        // cy.wait(10000)
        cy.get('.panel-body').scrollTo('center')
        cy.wait(20000)
        cy.get('#CommentsId').type('check all data').should('have.text','check all data')
        cy.contains('Submit').click()
        cy.get('.panel-body').scrollTo('top')
        cy.get(':nth-child(2) > input').check().should('be.checked')
        cy.get('.col-md-2 > .css-10xt3zp-container > .css-tu25sd-control').type('lal{enter}')
        .should('have.text','lalitha g')
        cy.contains('Re-Open').click().should('have.text','Re-Open')
        cy.wait(1000)
        cy.get('#commentsArea').type('Done').should('have.text','Done')
        cy.get('form > div > .blue').click().should('have.text','Submit')
    })
    it.skip('Curator Query Reply',function()
    {
        cy.User1(CREDENTIALS.User1,CREDENTIALS.Pwd)
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        cy.get('#react-tabs-12').click().should('have.text','Query Tasks')
        cy.get('.colorBarQueryFlag').click()
        cy.get(':nth-child(1) > .dottext').should('have.text',' New Query ( count : 1 )')
        cy.get('.close > span').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.blue2').click()
        cy.wait(2000)
        cy.get('#react-tabs-44').click().should('have.text','Queries ')
        cy.wait(15000)
        cy.get('[title="Edit"] > .fas').click()
        cy.get('.NOT_APPLICABLE > .inputField > label > [style="white-space: nowrap;"] > [title="Not Applicable"] > .fas')
        .click()
        cy.get('#react-select-wbSelectbox-1765 > .css-2b097c-container > .css-7aiczb-control')
        .type('ot{enter}').should('have.text','Other')
        // cy.get('.blue').click()
        cy.get('.extractionFormGrid > :nth-child(1) > .actionButton').click()
        cy.wait(1000)
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#queryId').type('Checked').should('have.text','Checked')
        cy.get('div > .blue').click()
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Submit To Reviewer"]').click({force:true})
        // cy.get('.css-1hwfws3').type('user{enter}').should('have.text','user admin')
        cy.wait(3000)
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Task will be sent for review.Please select reviewer.')
        })
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
    })
    it.skip('Reviewer Query Reply',function()
    {
        cy.User2(CREDENTIALS.User2,CREDENTIALS.Pwd)
        cy.intercept('/workbench/taskFeedback/getByTaskId?taskId=279279&status=Open').as('Task')
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        // cy.get('#react-tabs-12').click().should('have.text','Query Tasks')
        cy.get('#react-tabs-6').click().should('have.text','Initial Review')
        cy.wait(2000)
        // cy.get('.colorBarQueryFlag').click()
        // cy.get(':nth-child(1) > .dottext').should('have.text',' New Query ( count : 1 )')
        // cy.get('.close > span').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1) > :nth-child(11) > div > :nth-child(1) > .orange2').click()
        // cy.wait('@Task')
        cy.get('#react-tabs-44').click().should('have.text','Queries ')
        // cy.wait('@Task')
        cy.wait(4000)
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        Cypress.on('uncaught:exception', (err, runnable) => { return false; });
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#queryId').type('Checked').should('have.text','Checked')
        cy.get('.orange').click()
        cy.wait(3000)
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Active Review"]').click({force:true})
        // cy.wait(3000)
        cy.contains('Ok').click({force:true})
        cy.on('window:alert', (str) => {
            expect(str).to.equal('The task will be moved to Active Review. Please confirm.')
        })
    })
    it('Admin Query resolve', function(){
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.intercept('/workbench/taskFeedback/getByTaskId?taskId=279279&status=Open').as('Task')
        cy.intercept('/workbench/searchCategory/getCategorysAndTermsAndSynByProjectId?projectId=210').as('gCATS')
        // cy.contains('testing project').click()
        // cy.wait(2000)
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        // cy.get(':nth-child(4)>.nav-link').click().should('have.text',' Projects')
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        cy.get('#react-tabs-10').click().should('have.text','Active Review')
        cy.wait(2000)
        cy.get('.colorBarQueryFlag').click()
        cy.get(':nth-child(2) > .dottext').should('have.text',' Old Query with a new question ( count : 1 )')
        cy.get('.close > span').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.orange2').click()
        cy.wait(2000)
        // cy.wait('@Task')
        cy.get('#react-tabs-48').click().should('have.text','Queries ')
        // cy.wait('@gCATS')
        cy.wait(4000)
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        Cypress.on('uncaught:exception', (err, runnable) => { return false; });
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#queryId').type('Resolved').should('have.text','Resolved')
        cy.get('form > div > .green').click()
        cy.wait(2000)
        cy.get(':nth-child(3) > .nav-link').click()
        cy.contains('Ok').click({force:true})
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you really want leave extraction screen ?')
        })
    })
})