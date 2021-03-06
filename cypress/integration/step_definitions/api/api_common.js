/// <reference types="Cypress" />

import {Given,Then} from 'cypress-cucumber-preprocessor/steps'

Given('authorization token was requested', () => {
  cy.fixture('login').then( (login) => {
    cy.getAuthToken(login.api.user, login.api.password)
    cy.checkStatusCode('@getAuthToken', 200)
  })

})

Given('refresh token was requested with customer: {string} and division: {string}', (customerNro, divisionNro) => {
  cy.get('@getAuthToken').then((resToken) => {
    cy.getRefreshTokenByCustomer(resToken, customerNro,divisionNro)
  })
})

Then('{string} response should contain status {string}', (apiName, statusCode) => {
  cy.checkStatusCode(`@get${apiName}`, statusCode)
})

Then('{string} response should be successful', (apiName) => {
  cy.get(`@get${apiName}`).then((response) => {

    expect(response.body).to.be.not.empty
    expect(response.body.length).to.be.greaterThan(0)

    expect(response).to.have.property('duration')
    expect(response).to.have.property('headers')
    expect(response).to.have.property('messages')
    expect(response).to.have.property('requestHeaders')
    expect(response).to.have.property('statusText', 'OK')
  })
})

Then('{string} response body should be successful', (apiName) => {
  cy.get(`@get${apiName}`).then((response) => {
    expect(response.body[0]).to.have.property('_id')
    expect(response.body[0]).to.have.property('listKey')
  })
})









