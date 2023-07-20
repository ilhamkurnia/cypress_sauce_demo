import { LoginPage } from "../page-object/LoginPage";
import { ProductPage } from "../page-object/ProductPage";
import { Utils } from "../page-object/Utils";

describe('Test Scenario Product Catalog', () => {

    const loginPage = new LoginPage()
    const productPage = new ProductPage()
    const utils = new Utils()
    
    beforeEach(() => {
        loginPage.Login('standard_user', 'secret_sauce')
    })

    it('Test Case show 6 Product', () => {
        productPage.productName(6)
        utils.wait()
    });

    it('Test Case Have Button Add Cart Same with Products', () => {
        productPage.buttonAddToCart(6)
        utils.wait()
    }); 

    it('Test Case Add Product to Cart', () => {
            
        productPage.addToCart('Sauce Labs Backpack')
        utils.wait()

        productPage.badgeCart(1)
        utils.wait()
        
        productPage.buttonAddToCart(5)
        utils.wait()
        
        productPage.buttonRemove(1, '1px solid rgb(226, 35, 26)')
        utils.wait()
    });

    it('Test Case Add two items to cart', () => {
        productPage.addToCart('Sauce Labs Backpack')

        productPage.addToCart('Sauce Labs Bike Light')
        utils.wait()

        productPage.badgeCart(2)
    });

    it('Adding two items to the cart then removing one', () => {
        productPage.addToCart('Sauce Labs Backpack')
        productPage.addToCart('Sauce Labs Bike Light')
        utils.wait()

        productPage.removeItemFromCartCalled('Sauce Labs Backpack')
        utils.wait()

        productPage.badgeCart(1)
        productPage.buttonAddToCart(5)
        productPage.buttonRemove(1, '1px solid rgb(226, 35, 26)')
    });



})