import { LoginPage } from "../../page-object/LoginPage";
import { Utils } from "../../page-object/Utils";

describe('Test Scenario Login', () => {

    const loginPage = new LoginPage()
    const utils = new Utils()
    
    beforeEach(() => {
        loginPage.navigate()
        loginPage.verifikasiUrl()
    })

    it('Test Case Empty Username', () => {
        loginPage.buttonLogin()
        utils.wait()

        loginPage.messageError('Epic sadface: Username is required')
    })

    it('Test Case Empty Password', () => {
        loginPage.inputUsername('standard_user')
        utils.wait()

        loginPage.buttonLogin()
        utils.wait()

        loginPage.messageError('Epic sadface: Password is required')
    })

    it('Test CaseTInvalid Username & Password', () => {
        loginPage.inputUsername('pt sicepat')
        utils.wait()

        loginPage.inputPassword('ilham kurnia')
        utils.wait()

        loginPage.buttonLogin()
        utils.wait()

        loginPage.messageError('Epic sadface: Username and password do not match any user in this service')
    })

    it('Test Case Blocked Account', () => {
        loginPage.inputUsername('locked_out_user')
        utils.wait()
        
        loginPage.inputPassword('secret_sauce')
        utils.wait()

        loginPage.buttonLogin()
        utils.wait()

        loginPage.messageError('Epic sadface: Sorry, this user has been locked out')
    })
    
    it('Test Case Valid Username & Password', () => {
        loginPage.inputUsername('standard_user')
        utils.wait()
        
        loginPage.inputPassword('secret_sauce')
        utils.wait()
        
        loginPage.buttonLogin()
        utils.wait()

        loginPage.verifikasiAfterLogin('Products')
    })

})