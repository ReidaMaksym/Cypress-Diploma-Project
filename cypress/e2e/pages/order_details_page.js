import {checkYourOrderDetailsData} from '../../fixtures/input_data'

class orderDetailsPage {

    orderDetailsPageLocators = {
        orderId: 'input#CheckOrderFrm_order_id',
        email: 'input#CheckOrderFrm_email',
        continueButton: "button[title='Continue']"
    }

    openOrderDetailsPage(){
        cy.get('#main_menu_top  .menu_account.top > .menu_text').trigger('mouseover')
        cy.get('#main_menu_top  .dropdown-menu.sub_menu  .menu_order.sub')
            .should('contain', 'Check Your Order')
            .click()

        return this
    }

    checkOrderDetails(){

        cy.task('getOrderDetails').then(function(orderDetails){
            console.log(orderDetails)

            cy.getDataFromOrderDetailsTable().then(function(orderTableData){
                console.log(orderTableData)
                expect(orderTableData.orderId).contains(orderDetails.orderId)
                expect(orderTableData.orderEmail).contains(orderDetails.orderEmail)
                expect(orderTableData.orderPaymentMethod).contains(orderDetails.orderPaymentMethod)
                expect(orderTableData.orderShippingMethod).contains(orderDetails.orderShippingMethod)
                expect(orderTableData.orderStatus).contains(orderDetails.orderStatus)
                expect(orderTableData.shippingAddress).contains(orderDetails.shippingAddress)
                expect(orderTableData.paymentAddress).contains(orderDetails.paymentAddress)

                for(let i = 0; i < orderDetails.tableData.length; i++){
                    expect(orderTableData.tableData[i].productModel).contains(orderDetails.tableData[i].productModel)
                    expect(orderTableData.tableData[i].productName).contains(orderDetails.tableData[i].productName)
                    expect(orderTableData.tableData[i].quantity).contains(orderDetails.tableData[i].quantity)
                    expect(orderTableData.tableData[i].total).contains(orderDetails.tableData[i].total)
                    expect(orderTableData.tableData[i].unitPrice).contains(orderDetails.tableData[i].unitPrice)
                }
            })


        })

        return this
    }

    checkFormValidation(){
        // cy.isOrderDetailsFormVisible().then(function(){

        // })
        let inputsData = []
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        cy.isOrderDetailsFormVisible().then(function(isVisible){
            console.log(isVisible)
            if(isVisible){
                cy.get('form#CheckOrderFrm > .form-horizontal.registerbox > fieldset > .form-group').each(function($el, index, $list){
                    if($el.hasClass('has-error')){
                        // #CheckOrderFrm .input-group input
                        cy.getElementAttribute($el.find('input'), 'name').then(function(inputName){

                            cy.getElementAttribute($el.find('input'), 'value').then(function(inputValue){

                                console.log(inputName)
                                cy.get($el.find('.help-block')).then(function(errorMessage){

                                    console.log(errorMessage.text().trim())

                                    if(inputName === 'order_id'){
                                        inputsData.push({
                                            name: inputName,
                                            value: inputValue,
                                            error: errorMessage.text().trim()
                                        })
                                    }
                                    else if(inputName === 'email'){
                                        inputsData.push({
                                            name: inputName,
                                            value: inputValue,
                                            error: errorMessage.text().trim()
                                        })
                                    }

                                    // if(inputName === 'order_id'){
                                    //     expect(errorMessage.text().trim()).contains('Order ID is required field!')
                                    // } else if(inputName === 'email'){
                                    //     expect(errorMessage.text().trim()).contains('E-Mail Address does not appear to be valid!')
                                    // }

                                })

                            })
                            
                        })
                    }
                }).then(function(){
                    console.log(inputsData)
                    for(let i = 0; i < inputsData.length; i++){
                        if(inputsData[i].name === 'order_id' && inputsData[i].value.length === 0){
                            expect(inputsData[i].error).contains(checkYourOrderDetailsData.orderIdError)
                        }
                        else if(inputsData[i].name === 'email' && inputsData[i].value.length === 0 || inputsData[i].name === 'email' && !inputsData[i].value.match(emailFormat)){
                            expect(inputsData[i].error).contains(checkYourOrderDetailsData.emailError)
                        }
                    }
                })
            } else{
                console.log('-------------------')
                cy.isOrderDetailsTableVisible().then(function(isTableVisible){
                    if(!isTableVisible){
                        cy.get('.contentpanel').then(function(elementText){
                            expect(elementText.text().trim()).contains('The order you have requested could not be found!')
                        })
                    }
                })
            }
        })

        return this
    }


    fillOrderIdInput(isIdReal, isValid){
        if(isIdReal && isValid){
            cy.task('getOrderDetails').then(function(orderDetails){
                console.log(orderDetails)
    
                cy.get('input#CheckOrderFrm_order_id')
                    .click()
                    .clear()
                    .type(orderDetails.orderId)
    
            })

        } else if(!isIdReal, isValid){
            cy.get('input#CheckOrderFrm_order_id')
                .click()
                .clear()
                .type('12311')

        } else if(!isIdReal, !isValid){
            cy.get('input#CheckOrderFrm_order_id')
                .click()
                .clear()
                .type('yquwyquw')
        }


        return this
    }


    fillEmailInput(isEmailReal, isValid) {

        if (isEmailReal && isValid) {
            cy.task('getOrderDetails').then(function (orderDetails) {
                console.log(orderDetails)

                cy.get('input#CheckOrderFrm_email')
                    .click()
                    .clear()
                    .type(orderDetails.orderEmail)

            })

        } else if(!isEmailReal && isValid) {
            cy.get('input#CheckOrderFrm_email')
                .click()
                .clear()
                .type('ajhajsjjj@mail.com')

        } else if(!isEmailReal && !isValid){
            cy.get('input#CheckOrderFrm_email')
            .click()
            .clear()
            .type('ajhajsjjj@mai')

        }

        return this
    }


    clickContinueButton(){
        cy.get(this.orderDetailsPageLocators.continueButton)
            .should('contain', 'Continue')
            .click()
        
        return this
    }
    
}

module.exports = new orderDetailsPage()