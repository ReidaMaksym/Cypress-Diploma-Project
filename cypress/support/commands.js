// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('generateEmail', function(){
    let today = new Date()
    let time = today.getTime()
    let newEmail = `test${time}@mail.com`
    // console.log(time)
    return newEmail
})

Cypress.Commands.add('isCartTableEmpty', function(){
    cy.get('body').then(function($body){
        if($body.find('#cart').length === 0){
            console.log('CART table IS EMPTY')
            return true
        } else{
            console.log('CART table IS NOT EMPTY')
            cy.get('body').find('#cart').then(function(cart){
                console.log(cart)
            })
            return false
        }
    })
})


Cypress.Commands.add('isTopCartEmpty', function(){
    cy.get('body').then(function(body){
        if(body.find('#top_cart_product_list > .empty_cart').length > 0){
            console.log('TOP cart is empty')
            return true
        } else{
            console.log('TOP cart is NOT empty')
            return false
        }
    })
})


Cypress.Commands.add('isShippingDetailsVisable', function(){
    cy.get('#shipping_details').invoke('attr', 'style').then(function(style){
        // console.log(style)
        if(style === 'display:none;'){
            // Shippping details are not visible
            console.log(style)
            return false
        } else{
            // Shippping details are visible
            console.log(style)
            return true
        }
    })
})


Cypress.Commands.add('getTagName', function(selector){
    cy.get(selector).then(function(element){
        let tagName = element.prop('tagName')
        return tagName
    })
})


Cypress.Commands.add('isEmailFormatValied', function(selector){
    cy.get(selector).then(function(element){
        
    })
})


Cypress.Commands.add('isFieldEmpty', function(selector){

    cy.getTagName(selector).then(function(tagName){
        if(tagName === 'INPUT'){
            cy.get(selector).invoke('attr', 'value').then(function(attributeValue){
                console.log(attributeValue)
                console.log(attributeValue.length)
                if(attributeValue.length === 0){
                    console.log('Input is empty')
                    // return true
                    return attributeValue.length
                } else{
                    console.log('Input is NOT empty')
                    // return false
                    return attributeValue.length
                }
            })
        }
    })

})

Cypress.Commands.add('getDataFromTopCart', function(){
    let chatData = []

    cy.get('#top_cart_product_list > div > table > tbody > tr').each(function($el, index, $list){
        // console.log($el.text())
        cy.get($el.find('.name')).then(function(name){

            cy.get($el.find('.total')).then(function(total){

                cy.get($el.find('.quantity')).then(function(quantity){
                    chatData.push({
                        name: name.text().trim(),
                        price: total.text().trim(),
                        quantity: quantity.text().trim()
                    })
                })
            })
            
        })
        
    })
    return cy.wrap(chatData)
})


Cypress.Commands.add('getDataFromCartTable', function(){
    let tableData = []
    cy.get('.product-list tbody > tr').each(function($el, index, $list){
        if(index !== 0){
            console.log('++++')
            cy.get($el.find('td:nth-of-type(2)')).then(function(productName){
                cy.get($el.find('td:nth-of-type(4)')).then(function(price){
                    cy.get($el.find('td:nth-of-type(5) .form-control')).invoke('val').then(function(quantity){
                        console.log(quantity)
                        tableData.push({
                            name: productName.text().trim(),
                            price: price.text().trim(),
                            quantity: quantity
                        })
                    })
                })
                
            })
            console.log(tableData)
        }
    })
    return cy.wrap(tableData)
})


Cypress.Commands.add('GetDataFromOrderSummaryBlock', function(){

    let orderSummaryData = []
    cy.get('.sidewidt > table:nth-of-type(1) > tbody > tr').each(function ($el, index, $list) {
        cy.get($el.find('.valign_top').find('a')).then(function (productName) {
            console.log(productName.text().trim())
            cy.get($el.find('.valign_top').find('b')).then(function (productPrice) {

                cy.get($el.find('.valign_top')).then(function (quantity) {

                    let newString = quantity.text().charAt(0)

                    orderSummaryData.push({
                        name: productName.text().trim(),
                        price: productPrice.text().trim(),
                        quantity: newString
                    })

                })
            })
        })

    })

    return cy.wrap(orderSummaryData)

})

Cypress.Commands.add('AddProductToCart', function (productIndex) {
    cy.visit('https://automationteststore.com/')

    let productsData = []
    cy.get('.block_frame > div > div .thumbnail').each(function ($el, index, $list) {

        if (!$el.find('.pricetag').children().hasClass('nostock') && index === productIndex) {


            cy.get($el.prev().children()).then(function (productName) {

                if ($el.find('.price').children().hasClass('pricenew')) {
                    cy.get($el.find('.pricenew')).then(function (pricenew) {
                        productsData.push({
                            name: productName.text().trim(),
                            price: pricenew.text().trim(),
                            quantity: '1'
                        })
                    })
                } else {
                    cy.get($el.find('.price').children()).then(function (price) {
                        // prices.push(price.text().trim())
                        productsData.push({
                            name: productName.text().trim(),
                            price: price.text().trim(),
                            quantity: '1'
                        })

                    })
                }

            })

            cy.get($el.find('.productcart')).click()
            cy.url().should('eq', 'https://automationteststore.com/')
        }

    })
    // .then(function () {

    //     let chartData = []

    //     cy.get('#top_cart_product_list > div > table > tbody > tr').each(function ($el, index, $list) {
    //         console.log($el.text())
    //         cy.get($el.find('.name')).then(function (name) {

    //             cy.get($el.find('.total')).then(function (total) {

    //                 cy.get($el.find('.quantity')).then(function (quantity) {
    //                     chartData.push({
    //                         name: name.text().trim(),
    //                         total: total.text().trim(),
    //                         quantity: quantity.text().trim()
    //                     })
    //                 })
    //             })

    //         })
    //     }).then(function () {
    //         // console.log(chartData)
    //         console.log(typeof productsData)
    //         console.log(chartData)

    //         productsData.forEach(function (item) {
    //             chartData.forEach(function (chartItem) {
    //                 expect(item.name).contain(chartItem.name)
    //                 expect(item.price).contains(chartItem.total)
    //                 expect(item.quantity).contains(chartItem.quantity)
    //             })

    //             // console.log(item)
    //         })

    //     })

    // })

    // return this
})
