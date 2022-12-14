/// <reference types="cypress" />

import checkoutConfirmationPage from '../pages/checkout_confirmaiton_page'
import guestCheckoutPage from '../pages/guest_checkout_page'
import shoppingCartPage from '../pages/shopping_chart_page'
import {guestCheckoutPageData} from '../../fixtures/input_data'
import {checkoutConfirmationData} from '../../fixtures/input_data'


describe('Checkout confirmation page testing', function(){

    let isEmailValid = true

    it('Positive scenario: Check data in the Checkout confirmation page', function(){
        cy.AddProductToCart(0)
        cy.AddProductToCart(4)

        shoppingCartPage
            .visitPage()
            .clickCheckoutButton()

        guestCheckoutPage
            .selectGuestCheckoutRadioButton()
            .clickContinueButton()
            .checkOrderSummary()
            .fillFirstNameInput(guestCheckoutPageData.firstName)
            .fillLastNameInput(guestCheckoutPageData.lastName)
            .fillEmailInput(isEmailValid)
            .fillAddress1Input(guestCheckoutPageData.address1)
            .fillCityInput(guestCheckoutPageData.city)
            .fillRegionSelect(3)
            .fillZipCodeInput(guestCheckoutPageData.zipCode)
            .clickContinueButton()

        checkoutConfirmationPage
            .checkBreadcrumbs()
            .checkItemsInYourCart()
            .clickConfirmOrderButton()
    })  
})