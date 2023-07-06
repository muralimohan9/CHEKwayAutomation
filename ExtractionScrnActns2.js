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
        cy.intercept('/workbench/users/principal').as('home')
        cy.contains('TestSantoshiMP').click()
        cy.wait(2000)
        cy.get(':nth-child(3) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.wait('@home')
        // cy.get(':nth-child(3) > .nav-link > span').click({force:true})
        cy.contains('User TS test').click({force:true}).should('include.text','User TS test')
        // cy.get('#react-tabs-46').click().should('have.text','All') // All tab
        cy.get('#react-tabs-16').click().should('have.text','New')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1) > :nth-child(10) > div > span > .blue2')
            .should('have.text','Extract data').click()
        cy.get('#react-tabs-60').click().should('have.text','Custom Notes Tab ')
        cy.wait(1000)
        cy.get('[title="2"]').click()
        cy.get('[title="3"]').click()
        cy.wait(1000)
        // cy.pause()
        cy.get('[placeholder="Enter Euid..."]').type('nsvgdfguywet87y9')
            .should('have.value','nsvgdfguywet87y9')
        cy.get('[placeholder="Enter Partner_cd..."]').type('BHS')
            .should('have.value','BHS')
        cy.get('[title="Download"]').click()
        cy.verifyDownload('')
        cy.get('[alt="bookmark"]').click()
        cy.get('#commentsArea').type('New Bmk').should('include.text','New Bmk')
        cy.get('.buttons > .blue').click()
        cy.wait(500)
        cy.get('#react-tabs-62').click()
        cy.get('.accordion__button').click().should('have.text','Custom Notes Tab')
        //Delete Bookmark
        cy.get(':nth-child(1) > .icon > .fas').click()
        cy.on('window:alert',(str)=>{
            expect(str).to.equal('Do you want to delete this bookmark ?')
        })
        cy.contains('Ok').click()
        // dashboard navigation
        cy.get(':nth-child(3) > .nav-link').click()
        cy.get('#exampleModalLabel').should('have.text','Confirmation')
        cy.on('window:alert',(str)=>{
                    expect(str).to.equal('Do you really want leave extraction screen ?')
            })
        cy.contains('Ok').click()

        //Download proj doc in dashboard
        cy.contains('User TS test').click({force:true}).should('include.text','User TS test')
        cy.get('[title="Download"]').should('be.visible').click()
        cy.get('.popup_download > :nth-child(1) > a').click()
        cy.verifyDownload('')
        cy.get('.close > span').click()
    })
})