'use strict'

export default class EditListPage {

  constructor() {
    this.radioButton = '#usf-product-card > .dot'
    this.groupButtons = '.list-groups-button'
    this.groupTitle = '.list-management-group-name'
    this.greenFooter = '.list-product-selection'
    this.totalProductSelected = '.list-product-selection > ion-text.md'
    this.viewSelectedProducts = '.selected-product-input .products-list'
    this.productAction = '.selected-product-action'
    this.descriptionOptios = '.selected-product-memos > .item > .sc-ion-label-md-h'
    this.btn_move = '.selected-product-action-btns'

    this.newGroupCard = '.list-new-group-card'
    this.edit_newGroup = 'input[placeholder="Enter Group Name"]'
    this.msg_errorGroup = '.new-group-error'
    this.msg_errorListName = '.list-name-taken-message'
    this.clickGreenCheckmark = 'ion-icon[name="checkmark-circle-outline"]'
    this.redCloseCircle = 'ion-icon[name="close-circle-outline"]'
    this.ellipsisMenuIcon = '.list-page-options'
    this.editListNameModal = '.modal-wrapper > .ion-page'
    this.input_newListName = '[data-cy=new-list-name] > .native-input'
    this.btn_submit = '[data-cy=submit]'
    this.btn_closeIcon = '.close-icon'
    this.titleModal = '[data-cy=title]'
    this.btn_AddGroup = '.list-groups-header > .md'
  }


  checkRadioButton() {
    cy.wait(1500)
    cy.get(this.radioButton).eq(0).should('be.visible').click({force: true})
    cy.get(this.radioButton).eq(0).should('have.class', 'is-selected')

    cy.get(this.radioButton).eq(0).should('be.visible').click({force: true})
    cy.get(this.radioButton).eq(0).should('not.have.class', 'is-selected')
  }

  selectMultipleRadioButton(index) {
    for (let i = 0; i < Number(index); i++) {
    cy.wait(1500)
      cy.get(this.radioButton).eq(i).should('be.visible').click({force: true})
    }
  }


  checkGroups() {
    cy.get(this.groupButtons).each($groupsButton =>{

      cy.highlightBorderElement($groupsButton, 'magenta')

      cy.wrap($groupsButton).should('be.visible').click({ force: true})
      let buttonName = $groupsButton.text()
        .replace("\u00a0","")
        .replace(/[(]/,'').replace(/[)]/,'').replace(/\s/g, '')

      cy.wait(1000)

      cy.get(this.groupTitle).then($groupName=>{
        let title_listName = $groupName.text()
            .replace("\u00a0","")
            .replace(/[(]/,'').replace(/[)]/,'').replace(/\s/g, '')
        cy.log(title_listName)
        cy.highlightBorderElement($groupName, 'magenta')

        expect(title_listName).to.includes(buttonName);
        cy.highlightBorderElement($groupsButton, 'transparent')
        cy.highlightBorderElement($groupName, 'transparent');
      });
    });
  }

  checkGreenFooter() {
    cy.shouldElement(this.greenFooter, 0, 'be.visible')

  }

  checkTotalProductSelected(itemsTotal) {
    cy.contains(this.totalProductSelected, `${itemsTotal} Products Selected`)
  }

  checkOptions(arrOptions) {
    let arrText = arrOptions.split(',');
    for (let i = 0; i < arrText.length; i++) {
      cy.contains(this.greenFooter, arrText[i])
    }
  }

  clickOptionByName(option) {
    cy.contains(option).click()
  }

  clickOnItemByName(itemName) {

    cy.clickByName('ion-label', ` ${itemName} `)
  }

  getAmountOfSelectedProducts(itemsTotal) {
    cy.get(this.viewSelectedProducts).its('length').then( eleLen => {
      expect(eleLen).to.equal(Number(itemsTotal))
    });
  }

  checkModalAppears() {
    cy.shouldElement('app-selected-product-desktop',0, 'be.visible')
  }

  checkModalOption(optName) {
    optName = optName.toLowerCase()
    cy.shouldElement(
        this.descriptionOptios,
        0,
        'contain.text',
        `Where do you want to ${optName}  these products?`)
  }

  clickFirstOption() {
    cy.clickElement('.groups-list .sc-ion-label-md-h', 0)
  }

  checkBtnDisabled() {
    cy.get('.selected-product-action-btns .button').should('have.class', 'button-disabled')
  }

  checkBtnEnabled() {
    cy.get('.selected-product-action-btns .button').should('not.have.class', 'button-disabled')
  }

