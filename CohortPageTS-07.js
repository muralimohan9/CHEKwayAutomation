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
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
    })
    it.skip('Cohort Page',function()
    {
        const PDF ="CohortPD.pdf"
        const Doc ="CohortDc.docx"
        cy.contains('TestSantoshiMP').click()
        cy.wait(1000)
        cy.get(':nth-child(7) > .nav-link').click()
        cy.get('h2').should('have.text','Cohorts')
        cy.wait(1000)
        // sorting Cohort name
        cy.get('[aria-label="Name sortable"] > [draggable="true"] > div > .order-4').click()
        // Search cohort
        cy.get('[placeholder="Enter Name..."]').type('AutoCohort').should('have.value','AutoCohort')

        // Create new cohort and uploading pdf and doc files
        cy.get('.fa-plus-circle').click()
        cy.get('[name="fileName"]').type('Uploadpdf/doc-Cohort')
            .should('have.value','Uploadpdf/doc-Cohort')        
        //uploading PDF
        // cy.get('[type="file"]').attachFile({ filePath: 'CohortPD.pdf', fileName: 'PDF' })

        // uploading Docx file
        cy.get('[type="file"]').attachFile({ filePath: 'CohortDc.docx', fileName: 'Doc' })
        // cy.get('[type="submit"]').click()
    })
    it.skip('Clear Cohort',function()
    {
        const NewCohort ="CohortTemplate.xslx"
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(7) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
        });
        cy.get('.fa-plus-circle').click()
        cy.get('[name="fileName"]').type('ClrCohort')
            .should('have.value','ClrCohort')
        // cy.get('.fa-download').click()
        cy.get('[type="file"]').attachFile({ filePath: 'CohortTemplate.xlsx', fileName: 'NewCohort' })
        cy.wait(1000)
        //clear cohort and Back button
        cy.get('.form-group > .orange').should('have.text','Reset').click()
        cy.get('.col-md-7 > div > .orange').click()
    })
    it.skip('Delete edit Cohort',function()
    {
        const NewCohort ="CohortTemplate.xslx"
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(7) > .nav-link').click({force:true})
        cy.get('h2').should('have.text','Cohorts')
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
        });
        cy.get(':nth-child(1) > [textalign="center"] > .icon > .fas').click()
        cy.get('h2').should('have.text','Edit Cohort')
        //select EUID
        cy.get(':nth-child(1) > .selection-cell > input').check().should('be.checked')
        cy.get('.panel-body').scrollTo('bottom')
        //Delete EUID
        cy.get('#commentsId').type('Deleting the EUID').should('have.value','Deleting the EUID')
        cy.get('.test > .orange').should('have.text','Delete').click()
        cy.contains('OK').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('EUID is associated with projects - Automation_Project. Please delete EUID at project level to delete at cohort level')
        })
    })
    it.skip('Download in edit Cohort',function()
    {
        const NewCohort ="CohortTemplate.xslx"
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(7) > .nav-link').click({force:true})
        cy.get('h2').should('have.text','Cohorts')
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
        });
        cy.get(':nth-child(1) > [textalign="center"] > .icon > .fas').click()
        cy.get('h2').should('have.text','Edit Cohort')
        //Download Functionality
        cy.get('.fa-download').click()
        // cy.verifyDownload('archive.zip');
        cy.verifyDownload('');
    })
    it.skip('Add single and multiple Euid edit Cohort',function()
    {
        const NewCohort ="CohortTemplate.xslx"
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(7) > .nav-link').click({force:true})
        cy.get('h2').should('have.text','Cohorts')
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
        });
        cy.get(':nth-child(1) > [textalign="center"] > .icon > .fas').click()
        cy.get('h2').should('have.text','Edit Cohort')
        // Add single euid 
        // cy.get('#euidId').type('12K61A05B5').should('have.value','12K61A05B5')
        // cy.get('[style="margin-top: 10px; width: 74%;"] > .css-2b097c-container > .select__control')
        //     .type('Mer{enter}').should('include.text','Mercy Health System')
        cy.wait(3000)
        // Add multiple euid
        cy.get('[type="file"]').attachFile({ filePath: 'CohortTemplate.xlsx', fileName: 'NewCohort' })
        cy.wait(1500)
        cy.get('.mt-4 > .blue').click()
    })
    it('Clear and Back in edit Cohort',function()
    {
        const NewCohort ="CohortTemplate.xslx"
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(7) > .nav-link').click({force:true})
        cy.get('h2').should('have.text','Cohorts')
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
        });
        cy.get(':nth-child(1) > [textalign="center"] > .icon > .fas').click()
        cy.get('h2').should('have.text','Edit Cohort')
        // Add single euid 
        cy.get('#euidId').type('12K61A05B8').should('have.value','12K61A05B8')
        cy.get('[style="margin-top: 10px; width: 74%;"] > .css-2b097c-container > .select__control')
            .type('Mer{enter}').should('include.text','Mercy Health System')

        // Add multiple euid
        cy.get('[type="file"]').attachFile({ filePath: 'CohortTemplate.xlsx', fileName: 'NewCohort' })
        cy.get('.mt-4 > .orange').click()
        cy.wait(1000)
        cy.get('[style="float: right;"]').click()
    })
})