import { CartPage } from "../../page-object/CartPage";
import { LoginPage } from "../../page-object/LoginPage";
import { ProductPage } from "../../page-object/ProductPage";
import { Utils } from "../../page-object/Utils";

describe('Test Scenario Cart', () => {

    const loginPage = new LoginPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const utils = new Utils()

    
    beforeEach(() => {
        loginPage.Login('standard_user', 'secret_sauce')
        
    })
    
    describe('Add single item', () => {

        let actualPrice;
        let expectedPrice;
    

        beforeEach( () => {
            productPage.addToCart('Sauce Labs Bike Light')
            productPage.expectedPrice()
            .invoke('text')
            .then((text) => {
                    expectedPrice = parseFloat(text.replace('$', ''));
                    cy.wrap(expectedPrice).as('expectedPrice')
                    console.log('expected price' + expectedPrice)
            })
            utils.wait()
   
            cartPage.openCart()
            utils.wait()

            
        });
    

        it('Test Case show the name of the item in the cart', () => {

            cartPage.items()
                .should('have.length', 1)
                .eq(0)
                .should('contain.text','Sauce Labs Bike Light')
            utils.wait()
        })  
    
        it ('Test Case should show the price with product catalog', () => {
            cartPage.itemPrice('Sauce Labs Bike Light')
            .should('have.text','$9.99')
            .invoke('text')
            .then((text) => {
                actualPrice = parseFloat(text.replace('$', ''));
                console.log('actual price:' + actualPrice)
                expect(actualPrice).to.equal(expectedPrice);
            })
            utils.wait()
        })

        it ('Test Case show the description', () => {
            cartPage.itemDescription('Sauce Labs Bike Light').should('contain.text', 'A red light')
            utils.wait()
        })

        it ('Test Case show the quantity', () => {
            cartPage.itemQuantity('Sauce Labs Bike Light').should('contain.text', '1')
            utils.wait()
        })
    })

    describe('Adding several items', () => {
        it('Test Case Add more than one product', () => {
    
            productPage.addToCart('Sauce Labs Bike Light')
            productPage.addToCart('Sauce Labs Bolt T-Shirt')
            utils.wait()
    
            cartPage.openCart()
            utils.wait()
    
            cartPage.items().should('have.length', 2)
    
            cartPage.items().eq(0).should('contain.text','Sauce Labs Bike Light')
            cartPage.items().eq(1).should('contain.text','Bolt T-Shirt')
    
            })
    })
    
    describe('Removing items from the cart', () => {
        beforeEach( () => {
            productPage.addToCart('Sauce Labs Bike Light')
            productPage.addToCart('Sauce Labs Bolt T-Shirt')
            utils.wait()
            cartPage.openCart()
            utils.wait()
        });
    
        it('Test Case removed from the cart list', () => {
    
            cartPage.removeButtonFor('Sauce Labs Bike Light').click()
            utils.wait()
    
            cartPage.items()
                        .should('have.length', 1)
                        .eq(0)
                        .should('contain.text','Sauce Labs Bolt T-Shirt')
            utils.wait()
            })
            
        })
})