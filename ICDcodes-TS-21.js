/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
describe('Workbench login and Dashboard',function()
{
    
    it('Admin Login',function()
    {
        cy.visit('http://localhost:9001/workbench/projects')
        cy.get('[name="username"]').type('admin@grn.com').should('have.value','admin@grn.com')
        cy.get('[name="password"]').type('password').should('have.value','password')
        cy.get('[type="submit"]').click()
    })
    it.skip('ICD code and sort-Table & Create & Duplicate ICD', function(){
        cy.intercept('/workbench/icdCodesSource/getAllIcdCodes').as('ICD')
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/icdCodes"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','ICD Codes')
        cy.wait('@ICD')
        // sorting ICD Table
        cy.get('[aria-label="ICD Code sortable"]>[draggable="true"]>div>.order-4').click()
        // Search ICD name
        cy.get('#text-filter-column-cdCode').type('demo').should('have.value','demo')
        cy.wait(1000)
        var i = 0;
        for (i = 0; i < 2 ; i++) {
        cy.get('.green').click()
        cy.get('#cdCodeId').type('A01-SMU').should('have.value','A01-SMU')
        cy.get('#cdNameId').type('Typhoid').should('have.value','Typhoid')
        cy.get('#cdDescription').type('Typhoid fever').should('have.value','Typhoid fever')
        cy.get('.blue').should('have.text',' Save').click()
        }
        // cy.contains('OK').click()
        // cy.on('window:alert', (str) => {
        //     expect(str).to.equal('Please check icd code(A01-SMU) already exist.')
        // })
    })
    it.skip('Reset and back ICD functionality', function(){
        cy.intercept('/workbench/icdCodesSource/getAllIcdCodes').as('ICD')
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/icdCodes"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','ICD Codes')
        cy.wait('@ICD')
        cy.get('.add-button').click()
        cy.get('#cdCodeId').type('A01-MM').should('have.value','A01-MM')
        cy.get('#cdNameId').type('Typhoid').should('have.value','Typhoid')
        cy.get('#cdDescription').type('Typhoid fever').should('have.value','Typhoid fever')
        cy.get('.form-group > .orange').should('have.text','Reset').click()
        cy.get('[style="margin-top: 10px; text-align: right;"] > .orange').click()
    })
    it('Edit and update ICD, Reset and back ', function(){
        cy.intercept('/workbench/icdCodesSource/getAllIcdCodes').as('ICD')
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/icdCodes"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','ICD Codes')
        cy.wait('@ICD')
        cy.get('#text-filter-column-cdCode').type('A01-SMU').should('have.value','A01-SMU')
        cy.get('[title="Edit"]').eq(0).click()
        cy.get('#cdNameId').clear().type('Malaria').should('have.value','Malaria')
        cy.get('#cdDescription').clear().type('Malaria fever').should('have.value','Malaria fever')
        // cy.get('.blue').should('have.text',' Update').click()
        // Reset and back button
        cy.get('.form-group > .orange').should('have.text','Reset').click()
        cy.get('[style="margin-top: 10px; text-align: right;"] > .orange').click()
    })
})