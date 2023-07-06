/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it('Signin',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)
    })
    it('Adding-Project-DC', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        // cy.get('tbody > :nth-child(1) > :nth-child(2) > :nth-child(1) > span')
            // .should('include.text','TestCypProject')
        // cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Assign Data Collection"] > .fas')
        //   .click()
        cy.get('[href="/workbench/entities"]').invoke('removeAttr', 'target').click()
        //   .and('include.text','Data Collections')
        cy.get('.add-button').click()
        
        cy.get('[name="entityName"]').each(($el,index,$list)=>{
            if($el.text()=="")
            {
                cy.get('[title="Submit"]').click()
                cy.contains('Entity Name is a Required field.').should('have.text','Entity Name is a Required field.')
            }
                cy.wait(2000)
                cy.get('[name="entityName"]').type('Automation-DC').should('include.value','Automation-DC')
                cy.get('[name="entityDescription"]').type('Automation-DC').should('have.text','Automation-DC')
                cy.get('[title="Submit"]').click()
        })
        cy.wait(1000)
        cy.get('.fa-plus').click()
        cy.wait(1000)
        cy.get(':nth-child(1)>.form-style-3>form>:nth-child(1)>[style="height: 400px; overflow-y: scroll;"]>:nth-child(1)>label>input')
            .type('CypTest-N1').should('include.value','CypTest-N1')
        cy.get(':nth-child(1)>.form-style-3>form>:nth-child(1)>[style="height: 400px; overflow-y: scroll;"]>:nth-child(2)>label>input')
            .type('CypTest-N1').should('include.value','CypTest-N1')
            cy.get(':nth-child(1)>.form-style-3>form>:nth-child(1)>[style="height: 400px; overflow-y: scroll;"]>:nth-child(3)>label>input')
            .type('CypTest-N1').should('include.value','CypTest-N1')
        cy.xpath('/html/body/div[3]/div/div/div/div/div[2]/div/div/div/form/div/div/div[4]/label/textarea')
            .type('CypTest-N1').should('include.value','CypTest-N1')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > .col-md-12 > :nth-child(5) > label > [style="width: 100%;"] > #react-select-wbSelectbox-datatype > .css-2b097c-container > .css-7aiczb-control')
            .type('Str{enter}')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > .col-md-12 > :nth-child(7) > div > input')
            .check().should('be.checked')
        cy.get(':nth-child(1) > .form-style-3 > form > :nth-child(1) > center > .blue').click()
        cy.get('[title="Back"]').click()
        cy.wait(2000)
        // Editing the Data collection and
        cy.get(':nth-child(2) >:nth-child(1) > :nth-child(3)').should('include.text','Automation-DC')
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Edit"] > .fas').click()
        cy.get('[title="Edit Data collection"] > .fas').click()
        cy.get('.fullEntity-desc').clear().type('Its a new automated Data collection')
            .should('include.value','Its a new automated Data collection')
        cy.get('[style="border: 1px solid rgb(221, 221, 221); padding: 5px;"] > .form-style-3 > form > :nth-child(1) > center > .blue').click()
        // delete element
        cy.get(':nth-child(3)>label>.nodeLabel>.nodeactionscontainer>.actionButton>.fas').click()
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Are you sure to delete this data element ?')
        })
        cy.get('[title="Back"]').click()
        cy.wait(1000)
        // Activate and In-Activate DC
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > .switch > .slider').click()
        cy.get('#commentsArea').type('In-Activate').should('include.value','In-Activate')
        cy.get('#activeId').uncheck().should('not.be.checked')
        cy.get('.blue').click()
        cy.wait(1000)
        // Deleting Data Collection
        // cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > div > [title="Delete"] > .fas').click()
        // cy.contains('Yes').click()
        // cy.on('window:alert', (str) => {
        //     expect(str).to.equal('Do you really want to delete this Data Collection?')
        // })
    })
})