export class CheckoutOverview {
    items() { 
        return cy.get('.inventory_item_name') 
    }

    tax(){
        return cy.get('.summary_tax_label')
    }

    totalPrice(){
        return cy.get('.summary_total_label')
    }

    finishCheckout() { 
        cy.contains("Finish").click()
    }
}

