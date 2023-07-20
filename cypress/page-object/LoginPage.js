export class LoginPage {
    
    navigate (){
        cy.visit('/');
    }

    Login() {
        let username;
        let password;

        cy.visit('/');
        cy.url().should('include' ,'https://www.saucedemo.com/')

        cy.get('.login_credentials').invoke('text').then((text) => {
            username = text.trim().substring(23, 36)
        })

        cy.get('.login_password').invoke('text').then((text) => {
            password = text.trim().substring(23, 35)
        })

        cy.get('[data-test="username"]')
        .type(username)
        .should('have.value', username)

        cy.get('[data-test="password"]')
        .type(password)
        .should('have.value', password)

        cy.get('[data-test="login-button"]').click()
    }

    
}