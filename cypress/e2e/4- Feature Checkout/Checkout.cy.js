import { LoginPage } from "../../page-object/LoginPage";
import { ProductPage } from "../../page-object/ProductPage";
import { CartPage } from "../../page-object/CartPage";
import { CheckoutInformation } from "../../page-object/CheckoutInformation";
import { CheckoutOverview } from "../../page-object/CheckoutOverview";
import { CheckoutConfirmation } from "../../page-object/CheckoutConfirmation";
import { Utils } from "../../page-object/Utils";

describe('When placing items in the cart', () => {

    const loginPage = new LoginPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutInformation = new CheckoutInformation()
    const checkoutOverview = new CheckoutOverview()
    const checkoutConfirmation = new CheckoutConfirmation()
    const utils = new Utils()

    let totalPrice;
    let expectedPrice;
    let tax;

    beforeEach(() => {
        loginPage.Login("standard_user", "secret_sauce")

        productPage.addToCart('Sauce Labs Bike Light')

        productPage.expectedPrice()
            .invoke('text')
            .then((text) => {
                    expectedPrice = parseFloat(text.replace('$', ''));
                    cy.wrap(expectedPrice).as('expectedPrice')
                    
        })

        utils.wait()
        cartPage.openCart()
    });

    describe('Checkout Order', () => {

        beforeEach(() => {
            cartPage.initiateCheckout()
            utils.wait()
        })

        it("Test Case all field is mandatory", () => {
            checkoutInformation.withPersonalDetails("", "", "")
            utils.wait()

            checkoutInformation.withPersonalDetails("kurnia", "", "")
            utils.wait()

            checkoutInformation.withPersonalDetails("kurnia", "ilham", "")
            utils.wait()
            
            checkoutInformation.error().should('be.visible')
            utils.wait()
        })

        it("Test Case show in the overview", () => {
            checkoutInformation.withPersonalDetails("ilham","kurnia","16914")
            utils.wait()
            
            checkoutOverview.items().should('have.length',1)
            utils.wait()

            checkoutOverview.tax()
            .should('have.text', 'Tax: $0.80')
            .invoke('text')
            .then((text) => {
                text = text.trim();
                tax = parseFloat(text.replace('Tax: $', ''));
                expectedPrice = expectedPrice + tax
            })
            utils.wait()

            checkoutOverview.totalPrice()
            .invoke('text')
            .then((text) => {
                totalPrice= text.trim().substring(8,13)
                expectedPrice = expectedPrice.toFixed(2);
                expect(totalPrice).to.equal(expectedPrice);
            })
            utils.wait()
        })        

        it("the Thank You message should be shown when the checkout is completed", () => {
            checkoutInformation.withPersonalDetails("ilham","kurnia","16914")
            
            checkoutOverview.finishCheckout()

            checkoutConfirmation.message('Thank you for your order!')

        })        

    })

});