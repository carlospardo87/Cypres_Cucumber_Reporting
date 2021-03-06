'use strict'

export default class SearchProductPage {

    constructor(){
        this.radioButtons = '#usf-product-card > .ng-valid'
        this.errorCreateNewList = '.list-name-taken-message'
        this.alertMessage = '.toast-container'
    }

    clickElementIfContain(sectionName) {
        cy.wait(1000);
        cy.contains(sectionName, {timeout: 30000}).then($el => {
            cy.wrap($el).scrollIntoView().should('exist')
            cy.wait(500)
            cy.highlightBorderElement($el, 'magenta')
            cy.wrap($el).click()
            cy.highlightBorderElement($el, 'transparent')
        });
    }

    clickForceElementIfContain(sectionName) {
        cy.contains(sectionName, {timeout: 30000}).then($el => {
            cy.wrap($el).scrollIntoView().should('exist')
            cy.wait(500)
            cy.highlightBorderElement($el, 'magenta')
            cy.wrap($el).click({force:true})
            cy.highlightBorderElement($el, 'transparent')
        });
    }

    checkRadioElement(totalProd) {
        cy.wait(2000)
        for (let i = 0; i < Number(totalProd); i++) {
            cy.wait(1000)
            cy.get('ion-checkbox').eq(i).click({force: true})
        }
    }

    validateToastMsg(successMessage, failedMessage) {
        cy.document({log:false}).then(($document) => {
            const documentResult = $document.querySelectorAll('.green-toast')

            if (documentResult.length) {
                cy.get('.green-toast').shadow().find('.toast-top').then($el => {
                    cy.log('====>'+$el.text())
                    expect($el.text(), 'Success! Alert message was displayed properly: ').to.be.include(successMessage)
                    this.validateProductAddedAPI('added')
                })
            } else {
                cy.get('.red-toast').shadow().find('.toast-top').then($el => {
                    cy.log('====>'+$el.text())
                    expect($el.text(), 'Error! Alert message was displayed properly: ').to.be.include(failedMessage)
                    this.validateProductAddedAPI('nonAdded')
                })
            }
        })
    }

    selectListGroupPosition(select, option) {
        cy.xpath(`//ion-item[contains(.,'${select}')]`).click()

        let i = 0
        cy.get('.list-label').each($el =>{
            if ($el.text().includes(option)) {
                cy.clickElement('.mat-radio-inner-circle', i)
                return
            }
            i++
        })
    }

    validateToastDeleteProductMsg(successMessage, failedMessage) {
        for (let i= 0 ; i < 10; i++) {
        cy.wait(5000)
        cy.document({log:false}).then(($document) => {
            const documentResult = $document.querySelectorAll('.green-toast')

            if (documentResult.length) {
                cy.get('.green-toast').shadow().find('.toast-top').then($el => {
                    cy.log('====>' + $el.text())
                    expect($el.text(), 'Success! Alert message was displayed properly: ').to.be.include(successMessage)
                })
                this.validateProductDeletedAPI('deleted')
            } else {
                cy.get('.red-toast').shadow().find('.toast-top').then($el => {
                    cy.log('====>' + $el.text())
                    expect($el.text(), 'Error! Alert message was displayed properly: ').to.be.include(failedMessage)
                })
                this.validateProductDeletedAPI('notDeleted')
            }
        })
        }

    }

    validateProductDeletedAPI(product) {
        cy.fixture('login').then((login) => {
            cy.getAuthToken(login.api.user, login.api.password)
            cy.checkStatusCode('@getAuthToken', 200);
        });

        let productNum = global.productNumber.replace('#', '')
        cy.log('====Product Number =>>>>>>>' + productNum)
        cy.get('@getAuthToken').then((resToken) => {
            cy.getProductSummary(resToken, productNum)
        })

        cy.checkStatusCode(`@getProductSummary`, 200)

        if (product === 'deleted') {
            cy.get(`@getProductSummary`).then((response) => {
                expect(response.body).to.be.empty
            });
        } else {
            cy.get(`@getProductSummary`).then((response) => {
                expect(response.body).to.be.not.empty
            });
        }


    }

    validateProductAddedAPI(product) {
        cy.fixture('login').then((login) => {
            cy.getAuthToken(login.api.user, login.api.password)
            cy.checkStatusCode('@getAuthToken', 200);
        });

        let productNum = global.productNumber.replace('#', '')
        cy.log('====Product Number =>>>>>>>' + productNum)

        cy.get('@getAuthToken').then((resToken) => {
            cy.getListItemsProducts(resToken)
        })

        cy.checkStatusCode(`@getListItemsProducts`, 200)

        if (product === 'added') {
            cy.get(`@getListItemsProducts`).then((response) => {
                cy.log('====Product Number =>>>>>>>' + productNum)
                let i = 0

                for (i; i < response.body.length; i++) {

                    cy.log('+++++++++>>>>> '+ response.body[i])

                    if (response.body[i].productNumber === Number(productNum) && response.body[i].listKey.listId === 6923860) {
                        expect(true).to.equal(true, 'Group was created successfully on MongoDB');
                        break
                    }
                }
                if (i > response.body.length) {
                    expect(true).to.equal(false, 'Error!! Product was not created wrongly on MongoDB');
                }
            });
        } else {
            cy.get(`@getListItemsProducts`).then((response) => {
                let i = 0

                for (i; i < response.body.length; i++) {

                    if (response.body[i].productNumber === Number(productNum) && response.body[i].listKey.listId === 6923860) {
                        expect(true).to.equal(false, 'Error!! Product was created wrongly on MongoDB');
                        break
                    }
                }
                if (i > response.body.length) {
                    expect(true).to.equal(true, 'Product was not created on MongoDB successfully');
                }

            });
        }


    }

}
