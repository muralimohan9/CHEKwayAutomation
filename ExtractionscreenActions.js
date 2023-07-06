/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it('Signin',function()
    {
        cy.User1(CREDENTIALS.User1,
            CREDENTIALS.Pwd)
    })
    it('Extarction Screen Actions', function(){
        const dataTransfer = new DataTransfer
        const DCData ="CohortTemplate.xslx"
        cy.intercept('/workbench/users/principal').as('home')
        // cy.contains('TestSantoshiMP').click()
        // cy.wait(2000)
        // cy.get(':nth-child(3) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.wait('@home')
        // cy.get(':nth-child(3) > .nav-link > span').click({force:true})
        cy.contains('TestCypProject').click({force:true}).should('include.text','TestCypProject')
        // cy.get('#react-tabs-46').click().should('have.text','All') // All tab
        // cy.get('#react-tabs-2').click().should('have.text','New')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1) > :nth-child(10) > div > span > .blue2')
            .should('have.text','Extract data').click()
        // cy.get('.extractProjectname').click().click()
        // cy.wait(1000)
        // cy.get(':nth-child(2)>label>.nodeLabel>.node-orange').click()
        // cy.get('#react-tabs-16').should('be.visible')
        // // project info
        // cy.get('[title="Project info"]').click()
        // cy.wait(1000)
        // cy.get('.wbmodal-header').move({ deltaX: 100, deltaY: 100 })
        // cy.get('.minimize').click()
        // cy.get('.minimizedModal > .blue').click({force:true})
        // cy.get('[style="color: white; width: 100%; margin-bottom: 0px;"]')
        //     .should('include.text',' Workflow 2').click()
        // cy.get('.close > span').click()

        // // Previous task
        // cy.get('.fa-arrow-left').click().should('be.visible')
        // cy.on('window:alert',(str)=>{
        //     expect(str).to.equal('Do you want to redirect to previous task ?')
        // })
        // cy.contains('Ok').click()
        // cy.wait('@home')
        // // Previous Task Again
        // cy.get('.fa-arrow-left').click().should('be.visible')
        // cy.on('window:alert',(str)=>{
        //     expect(str).to.equal('No Previous task found.')
        // })
        // cy.contains('OK').click()
        
        // // Next task
        // cy.get('.fa-arrow-right').click().should('be.visible')
        // cy.on('window:alert',(str)=>{
        //     expect(str).to.equal('Do you want to redirect to next task ?')
        // })
        // cy.contains('Ok').click()
        // cy.wait('@home')
        // // Next Task Again
        // cy.get('.fa-arrow-right').click().should('be.visible')
        // cy.on('window:alert',(str)=>{
        //     expect(str).to.equal('No Previous task found.')
        // })
        // cy.contains('OK').click()
        // cy.wait(1000)
        // cy.get('.fa-file-download').click()
        // cy.verifyDownload('')
        // cy.on('window:alert',(str)=>{
        //     expect(str).to.equal('Project Documents does not exists')
        // })
        // cy.contains('OK').click()
        
        // //Download DC's data
        // cy.get('.action-dark-btn').click()
        // cy.get('.dropdown-heading-value').move({ deltaX: 100, deltaY: 100 })
        // cy.get('.dropdown-heading-value').click()
        // cy.get('.close > span').click()

        // download and upload DC data
        // cy.get('#react-tabs-16').click()
        // cy.wait(10000)
        // cy.get('[title="Download Format"]').click()
        // cy.verifyDownload('XRT1.xlsx')

        // cy.get('[type="file"]').attachFile({ filePath: 'XRT1.xlsx', fileName: 'DCData' })
        // cy.get('[style="float: right; cursor: pointer;"] > .icon').click()
        // cy.on('window:alert',(str)=>{
        //         expect(str).to.equal('No data to save')
        //     })
        // cy.contains('OK').click()

        // upload data to DC to check validation error
        cy.get('.nodeLabel > .node-green').click()
        cy.get('#react-tabs-16').should('be.visible')
        cy.wait(20000)

        // validation rules icon and edit validation error data 
        cy.get('.extractionFormGrid > :nth-child(2) > .actionButton > .fas').click()
        cy.get('#exampleModalLabel').should('have.text','XRT1- Validation Rule(s)')
        cy.get('.close > span').click()

        cy.get('[title="Validation Messages"] > .fas').should('be.visible').click()
        cy.get('.ajs-header').should('have.text','Validations')
        cy.contains('OK').click()

        cy.get('.custom-row-class > :nth-child(2) > [title="Edit"] > .fas').click()
        cy.get('.css-1hwfws3').type('No{enter}').should('include.text','No')
        cy.get('center > .blue').click()
        // dashboard navigation
        cy.get(':nth-child(3) > .nav-link').click()
        cy.get('#exampleModalLabel').should('have.text','Confirmation')
        cy.on('window:alert',(str)=>{
                    expect(str).to.equal('Do you really want leave extraction screen ?')
            })
        cy.contains('Ok').click()
    })
})