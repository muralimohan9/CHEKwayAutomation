/// <reference types="Cypress"/>
/// <reference types="cypress-xpath"/>
const CREDENTIALS = require('../fixtures/Credentials.json')
import 'cypress-wait-until';

describe('Workbench login and Dashboard',function()
{
    it('Valid Username Login',function()
    {
        cy.visit('http://localhost:9001/CHEKway/home')
        Cypress.on('uncaught:exception', (err, runnable) => {   return false;   });
        // cy.Signin(CREDENTIALS.User1,CREDENTIALS.adminpwd)
        cy.get('[name="username"]').type('lalitha').should('have.value','lalitha')
        cy.get('[name="password"]').type('password').should('have.value','password')
        cy.get('[type="submit"]').click()
        cy.waitUntil(() => {
            return cy.get('[type="submit"]').click()
          }, { timeout: 10000 });
        // cy.get('[type="submit"]').click()
        cy.screenshot()
        cy.get('#userDropdown').click()
        cy.get('.fa-sign-out-alt').click()
    })
    it.skip('In-Valid Username Login',function()
    {
        cy.visit('http://localhost:9001/workbench/projects')
        cy.get('[name="username"]').type('murali').should('have.value','murali')
        cy.get('[name="password"]').type('password').should('have.value','password')
        cy.get('[type="submit"]').click()
    })
    it.skip('In-Valid Password Login',function()
    {
        cy.visit('http://localhost:9001/workbench/projects')
        cy.get('[name="username"]').type('lalitha').should('have.value','lalitha')
        cy.get('[name="password"]').type('password123').should('have.value','password123')
        cy.get('[type="submit"]').click()
    })
    it.skip('In-Valid Username & Password',function()
    {
        cy.visit('http://localhost:9001/workbench/projects')
        cy.get('[name="username"]').type('murali').should('have.value','murali')
        cy.get('[name="password"]').type('password123').should('have.value','password123')
        cy.get('[type="submit"]').click()
    })
    it.skip('Empty Username & Password',function()
    {
        cy.visit('http://localhost:9001/workbench/projects')
        // cy.get('[name="username"]').type('murali').should('have.value','murali')
        // cy.get('[name="password"]').type('password123').should('have.value','password123')
        cy.get('[type="submit"]').click()
    })
    it.skip('Admin Valid Login',function()
    {
        cy.visit('http://localhost:9001/workbench/projects')
        cy.get('[name="username"]').type('admin@grn.com').should('have.value','admin@grn.com')
        cy.get('[name="password"]').type('password').should('have.value','password')
        cy.get('[type="submit"]').click()
    })
})