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
    it('Notes Screen Actions', function(){  
        cy.intercept('/workbench/users/principal').as('home')
        cy.contains('TestSantoshiMP').click()
        cy.wait(2000)
        cy.get(':nth-child(3) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        // cy.wait('@home')
        cy.contains('TestCypProject').click({force:true}).should('include.text','TestCypProject')
        cy.get('#react-tabs-16').click().should('have.text','New')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1) > :nth-child(10) > div > span > .blue2')
            .should('have.text','Extract data').click()
        cy.get('#react-tabs-34').should('have.text','Notes ').click()
        // Notes Text
        /*cy.get('select').select('note_text').should('have.value','note_text')
        cy.get('[name="searchtext"]').type('Cognition').should('have.value','Cognition').click()
        cy.get('[class="searchButton"]').click()
        // Excel download
        cy.get('.fa-download.downdropbtn').click()
        cy.contains('Excel').should('contain.text','Excel').click()
        cy.verifyDownload('')
        //  pdf download
        cy.get('.fa-download.downdropbtn').click()
        cy.contains('PDF').should('contain.text','PDF').click()
        cy.verifyDownload('')
        //  Doc download
        cy.get('.fa-download.downdropbtn').click()
        cy.contains('Word Document').should('contain.text','Word Document').click()
        cy.verifyDownload('')
        cy.get('.gotoPage').clear().type('2').should('contain.text','2')
        
        // Note Type
        cy.get('select').select('note_title').should('have.value','note_title')
        cy.get('.css-12vc3fb-control').type('Prog{enter}').should('have.text','Progress Notes')
        cy.get('[class="searchButton"]').click()
        // Excel download
        cy.get('.fa-download.downdropbtn').click()
        cy.contains('Excel').should('contain.text','Excel').click()
        cy.verifyDownload('')
        //  pdf download
        cy.get('.fa-download.downdropbtn').click()
        cy.contains('PDF').should('contain.text','PDF').click()
        cy.verifyDownload('')
        //  Doc download
        cy.get('.fa-download.downdropbtn').click()
        cy.contains('Word Document').should('contain.text','Word Document').click()
        cy.verifyDownload('')
        
        //Bookmark
        cy.get('[alt="bookmark"]').click()
        cy.get('#commentsArea').type('Progress Notes').should('contain.text','Progress Notes')
        cy.get('[type="submit"]').should('be.visible').click()

        cy.get('.jasper-toggle-btn > .fas').click()
        cy.get('.jasper-sidebar-head > span').should('contain.text','Searched Note Snippets')
        cy.get('.close').click()
        */
       // Advanced Search
       cy.get('select').select('advanced_search')
       cy.get('.css-12vc3fb-control').type('Prog{enter}').should('have.text','Progress Notes')
       cy.get('[name="noteText"]').type('tenderness').should('have.value','tenderness')
       cy.get('#0-casesensitive').check().should('be.checked')
       cy.get('.fa-plus').click().should('be.visible')
       cy.get('.css-yk16xz-control > .css-1hwfws3').type('A{enter}').should('have.text','AND')
       cy.get(':nth-child(3)>.col-md-4').type('Cognition')
    //    cy.get('[style="text-align: center; padding-bottom: 10px; margin: 10px 5px;"] > :nth-child(3) > :nth-child(2)')
    //     .check().should('be.checked')
       cy.get('[type="submit"]').click()
       cy.get('.jasper-toggle-btn > .fas').click()
       cy.get('.jasper-sidebar-head > span').should('contain.text','Searched Note Snippets')
    //    cy.get('[style="color: rgb(24, 138, 226); text-decoration: underline;"]').as('alias')
    //     initiacount= cy.get('@alias').length;
    //     cy.log(initialcount)

        cy.get('[style="color: rgb(24, 138, 226); text-decoration: underline;"]').then((elem)=>{
            const listingCount = Cypress.$(elem).length;
            console.log("List of Counts:"+listingCount);
             //or 
            cy.log(listingCount);
          })
    })
})