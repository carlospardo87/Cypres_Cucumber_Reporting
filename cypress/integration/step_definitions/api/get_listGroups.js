/// <reference types="Cypress" />

import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'



When('requesting ListGroup API', (productNum) => {
  cy.get('@getAuthToken').then((resToken) => {
    cy.getListGroups(resToken)
  })
})


When('requesting all lists groups API', (productNum) => {
  cy.get(`@getRefreshToken`).then((resToken) => {
    cy.getListGroups(resToken)
  })
})


When("requesting ListGroup API with customer:{string}, divisionNro:{string} and departmentNro:{string}", function (customer,divisionNro, departmentNro) {
  cy.get('@getAuthToken').then((resToken) => {
    cy.getListGroupsWithCustomerDetails(resToken, customer,divisionNro, departmentNro)
  })
});


Then('{string} response body should be contain group name {string}', (apiName, newGroupName) => {
  cy.get(`@get${apiName}`).then((response) => {

    console.log('====>>>> '+response.body.length)

    for (let i = 0; i < response.body.length; i++) {

      console.log('====>>>> '+response.body[i].groupName)

      if (response.body[i].groupName === newGroupName+global.randomNumber) {

        expect(response.body[i].groupName, 'New group name was updated properly').to.equal(newGroupName+global.randomNumber)
        return ''
      }
    }
    expect(newGroupName+global.randomNumber, 'Group name was not updated properly').to.equal('')
  })
})

Then('{string} response body should {string} products on group {string}', (apiName, type,  groupName) => {
  cy.get(`@get${apiName}`).then((response) => {

    console.log('==Body length ==>>>> '+response.body.length)

    for (let i = 0; i < response.body.length; i++) {

      if (response.body[i].groupName === groupName && response.body[i].listKey.listId  === 6923864) {

        console.log('=== List number  =>>>> ' + response.body[i].listKey.listId)
        console.log('=== Total groups =>>>> ' + response.body[i].listItemKeys.length)
        console.log('=== Total group plus one =>>>> ' + global.groupNumber)

        if (groupName === 'Group2') {
          expect(response.body[i].listItemKeys.length, 'Group was increased properly').to.equal(global.addingProducts);
          return ''
        } else if (groupName === 'Group1') {
          expect(response.body[i].listItemKeys.length, 'Group was increased properly').to.equal(global.subtractingProduct);
          return ''
        }
      }
    }
    expect(global.randomNumber, 'Group was not increased properly').to.equal('')
  })
})


Then('{string} response body should not include deleted group', (apiName) => {
  cy.get(`@get${apiName}`).then((response) => {

    console.log('==Body length ==>>>> '+response.body.length)
    console.log('==Group Name ==>>>> '+global.groupName)

    for (let i = 0; i < response.body.length; i++) {

      if (response.body[i].groupName === global.groupName && response.body[i].listKey.listId === 6923863) {
        expect(true).to.equal(false, 'Group was not removed properly')
      }
      }
    expect(true).to.equal(true, 'Group was removed properly ')
  })
})


Then('{string} response body should not include new group {string}', (apiName, grpName) => {
  cy.get(`@get${apiName}`).then((response) => {

    console.log('==Body length ==>>>> '+response.body.length)
    console.log('==Group Name ==>>>> '+grpName+global.randomNumber)
    let newGroupName = grpName+global.randomNumber
    let i = 0

    for (i; i < response.body.length; i++) {

      if (response.body[i].groupName === newGroupName && response.body[i].listKey.listId === 6923863) {
        expect(true).to.equal(true, 'Group was created successfully on MongoDB');
        break
      }
    }
    if (i > response.body.length) {
      expect(true).to.equal(false, 'Group was not created on MongoDB');
    }
  })
})