  clickBtnAddGroup() {
    cy.clickElement(this.btn_AddGroup, 0)
  }

  enterGroupName(groupName) {
    cy.shouldElement(this.newGroupCard, 0, 'be.visible')
    cy.get(this.edit_newGroup).type(groupName)
  }

  checkErrorMessage(locator, errorMessage) {
    //cy.findByText(errorMessage)
    cy.shouldElement(locator,0, 'contain.text',errorMessage)
  }

  checkGreenCheckmarkCircle() {
    cy.shouldHaveAttribute(this.clickGreenCheckmark, 'class', 'md hydrated group-name-available')
  }

  checkRedCloseCircle() {
    cy.shouldHaveAttribute(this.redCloseCircle, 'name', 'close-circle-outline')
  }

  clickGreenCheckmarkCircle() {
    cy.get(this.clickGreenCheckmark).click()
  }

  clickOnEllipsisAndOption(optionMenu) {
    cy.clickElement(this.ellipsisMenuIcon, 0)

     cy.xpath(`//ion-item[.='${optionMenu}']`)
         .should('be.visible').click()
  }

  checkModalTitle(modalTitle) {
    cy.wait(2000)
    cy.shouldElement(this.editListNameModal, 0, 'be.visible')

    cy.shouldElement(this.titleModal, 0, 'contain', modalTitle)
  }

  enterNewListName(newListName) {
    cy.get(this.input_newListName)
        .should('be.visible')
        .clear({timeout: 5000})
        .should('have.value', '')
        .type(newListName)
        .should('have.value', newListName)
  }

  clickOnSubmitButton() {
    cy.clickElement(this.btn_submit, 0)
  }

  clickOnCloseIcon() {
    cy.clickElement(this.btn_closeIcon, 0)
  }

  checkOptionsList(optionMenu) {
    cy.xpath(`//ion-item[.='${optionMenu}']`)
        .should('be.visible')
  }

  checkTotalItems(totalItemsDropdown) {
    cy.get(`.list-ios > ion-item`).its('length').should('eq',Number(totalItemsDropdown))
  }

  clickOnButtonDeleteList(buttonName) {
    switch (buttonName) {
      case 'Cancel(X)':
        cy.clickElement("[name='close-outline']", 0)
        break;
      case 'NO':
        cy.clickElement("[data-cy='delete-no']", 0)
        break;
      case 'YES':
        cy.clickElement("[data-cy='delete-yes']", 0)
        break;
    }
  }


  checkTotalProductsUpdated() {

    cy.reload()
    cy.wait(2000)
    cy.get(`@productTwo`).then(productNumber => {

      cy
          .get('.usf-product-card-desc > :nth-child(3) > :nth-child(1)').eq(0)
          .should('have.text',productNumber )
      })
  }
//Checking group 1 has 1 product less and group 2 has 1 product more
  checkTotalGroupUpdated() {
    this.isLessThan('groupOne', 0)
    this.isGreaterThan('groupTwo', 1)
  }

  //Getting text number on the groups 1 and 2
  savingCurrentState() {
    cy.get('.button-content > p').eq(0).invoke('text').as('groupOne')
    cy.get('.button-content > p').eq(1).invoke('text').as('groupTwo')
  }

  //Getting product number in product 2
  savingCurrentProducts() {
    cy.get('.usf-product-card-desc > :nth-child(3) > :nth-child(1)').eq(1).invoke('text').as('productTwo')
  }


  isLessThan(alias, groupOrder){
    cy.get(`@${alias}`).then(text => {
      let numberBefore = text.toString()
          .replace(/[(]/, '')
          .replace(/[)]/, '')

      cy.get('.button-content > p').eq(groupOrder).invoke('text').then(text => {
        let numberAfter = text
            .replace(/[(]/, '')
            .replace(/[)]/, '')

        expect(Number(numberAfter), 'Number should be less than').to.be.lessThan(Number(numberBefore));

      })
    });
  }

  isGreaterThan(alias, groupOrder){
    cy.get(`@${alias}`).then(text => {
      let numberBefore = text.toString()
          .replace(/[(]/, '')
          .replace(/[)]/, '')

      cy.get('.button-content > p').eq(groupOrder).invoke('text').then(text => {
        let numberAfter = text
            .replace(/[(]/, '')
            .replace(/[)]/, '')

        expect(Number(numberAfter), 'Number should be less than').to.be.greaterThan(Number(numberBefore));

      })
    });
  }
}


