/// <reference types="cypress" />

import forgotLoginPage from '../pages/forgot_login_page'
import {loginData} from '../../fixtures/input_data'



describe('Test Forgot login page', function(){


    it('Negative scenario: Leave all fields empty', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .continueButtonClick()
            .checkInputValidation()

    })

    it('Negative scenario: Leave Last name field empty, use registered email', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillEmailAddress(loginData.email)
            .continueButtonClick()
            .checkInputValidation()

    })

    it('Negative scenario: Leave Last name field empty, use NOT registered email', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillEmailAddress(loginData.notRegisteredEmail)
            .continueButtonClick()
            .checkInputValidation()

    })

    it('Negative scenario:  Leave Last name field empty, use invalid email', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillEmailAddress(loginData.notValidEmail)
            .continueButtonClick()
            .checkInputValidation()


    })

    it('Negative scenario:  Leave Email address field empty, use registered last name', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillLastNameInput(loginData.lastName)
            .continueButtonClick()
            .checkInputValidation()
        
    })

    it('Negative scenario:  Leave Email address field empty, use NOT registered last name', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillLastNameInput(loginData.notRegisteredLastName)
            .continueButtonClick()
            .checkInputValidation()
        
    })

    it('Negative scenario:   Use NOT registered last name and registered email', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillLastNameInput(loginData.notRegisteredLastName)
            .fillEmailAddress(loginData.email)
            .continueButtonClick()
            .checkInputValidation()
        
    })

    it('Negative scenario:   Use registered last name and NOT registered email', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillLastNameInput(loginData.lastName)
            .fillEmailAddress(loginData.notRegisteredEmail)
            .continueButtonClick()
            .checkInputValidation()
        
    })

    it('Negative scenario:   Use registered last name and NOT valid email', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .fillLastNameInput(loginData.lastName)
            .fillEmailAddress(loginData.notValidEmail)
            .continueButtonClick()
            .checkInputValidation()
        
    })

    it('Positive scenario:   Use registered last name and valid email', function(){

        forgotLoginPage
            .openForgotLoginNamePage()
            .checkMainTitle()
            .checkHelpText()
            .fillLastNameInput(loginData.lastName)
            .fillEmailAddress(loginData.email)
            .continueButtonClick()
            .checkInputValidation()
        
    })

})