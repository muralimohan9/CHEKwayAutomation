/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Signin',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
    })
    it.skip('Project Query Screen',function()
    {
        const NewQuery ="Query Format.xslx"
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => { return false; });
        // cy.get('[title="3"] > .page-link').click()
        cy.get(':nth-child(1)>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(1)>div>[title="Project Queries"]')
          .click()
        cy.get('[title="Download"]').click()
        cy.verifyDownload('')

        // uploading dummy file to raise query and check weather its getting uploaded or not
        cy.get('[type="file"]').attachFile({ filePath: 'Validation Rules.xlsx', fileName: 'VRules' })
        cy.get('[title="Submit"]').click().should('be.visible')
        cy.wait(2000)
        // uploading query file to raise query 
        cy.get('[type="file"]').attachFile({ filePath: 'Query Format.xlsx', fileName: 'NewQuery' })
        cy.get('[value="Admin Query"]').check().should('be.checked')
        cy.get('[title="Submit"]').click().should('be.visible')
    })
    it.skip('User Query Submit',function()
    {
        cy.intercept('workbench/dashboard/getDataCollection/ValidationRules/Values?projectId=210&eavId=148&taskId=284719&stateTypeId=1')
            .as('XRT')
        cy.Signin(CREDENTIALS.User1,CREDENTIALS.Pwd)
        cy.contains('Automation Project').click().should('have.text','Automation Project       ')
        cy.get('#react-tabs-12').click().should('have.text','Query Tasks')
        cy.get('.colorBarQueryFlag').click()
        cy.get('#exampleModalLabel').should('have.text','Query Information')
        cy.get(':nth-child(1) > .dottext').should('have.text',' New Query ( count : 1 )')
        cy.wait(1000)
        cy.get('.close').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.blue2').click()
        // cy.wait(4000)
        cy.get('#react-tabs-16').click().should('have.css', 'color', 'rgb(0, 0, 0)')
        Cypress.on('uncaught:exception', (err, runnable) => {return false;})
        cy.wait(20000)
        // cy.wait('@XRT')
        cy.get('#react-tabs-44').click().should('have.text','Queries ')
        cy.wait(2000)
        cy.get('[title="Edit"] > .fas').click()
        cy.get('[style="display: flex;"] > :nth-child(1)').scrollTo('center')
        cy.get('.extractionFormGrid > :nth-child(1) > .actionButton').should('have.text','Close').click()
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#exampleModalLabel').should('have.text','Query')
        cy.get('#queryId').type('Checked').should('have.text','Checked')
        cy.get('[type="submit"]').should('have.text','Submit').click()
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Reassign"]').click({force:true})
        cy.wait(3000)
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('This involves both curator/reviewer.')
        })
    })
    it.skip('Query Resolve',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => { return false; });
        // cy.get('[title="3"] > .page-link').click()
        cy.get(':nth-child(1)>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(1)>div>[title="Project Queries"]')
          .click()
        cy.get('.form-group.col-md-3 > .css-1ltzkgy-container > .css-1wmgbat-control')
            .type('11fb4{enter}')
                .should('have.text','177e8fd328cf1e011fb4')
        cy.contains('Get Data').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.MayaBlueClr > :nth-child(9)')
            .should('be.visible')
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#queryId').type('Checked')
            .should('have.text','Checked')
        cy.get('.green').should('have.text','Resolved ')
            .click()
            cy.get('.orange').click()
    })
    it('admin Submit to AR',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('Automation Project').click().should('have.text','Automation Project       ')
        cy.get('#react-tabs-2').click().should('have.text','New')
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;  })
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.blue2').click()
        cy.get('#react-tabs-48').click().should('have.text','Queries ')
        cy.wait(2000)
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Active Review"]').click({force:true})
        cy.wait(3000)
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('The task will be moved to Active Review. Please confirm.')
        })
    })
})