/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
describe('Workbench login and Dashboard',function()
{
    
    it.skip('Admin Login',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
    })
    it.skip('Config Category and sort-Table', function(){
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        // cy.get(':nth-child(4)>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(1)>div>[title="Add Category"]>.fa').click()
        cy.get(':nth-child(10)>.nav-link').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        // sorting Categ Table
        cy.get('[aria-label="Category Name sortable"]>[draggable="true"]>div>.order-4').click()
        // Search Category name
        cy.get('[placeholder="Enter Category Name..."]').type('demo').should('have.value','demo')
    })
    it.skip('Create Config Category and duplicate creation', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get(':nth-child(10)>.nav-link').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        var i = 0;
        for (i = 0; i < 2 ; i++) {
        cy.get('.add-button').should('have.text',' Category').click()
        cy.get('#categoryNameId').type('Cypr-1-categ').should('have.value','Cypr-1-categ')
        cy.get('#displayNameId').type('Categ-Cyp1').should('have.value','Categ-Cyp1')
        cy.get('#description').type('New Auto Categ').should('have.value','New Auto Categ')
        cy.get('.blue').should('have.text','Save').click()
        }
        cy.contains('OK').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please check category name already exist.')
        })
        cy.wait(1000)
        cy.get('[style="margin-top: 10px; text-align: right;"] > .orange').click()
    })
    it.skip('Edit Config Category', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/categorys"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        // cy.get('[placeholder="Enter Category Name..."]').type('Cyp')
        cy.get(':nth-child(1) > :nth-child(6) > div > [type="button"] > .fa').click()
        cy.get('#categoryNameId').clear().type('Cypr-1-categ').should('have.value','Cypr-1-categ')
        cy.get('#displayNameId').clear().type('Categ-Cyp1').should('have.value','Categ-Cyp1')
        cy.get('#description').clear().type('New Auto Categ').should('have.value','New Auto Categ')
        cy.get('.form-group > .orange').should('have.text','Reset').click()
        cy.wait(1000)
        cy.get('[style="margin-top: 10px; text-align: right;"] > .orange').click()
        cy.wait(1000)
        // Inactive categ
        cy.get(':nth-child(1) > :nth-child(6) > div > [type="button"] > .fa').click()
        cy.get('#activeId').uncheck().should('not.be.checked')
        cy.get('.blue').should('have.text','Save').click()
    })
    it.skip('Delete Config Category', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/categorys"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        // Delete categ
        cy.get(':nth-child(1) > :nth-child(6) > div > [title="Delete"] > .fas').click()
        cy.contains('Cancel').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Do you really want to delete this category ?')
        })
    })
    it.skip('Add Category Search Term', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/categorys"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        // Add search categ
        var i = 0;
        for (i = 0; i < 2 ; i++) {
        cy.get(':nth-child(1) > :nth-child(6) > div > [title="Add Search Category Term"] > .fas').click()
        cy.get('#categoryTermNameId').type('CypCateg-2').should('have.value','CypCateg-2')
        cy.get('.form-group > .blue').should('have.text','Save').click()
        }
        cy.wait(1000)
        cy.contains('OK').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please check term already associated with this deleteCategory category.')
        })
    })
    it.skip('Edit Category Search Term, Reset and back', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/categorys"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        // Edit search categ
        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text','dca').click()
        cy.get(':nth-child(1) > :nth-child(13) > div > .icon > .fa').click({force:true})
        cy.wait(1000)
        cy.get('#categoryTermNameId').clear().type('CypCateg-2').should('have.value','CypCateg-2')
        cy.get('#description').clear().type('CypCateg-2').should('have.value','CypCateg-2')
        cy.get('#sourceId').clear().type('Docs').should('have.value','Docs')
        cy.get('.form-group > .orange').should('have.text','Reset').click()
        cy.wait(1000)
        cy.get('[style="margin-top: 10px; text-align: right; float: right; width: 20%;"] > .orange').click()
    })
    it.skip('Download and Upload Category Search Term', function(){
        const Categ ="CohortTemplate.xslx"
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/categorys"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        // Edit search categ
        cy.get('tbody>:nth-child(1)>:nth-child(3)').should('have.text','dca').click()
        cy.get(':nth-child(1)>:nth-child(6)>div>[title="Upload Search Category Term"]>.fas')
            .click()
        cy.wait(1000)
        // cy.get('.fa-download').click()
        // cy.verifyDownload('')
        cy.get('[type="file"]').attachFile({ filePath: 'CategorySearchtermTemplate.xlsx', fileName: 'Categ' })
        cy.get('.blue').should('have.text','Upload').click()
        // if blank excel is uploaded
        cy.contains('OK').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please check excel, no valid data to save.')
        })
        cy.get('.close > span').click()
    })
    it.skip('Inactivate Category Search Term', function(){
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/categorys"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Categories')
        cy.wait(1000)
        // Edit search categ
        cy.get('tbody>:nth-child(1)>:nth-child(3)').should('have.text','dca').click()
        cy.get('#text-filter-column-categoryTermName').type('lymphoma').should('have.value','lymphoma')
        cy.get(':nth-child(1) > :nth-child(13) > div > .icon > .fa').click()
        cy.get('#activeId').uncheck().should('not.be.checked')
        cy.get('.form-group > .blue').should('have.text','Save').click()
    })
})