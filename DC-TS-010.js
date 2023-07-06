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
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.adminpwd)
    })
    it.skip('DC-Sort-Table', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Data Collections')
        cy.wait(1000)
        // sorting DC Table
        cy.get('[aria-label="Name sortable"] > [draggable="true"] > div > .order-4').click()
        // Search DC name
        cy.get('[placeholder="Enter Name..."]').type('Auto').should('have.value','Auto')
    })
    it.skip('Duplicate DC creation', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Data Collections')
        cy.wait(1000)
        cy.get('.add-button').click()
        cy.wait(1000)
        cy.get('[name="entityName"]').type('Automation-DC').should('include.value','Automation-DC')
        cy.get('[name="entityDescription"]').type('Automation-DC').should('have.text','Automation-DC')
        cy.get('[title="Submit"]').click()
        cy.contains('OK').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Data Collection name already exists')
        })
    })
    it.skip('Reset and back in DC creation', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Data Collections')
        cy.wait(1000)
        cy.get('.add-button').click()
        cy.wait(1000)
        cy.get('[name="entityName"]').type('NewCyp-DC').should('include.value','NewCyp-DC')
        cy.get('[name="entityDescription"]').type('NewCyp-DC').should('have.text','NewCyp-DC')
        cy.get('center > .orange').should('have.text','Reset').click()
        cy.wait(500)
        cy.get('[style="margin-top: 10px; text-align: right; margin-bottom: 10px;"]>.orange')
        .should('have.text','  Back ').click()
    })
    it.skip('Clone DC creation', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Data Collections')
        cy.wait(1000)
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Copy"] > .fas').click()
        cy.get('[name="dataCollectionName"]').type('Auto-Clone-DC').should('include.value','Auto-Clone-DC')
        cy.get('[placeholder="Enter Description"]').type('This is cloned').should('have.value','This is cloned')
        cy.get('.blue').click()
    })
    it.skip('Duplicate Data Element creation', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Data Collections')
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(5) > :nth-child(1) > div > [title="Edit"] > .fas').click()
        // cy.get('[title="Edit Data collection"] > .fas').click()
        cy.get('.fa-plus').click()
        cy.wait(1000)
        cy.get(':nth-child(1)>.form-style-3>form>:nth-child(1)>[style="height: 400px; overflow-y: scroll;"]>:nth-child(1)>label>input')
            .type('AutoDE-N1').should('include.value','AutoDE-N1')
        cy.get(':nth-child(1)>.form-style-3>form>:nth-child(1)>[style="height: 400px; overflow-y: scroll;"]>:nth-child(2)>label>input')
            .type('AutoDE-N1').should('include.value','AutoDE-N1')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > .col-md-12 > :nth-child(3) > label > input')
            .type('AutoDE-N1').should('include.value','AutoDE-N1')
        // cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > [style="height: 400px; overflow-y: scroll;"] > :nth-child(4) > [style="width: 100%;"] > label > #react-select-wbSelectbox-datatype > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            // .type('Str{enter}')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > .col-md-12 > :nth-child(9) > div > input')
            .check().should('be.checked')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > center > .blue').click()
    })
    it.skip('Edit Data element ', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Data Collections')
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(5) > :nth-child(1) > div > [title="Edit"] > .fas').click()
        cy.wait(1000)
        cy.get(':nth-child(3) > label > .nodeLabel > [title=""]').click()
        cy.get('.css-1hwfws3').type('Tex{enter}').should('include.text','textarea')
        cy.get(':nth-child(7) > div > input').check().should('be.checked')
            //Submit
        cy.get('.blue').should('have.text','Submit').click()
        cy.get('[style="margin-top: 10px; text-align: right; margin-bottom: 10px;"] > .orange').click()
    })
    it.skip('Reset and back in Data element ', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        cy.get('h2').should('have.text','Data Collections')
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(5) > :nth-child(1) > div > [title="Edit"] > .fas').click()
        cy.get('.fa-plus').click()
        cy.wait(1000)
        cy.get(':nth-child(1)>.form-style-3>form>:nth-child(1)>[style="height: 400px; overflow-y: scroll;"]>:nth-child(1)>label>input')
            .type('CypTest-N1').should('include.value','CypTest-N1')
        cy.get(':nth-child(1)>.form-style-3>form>:nth-child(1)>[style="height: 400px; overflow-y: scroll;"]>:nth-child(2)>label>input')
            .type('CypTest-N1').should('include.value','CypTest-N1')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > .col-md-12 > :nth-child(4) > label > textarea')
        .type('CypTest-N1').should('include.text','CypTest-N1')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > .col-md-12 > :nth-child(5) > label > [style="width: 100%;"] > #react-select-wbSelectbox-datatype > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')    
            .type('Tex{enter}').should('include.text','textarea')
            //Reset
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > center > .orange')
        //Close
        cy.get('.close > span').click()
        //Back
        cy.get('[style="margin-top: 10px; text-align: right; margin-bottom: 10px;"] > .orange').click()
    })
})