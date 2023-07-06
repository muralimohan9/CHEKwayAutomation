/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    
    it('Test case 11',function()
    {
        cy.User1(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        Cypress.on('uncaught:exception', (err, runnable) => {return false;});
        // downloading the help document
        cy.get('[title="Download or View File"]').should('be.visible')
        cy.get('[title="Download or View File"]').click()
        cy.get('[download="WB_Dashboard"]').should('be.visible')

        cy.get('[download="WB_Dashboard"]').click()
        // Get the file path (this may vary depending on your download configuration)
        // const downloadFolderPath = Cypress.config("downloads");
        // const fileName = "WB_Dashboard.pdf";
        // const filePath = `D:\Workbench-cypress\cypress\downloads`;

        // Validate the downloaded file as a PDF
        // cy.validatePdfDownload(filePath);
        // cy.verifyDownload('WB_Dashboard.pdf');
        cy.readFile('cypress/downloads/WB_Dashboard.pdf', {timeout: 25000})
    })
})