/// <reference types="cypress" />

import { LoginPage } from "../page-object/LoginPage";

describe('Scenario Login', () => {
    let username;
    let password;
    
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('include' ,'https://www.saucedemo.com/')

        cy.get('.login_credentials').invoke('text').then((text) => {
            username = text.trim().substring(23, 36)
        })

        cy.get('.login_password').invoke('text').then((text) => {
            password = text.trim().substring(23, 35)
        })
    })

    it('Empty Username', () => {
    
        cy.get('[data-test="login-button"]').click()

        cy.get('.error-message-container')
        .should('have.text', 'Epic sadface: Username is required')
    
    })

    it('Empty Password', () => {

        cy.get('[data-test="username"]')
        .type(' ')
        .should('have.value', ' ')
    
        cy.get('[data-test="login-button"]').click()

        cy.get('.error-message-container')
        .should('have.text', 'Epic sadface: Password is required')
    
    })

    it('Invalid Username & Password', () => {
        cy.get('[data-test="username"]')
        .type('ilham kurnia')
        .should('have.value', 'ilham kurnia')

        cy.get('[data-test="password"]')
        .type('sicepat')
        .should('have.value', 'sicepat')

        cy.get('[data-test="login-button"]').click()

        cy.get('.error-message-container')
        .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    
    it('Valid Username & Password', () => {
        cy.get('[data-test="username"]')
        .type(username)
        .should('have.value', username)

        cy.get('[data-test="password"]')
        .type(password)
        .should('have.value', password)

        cy.get('[data-test="login-button"]').click()

        cy.get('.title').should('have.text', 'Products')
    })  
})

describe('Scenario Cart', () => {
    let username;
    let password;
    let actualPrice;
    let expectedPrice;
    let totalPrice;

    const loginPage = new LoginPage()

    beforeEach(() =>{
        loginPage.navigate()
        cy.get('.login_credentials').invoke('text').then((text) => {
            username = text.trim().substring(23, 36)
        })

        cy.get('.login_password').invoke('text').then((text) => {
            password = text.trim().substring(23, 35)
        })
    })

    beforeEach(() => {

        // loginPage.navigate()
        
        cy.get('[data-test="username"]')
        .type(username)
        .should('have.value', username)

        cy.get('[data-test="password"]')
        .type(password)
        .should('have.value', password)

        cy.get('[data-test="login-button"]').click()

        cy.get('.title').should('have.text', 'Products')

        cy.scrollTo(500,0)

        // .then((text) => {
        //     expectedPrice = parseFloat(text.replace('$', ''));
        //     cy.wrap(expectedPrice).as('expectedPrice');
        // })

        // cy.get('@expectedPrice').then((price) => {
        //     expectedPrice = price;
        // })
    })

    // after(() =>{

    //     cy.contains('Sauce Labs Backpack')
    //     .siblings('.inventory_item_price')
    //     .invoke('text')
    //     .then((text) => {
    //         expectedPrice = parseFloat(text.replace('$', ''));
    //         cy.wrap(expectedPrice).as('expectedPrice'); // Save the item price in the alias 'expectedPrice'
    //     })
    // })

    it('Test Case Add To Cart', () => {

        cy.get(':nth-child(2) > .inventory_item_description > .pricebar > .inventory_item_price')
        .should('have.text','$9.99')
        .invoke('text')
        .then((text) => {
                    expectedPrice = parseFloat(text.replace('$', ''));
                    cy.wrap(expectedPrice).as('expectedPrice');
                    // console.log(text)
                    // console.log(expectedPrice)
        })
        // console.log('@expectedPrice')

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
        .click()

        cy.get('[data-test="remove-sauce-labs-bike-light"]')
        .should('have.text','Remove')
        .and('have.css', 'border', '1px solid rgb(226, 35, 26)')

        cy.get('.shopping_cart_badge')
        .should('have.text', 1)

        cy.get('.shopping_cart_link')
        .click()
    })

    it('Verify Price', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
        .click()

        cy.get('.shopping_cart_link')
        .click()

        cy.get('.inventory_item_name')
        .should('have.text', 'Sauce Labs Bike Light')

        cy.get('.inventory_item_price')
        .should('have.text','$9.99')
        .invoke('text')
        .then((text) => {
            actualPrice = parseFloat(text.replace('$', ''));
            console.log(text)
            // console.log(actualPrice)
            expect(actualPrice).to.equal(expectedPrice);
        })

        cy.get('[data-test="remove-sauce-labs-bike-light"]')
        .click()

        cy.get('.removed_cart_item')
        .should('not.be.visible')
    })

    it('Payment Confirmation', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
        .click()

        cy.get('.shopping_cart_link')
        .click()

        cy.get('.inventory_item_name')
        .should('have.text', 'Sauce Labs Bike Light')

        cy.get('.inventory_item_price')
        .should('have.text','$9.99')
        .invoke('text')
        .then((text) => {
            actualPrice = parseFloat(text.replace('$', ''));
            console.log(text)
            // console.log(actualPrice)
            expect(actualPrice).to.equal(expectedPrice);
        })

        cy.get('[data-test="checkout"]')
        .click()

        cy.get('[data-test="continue"]')
        .click()

        cy.get('.error-message-container')
        .should('have.text', 'Error: First Name is required')

        cy.get('[data-test="firstName"]')
        .type('ilham')
        .should('have.text', '')

        cy.get('[data-test="continue"]')
        .click()

        cy.get('.error-message-container')
        .should('have.text', 'Error: Last Name is required')

        cy.get('[data-test="lastName"]')
        .type('kurnia')
        .should('have.text', '')

        cy.get('[data-test="continue"]')
        .click()

        cy.get('.error-message-container')
        .should('have.text', 'Error: Postal Code is required')

        cy.get('[data-test="postalCode"]')
        .type('16914')
        .should('have.text', '')

        cy.get('[data-test="continue"]')
        .click()

        cy.get('.inventory_item_price')
        .should('have.text','$9.99')
        .invoke('text')
        .then((text) => {
            totalPrice = parseFloat(text.replace('$', ''));
            console.log(text)
            // console.log(actualPrice)
            expect(totalPrice).to.equal(expectedPrice);
        })

        cy.get('[data-test="finish"]')
        .click()

        cy.get('.complete-header')
        .should('have.text', 'Thank you for your order!')

        cy.get('[data-test="back-to-products"]')
        .click()

        cy.get('.title')
        .should('have.text', 'Products')


    })


})