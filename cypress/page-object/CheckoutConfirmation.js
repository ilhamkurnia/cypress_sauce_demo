export class CheckoutConfirmation {

    message(message) {
        cy.get('.complete-header')
        .should('have.text', message)
    }
}