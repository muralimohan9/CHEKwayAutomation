/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Assign task to Curator',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;});
        // cy.get('[title="2"] > .page-link').click()
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
          .click()
        cy.get(':nth-child(1)>.selection-cell>input').check().should('be.checked')
        cy.get('select').eq(1).select('2').should('include.text','workflow2')
        cy.get('select').eq(0).select('14').should('include.text','lalitha g')
        cy.get('.test-header>:nth-child(4)').select('firstname Lokireddy').should('include.text','firstname Lokireddy')
        cy.get('.blue').click()
    })
    it.skip('Curator Signin',function(){
        cy.User1(CREDENTIALS.User1,CREDENTIALS.Pwd)
        cy.Workflow2()
    })
    it.skip('Login with Changed Curator',function()
    {
        cy.User2(CREDENTIALS.User2,CREDENTIALS.Pwd)
        cy.WF2_ReviewerExtractData()
        cy.wait(2500)
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Review Data"]').click({force:true})
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you like to lock all your task data and do review process ?')
        })
    })
    it.skip('Change Reviewer',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;});
        // cy.get('[title="2"] > .page-link').click()
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign User"] > .fas')
            .click()
        cy.get('#react-tabs-28').click().should('have.text','Initial Review')
        cy.get('.selection-cell > input').check().should('be.checked')
        // cy.get('select').eq(0).select('18').should('include.text','Lavanya  Lavanya ')
        cy.get('.test-header>:nth-child(4)').select('Lavanya  Lavanya').should('include.text','Lavanya  Lavanya ')
        cy.get('.blue').click()
    })
    it('Login with Changed Reviewer',function()
    {
        cy.Signin(CREDENTIALS.Lead,CREDENTIALS.Pwd)
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;});
        cy.contains('Automation Project').click({force:true}).should('include.text','Automation Project')
        cy.get('#react-tabs-6').click().should('have.text','Initial Review')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.orange2').click()
        cy.wait(2000)
        cy.get('#react-tabs-48').click().should('have.text','patient_characteristics')
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Active Review"]').click({force:true})
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('The task will be moved to Active Review. Please confirm.')
        })
    })
})