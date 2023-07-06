/// <reference types="Cypress"/>
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
    it.skip('Workflow-1', function(){
        cy.Workflow1()
    })
    it.skip('ReOpen / Workflow-1', function(){
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('Automation Project').click()
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
        cy.get(':nth-child(2) > .css-10xt3zp-container > .css-tu25sd-control').type('11fb4{enter}')
          .should('have.text','177e8fd328cf1e011fb4')
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
    it.skip('Query Reply',function()
    {
        cy.User1(CREDENTIALS.User1,CREDENTIALS.Pwd)
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        cy.get('#react-tabs-12').click().should('have.text','Query Tasks')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.blue2').click()
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        cy.wait(2000)
        cy.get('#react-tabs-44').click().should('have.text','Queries ')
        cy.wait(11000)
        cy.get('[title="Edit"] > .fas').click()
        cy.get('.NOT_APPLICABLE > .inputField > label > [style="white-space: nowrap;"] > [title="Not Applicable"] > .fas')
        .click()
        cy.get('#react-select-wbSelectbox-1765 > .css-2b097c-container > .css-7aiczb-control')
        .type('ot{enter}').should('have.text','Other')
        cy.get('.blue').click()
        
        cy.get('.extractionFormGrid > :nth-child(1) > .actionButton').click()
        cy.wait(1000)
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#queryId').type('Checked').should('have.text','Checked')
        cy.get('div > .blue').click()
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Reassign"]').click({force:true})
        // cy.get('.css-1hwfws3').type('user{enter}').should('have.text','user admin')
        cy.wait(3000)
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('This involves both curator/reviewer.')
        })
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
    })
    it('Admin Query resolve', function(){
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
        cy.get(':nth-child(1) > .css-10xt3zp-container > .css-tu25sd-control').type('Pro{enter}')
          .should('have.text','In Progress')
        cy.get(':nth-child(2) > .css-10xt3zp-container > .css-tu25sd-control').type('11fb4{enter}')
          .should('have.text','177e8fd328cf1e011fb4')
        cy.get('.row > :nth-child(1) > input').check().should('be.checked')
        cy.get('.blue').click().should('have.text','Get Data')
        cy.wait(30000)
        cy.get('.panel-body').scrollTo('bottom')
        cy.wait(5000)
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.wait(2000)
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#queryId').type('Alright').should('have.text','Alright')
        cy.get('.green').click().should('have.text','Resolved ')
        cy.wait(2000)
        cy.get('.col-md-3 > input').check().should('be.checked')
        cy.get(':nth-child(4)>.blue').click()
        cy.get('#commentsArea').type('OK').should('have.text','OK')
        cy.contains('Submit').click()
    })
})