

/// <reference types="Cypress" />

import {Given, When} from "cypress-cucumber-preprocessor/steps";
import SearchProductPage from "../../../support/pages/SearchProductPage";



When("should be able to click on section {string}", (sectionName) => {
  new SearchProductPage().clickElementIfContain(sectionName)
});

When("should be able to see the green footer", () => {
  cy.get('.sticky-action-bar').scrollIntoView().should('exist')
  cy.wait(1000)
});


When("should be able to select {string} products", (totalProd) => {
  global.productNumber = Cypress.$('.usf-product-card-desc-body-txt > p').first().text()
  new SearchProductPage().checkRadioElement(totalProd)
});

When("should be able to see selected {string} products", (itemsTotal) => {
  cy.contains('.selection-count', `${itemsTotal} Products Selected`)
});

When("should be able to click on {string}", (btnName) => {
  new SearchProductPage().clickForceElementIfContain(btnName)
});

When("should be able to land to {string} page", (title) => {
  cy.title().should('include', title)
});

When("should be able to click link {string}", () => {
  cy.clickElement("[href='/desktop/home']", 0)
});




When("should be able to click button {string}", (btnName) => {
  cy.clickElement('.search-alternative-block > .md', 0)
});

When("should be able to see enabled {string}", (btnName) => {
  cy.get('.add-to-list-button').invoke('attr', 'class').should('not.contain', 'button-disabled')
  cy.clickElement('.add-to-list-button', 0)
});


When("should be able to see the modal {string}", (modalTitle) => {
  cy.wait(1000)
  cy.shouldElement('.modal-wrapper > .ion-page', 0, 'be.visible'); //#add-to-list
  cy.contains(modalTitle)
});


When("should be able to click on {string} and select {string}", (select, option) => {
  new SearchProductPage().selectListGroupPosition(select, option)
});



When("should be able to click on product card", () => {
  cy.wait(1000)
  cy.reload()
  cy.clickElementForce('.usf-product-card-desc-heading-txt', 1)

 /* let itemList = Cypress.$('.usf-product-card-desc-heading-txt').length
  cy.log('===>'+itemList)
  for (let i = 0; i < itemList; i++) {
    cy.log('===>'+Cypress.$('.usf-product-card-content').eq(i).text())
    if (!(Cypress.$('.usf-product-card-content').eq(i).text().includes('Replacement'))) {
      cy.clickElementForce('.usf-product-card-desc-heading-txt', i)
      break
    }
  }*/
});

When("should be able to see alert message {string}", (bannerAction) => {
  if (bannerAction === 'Add Products') {
    new SearchProductPage().validateToastMsg('Success! You have added 1 product to AutCypressAddProducts.', 'Could not add products at this time, please try again.')
  } else if (bannerAction === 'Delete Products') {
    new SearchProductPage().validateToastDeleteProductMsg('Successfully deleted products!', 'Could not delete products at this time, please try again.');
  } else if (bannerAction === 'Delete List') {
    new SearchProductPage().validateToastMsg('Success! You have deleted 1 product to Large List Cypress.', 'Could not delete products at this time, please try again.');

  }

});
