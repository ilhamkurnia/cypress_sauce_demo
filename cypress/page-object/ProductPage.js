export class ProductPage {

    productName(number) {
        cy.get('.inventory_item_name')
        .should('have.length', number)
    }

    buttonAddToCart(number) {
        cy.get('[data-test^=add-to-cart]') 
        .should('have.length', number)
    }

    expectedPrice(){
        return cy.get(':nth-child(2) > .inventory_item_description > .pricebar > .inventory_item_price')
    }

    addToCart(productName) {
        return cy.contains('.inventory_item', productName)
        .contains('Add to cart')
        .click()
    }

    removeItemFromCartCalled(productName) {
        cy.contains('.inventory_item',productName)
        .contains('Remove')
        .click()
    }

    buttonRemove(number, color) {
        cy.get('[data-test^=remove]')
        .should('have.length', number)
        .and('have.css', 'border', color)
    }

    badgeCart(number) {
        cy.get('.shopping_cart_badge')
        .should('have.text', number)

    }
}