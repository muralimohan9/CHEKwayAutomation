/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it.skip('Admin Project Query Screen',function(){
        const WF3Query ="WF3Query.xslx"
        cy.Signin(CREDENTIALS.Useradmin,CREDENTIALS.Pwd)
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => { return false; });
        // cy.get('[title="3"] > .page-link').click()
        // cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > span').should('have.text',' Automation Project')
        cy.get(':nth-child(1)>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(1)>div>[title="Project Queries"]')
          .click()
        cy.get('[title="Download"]').click()
        cy.verifyDownload('')
  
          // uploading query file to raise query to curator/reviewer 
        cy.get('[type="file"]').attachFile({ filePath: 'WF3Query.xlsx', fileName: 'WF3Query' })
        cy.get('.list-group').should('contain','WF3Query')
        cy.get('[value="ReOpen"]').should('be.checked')
        cy.get('[title="Submit"]').click().should('be.visible')
    })
    it.skip('Curator Query Submit',function()
    {
        cy.intercept('/workbench/formMetadata/tasks/280758/entities/148/eavobjects?projectId=210&projectDataId=1532&tabDataImport=false&stateTypeId=1')
            .as('XRT')
        cy.Signin(CREDENTIALS.User1,CREDENTIALS.Pwd)
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;  });
        cy.contains('Automation Project').click().should('have.text','Automation Project       ')
        cy.get('#react-tabs-12').click().should('have.text','Query Tasks')
        cy.get('.colorBarQueryFlag').click()
        cy.get('#exampleModalLabel').should('have.text','Query Information')
        cy.get(':nth-child(1) > .dottext').should('have.text',' New Query ( count : 1 )')
        cy.wait(1000)
        cy.get('.close').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.blue2').click()
        cy.wait(4000)
        cy.get('#react-tabs-16').click().should('have.css', 'color', 'rgb(0, 0, 0)')
        cy.wait(6000)
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
        cy.get('[title="Submit To Reviewer"]').click({force:true})
        cy.wait(3000)
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Task will be sent for review.Please select reviewer.')
        })
    })
    it.skip('Reviewer Query Submit',function(){
        cy.intercept('workbench/formMetadata/tasks/279279/entities/2/eavobjects?projectId=210&projectDataId=1517&tabDataImport=false&stateTypeId=7')
            .as('PTC')
        cy.intercept('workbench/formMetadata/tasks/279279/entities/2/eavobjects?projectId=210&projectDataId=1517&stateTypeId=1')
            .as('PTC1')
        cy.Signin(CREDENTIALS.User2,CREDENTIALS.Pwd)
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;  });
        cy.contains('Automation Project').click().should('have.text','Automation Project       ')
        cy.get('#react-tabs-12').click().should('have.text','Query Tasks')
        cy.get('.colorBarQueryFlag').click()
        cy.get('#exampleModalLabel').should('have.text','Query Information')
        cy.get(':nth-child(3) > .dottext').should('have.text',' Query responded to, waiting for feedback ( count : 1 )')
        cy.wait(1000)
        cy.get('.close').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.orange2').click()
        cy.get('#react-tabs-14').should('have.css', 'color', 'rgb(0, 0, 0)')
        // cy.wait(6000)
        // cy.wait('@PTC')
        cy.waitUntil(() => cy.get('#react-tabs-46').click().should('have.text','patient_characteristics'), {
        });
        // cy.get('#react-tabs-46').click().should('have.text','patient_characteristics')
        // cy.wait(20000)
        // cy.wait('@PTC1')
        cy.get(':nth-child(4) > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.wait(1000)
        cy.get('#react-tabs-44').click().should('have.text','Queries ')
        cy.wait(1000)
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#exampleModalLabel').should('have.text','Query')
        cy.get('#queryId').type('Checked').should('have.text','Checked')
        cy.get('.orange').should('have.text',' Reviewed ').click()
        cy.get('[title="Actions"]').invoke('mouseover')
        cy.get('[title="Interim Review"]').click({force:true})
        cy.wait(3000)
        cy.contains('Ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('The task will be moved to Interim Review(Project Lead). Please confirm.')
        })
    })
    it.skip('Lead Query Submit',function(){
        cy.Signin(CREDENTIALS.Lead,CREDENTIALS.Pwd)
        Cypress.on('uncaught:exception', (err, runnable) => {  return false;  });
        cy.contains('Automation Project').click().should('have.text','Automation Project       ')
        cy.get('#react-tabs-12').click().should('have.text','Query Tasks')
        cy.get('.colorBarQueryFlag').click()
        cy.get('#exampleModalLabel').should('have.text','Query Information')
        cy.get(':nth-child(2) > .dottext').should('have.text',' Old Query with a new question ( count : 1 )')
        cy.wait(1000)
        cy.get('.close').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.orange2').click()
        cy.wait(4000)
        cy.get('#react-tabs-18').should('have.css', 'color', 'rgb(255, 255, 255)').click()
        cy.wait(1000)
        cy.get('#react-tabs-48').click().should('have.text','XRT1')
        cy.get(':nth-child(4) > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.wait(1000)
        cy.get('#react-tabs-46').click().should('have.text','Queries ')
        cy.get('.table-container > :nth-child(1) > .react-bootstrap-table').scrollTo('right')
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#exampleModalLabel').should('have.text','Query')
        cy.get('#queryId').type('Checked').should('have.text','Checked')
        cy.get('.orange').should('have.text',' Reviewed ').click()
    })
    it.skip('Admin Query Resolve',function()
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
            .type('266ea{enter}')
                .should('have.text','1255d5fea8c543b266ea')
        cy.contains('Get Data').click()
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('[title="Add Review Comments"]').click()
        cy.get('#queryId').type('Ok Resolved')
            .should('have.text','Ok Resolved')
        cy.get('.green').should('have.text','Resolved ')
            .click()
        cy.get('.orange').click()
    })
    it.skip('Lead send task to AR',function(){
        cy.Signin(CREDENTIALS.Lead,CREDENTIALS.Pwd)
        cy.contains('Automation Project').click().should('have.text','Automation Project       ')
        Cypress.on('uncaught:exception', (err, runnable) => { return false; });
        cy.get('#react-tabs-8').click().should('have.text','Interim Review')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get('.orange2').click()
        // cy.get(':nth-child(2) > :nth-child(10) > div > :nth-child(1) > .blue2').click()
        cy.get('#react-tabs-18').click()
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