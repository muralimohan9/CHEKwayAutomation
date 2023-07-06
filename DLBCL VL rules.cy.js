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
        cy.contains('Dlbcl_Setup').click()
        cy.get('#react-tabs-4').should('have.text','In Progress').click()
        cy.waitUntil(() => {  return Cypress.$('button').length > 0;}, 5000);  
        // cy.get('#text-filter-column-assignedTo').type('admin')
        cy.get('.react-bootstrap-table').scrollTo('right')
        cy.get(':nth-child(1) > :nth-child(11) > div > :nth-child(1) > .blue2').click({force:true})
        cy.get('#react-tabs-26').should('have.text','DLBCL_Medical_Hx   ')
        cy.get('#react-tabs-26').click()
        cy.get('.extractionFormGrid>:nth-child(1)>.actionButton').should('have.text','Add').click()
        // validating the VL rules
        /*cy.get('#react-select-wbSelectbox-1637 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Yes{enter}')
        cy.get('#react-select-wbSelectbox-1622 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Act{enter}')
        cy.get('select').eq(0).select('Jan').should('include.text','Jan')
        cy.get('select').eq(1).select('1').should('include.text','1')
        cy.get('select').eq(2).select('2013').should('include.text','2013')
        cy.get('center > .blue').click()
        cy.waitUntil(() => {  return Cypress.$('button').length > 0;}, 5000);
        cy.get('[title="Edit"] > .fas').click()
        */

        cy.get('#react-select-wbSelectbox-1655 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('No{enter}')

        cy.get('#react-select-wbSelectbox-1590 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('derived{enter}')
        cy.get('select').eq(3).select('Jan').should('include.text','Jan')
        cy.get('select').eq(4).select('1').should('include.text','1')
        cy.get('select').eq(5).select('2013').should('include.text','2013')
        
        cy.get('center > .blue').click()
        // cy.contains('OK').click({force:true})
        cy.get('.ajs-ok').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('HEP_A_B_C_DATE value should contain the format yyyy-mm,yyyy')
        })
        cy.get('#react-select-wbSelectbox-1590 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Act{enter}')
        cy.get('#react-select-wbSelectbox-1587 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        // HIV
        cy.get('#react-select-wbSelectbox-1660 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        cy.get('#react-select-wbSelectbox-1583 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Event{enter}')
            cy.wait(1000)
        cy.get('.NOT_AVAILABLE > .inputField > label > [style="white-space: nowrap;"] > [title="Not Applicable"] > .fas')
            .click()
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
        // System infection
        cy.get('#react-select-wbSelectbox-1652 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        cy.get('#react-select-wbSelectbox-1680 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Act{enter}')
        // cy.get('select').eq(6).select('Jan').should('include.text','Jan')
        // cy.get('select').eq(7).select('1').should('include.text','1')
        cy.get('select').eq(8).select('2013').should('include.text','2013')
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
        //GVHD
        cy.get('#react-select-wbSelectbox-1603 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('N{enter}')
        //CHF
        cy.get('#react-select-wbSelectbox-1639 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        cy.get('#react-select-wbSelectbox-1656 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('de{enter}')
        cy.get('select').eq(9).select('Jan').should('include.text','Jan')
        cy.get('select').eq(10).select('1').should('include.text','1')
        cy.get('select').eq(11).select('2013').should('include.text','2013')
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
        cy.get('select').eq(10).select('Day').should('include.text','Day')
        //Cardiac Angio
        cy.get('#react-select-wbSelectbox-1682 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        cy.get('#react-select-wbSelectbox-1647 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Act{enter}')
        cy.get(':nth-child(25) > :nth-child(1) > .inputField > label > [style="white-space: nowrap;"] > [title="Not Available"] > .fas')
            .click()
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
        // severe non-ischemic
        cy.get('#react-select-wbSelectbox-1610 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        cy.get('#react-select-wbSelectbox-1632 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Eve{enter}')
        cy.get(':nth-child(28) > .NOT_AVAILABLE > .inputField > label > [style="white-space: nowrap;"] > [title="Not Available"] > .fas')
            .click()
        cy.get('select').eq(12).select('Jan').should('include.text','Jan')
        cy.get('select').eq(13).select('1').should('include.text','1')
        cy.get('select').eq(14).select('2013').should('include.text','2013')
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
        // MI date
        cy.get('#react-select-wbSelectbox-1599 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('N{enter}')
        cy.wait(2000)
        cy.get(':nth-child(31) > .NOT_APPLICABLE > .inputField > label > [style="white-space: nowrap;"] > [title="Not Applicable"] > .fas')
            .click()
        cy.get('select').eq(15).select('Jan').should('include.text','Jan')
        cy.get('select').eq(16).select('1').should('include.text','1')
        cy.get('select').eq(17).select('2013').should('include.text','2013')
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
        //unstable angina
        cy.get('#react-select-wbSelectbox-1600 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        cy.get('#react-select-wbSelectbox-1673 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Act{enter}')
        cy.get(':nth-child(34) > :nth-child(1) > .inputField > label > [style="white-space: nowrap;"] > [title="Not Available"] > .fas')
            .click()
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
        //ventricular
        cy.get('#react-select-wbSelectbox-1619 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('Y{enter}')
        cy.get('#react-select-wbSelectbox-1653 > .css-2b097c-container > .css-7aiczb-control > .css-1hwfws3')
            .type('deri{enter}')
        cy.get('select').eq(18).select('Jan').should('include.text','Jan')
        cy.get('select').eq(19).select('1').should('include.text','1')
        cy.get('select').eq(20).select('2013').should('include.text','2013')
        cy.get('center > .blue').click()
        cy.get('.ajs-ok').click()
    })
})