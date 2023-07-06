/// <reference types="Cypress"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it('Signin',function()
    {
        cy.Signin(CREDENTIALS.Useradmin,
            CREDENTIALS.adminpwd)
    })
    it('Project-Creation', function(){
        // cy.get(':nth-child(4) > .nav-link').click({force:true})
        cy.contains('testing project').click()
        cy.wait(2000)
        cy.get(':nth-child(4) > .nav-link').click({force:true})
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.get('.fa-plus-circle').click()
        cy.get('[name="projectName"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="projectName"]').type('Automation Project')

        cy.get('[name="projectDescription"]').focus()
        cy.get('[type="submit"]').click()
        cy.wait(1000)
        cy.get('[name="projectDescription"]').type('Automation Project')

        // cy.get(':nth-child(5) > .form-group > .css-2b097c-container > .select__control > .select__value-container')
        // .type('admin{enter}')
        cy.get('.basic-multi-select > .select__control > .select__value-container').type('select{enter}')
        // .type('Bapt{enter}').type('Bapt{enter}').type('Bon{enter}').type('Mer{enter}').type('Spa{enter}')
        // cy.get('[type="submit"]').click()
    })
})