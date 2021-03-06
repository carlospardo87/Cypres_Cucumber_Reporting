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
    this.descriptionOptios = '.selected-product-memos > .sc-ion-label-md-h'
    this.btn_move = '.selected-product-action-btns'

    this.newGroupCard = '.list-new-group-card'
    this.edit_newGroup = 'input[placeholder="Enter Group Name"]'
    this.msg_errorGroup = '.new-group-error'
    this.msg_errorListName = '.list-name-taken-message'
    this.clickGreenCheckmark = 'ion-icon[name="checkmark-circle-outline"]'
    this.redCloseCircle = '.new-group-input > .ion-color'
    this.ellipsisMenuIcon = '.list-page-options'
    this.ellipsisMenuProductCard = '.usf-product-card-ellipsis'
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
      cy.get(this.radioButton).eq(i).scrollIntoView().should('be.exist')
    cy.wait(500)
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
    cy.xpath(`//ion-label[contains(.,'${option}')]`)
        .should('be.visible')
        .click()
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
    cy.shouldElement('#selected-product',0, 'be.visible')
  }

  checkModalOption(optName) {
    optName = optName.toLowerCase()
    cy.shouldElement(
        this.descriptionOptios,
        0,
        'contain.text',
        `Where do you want to ${optName} these products?`)
    ////ion-label[contains(.,'Where do you want to delete this product?')]
  }

  clickFirstOption(optNames) {
    if (optNames !== 'Delete') {
      cy.clickElement('.groups-list .sc-ion-label-md-h', 0);
    }

  }

  checkBtnDisabled() {
    cy.get('.selected-product-action-btns .button').should('have.class', 'button-disabled')
  }

  checkBtnEnabled() {
    cy.get('.selected-product-action-btns .button').should('not.have.class', 'button-disabled')
  }

  clickBtnSubmit() {
    cy.clickElement('.selected-product-action-btns .button', 0)
  }

  clickBtnAddGroup() {
    cy.clickElement(this.btn_AddGroup, 0)
  }

  enterGroupName(groupName) {
    cy.get(this.edit_newGroup).scrollIntoView().should('exist')
    cy.shouldElement(this.newGroupCard, 0, 'be.visible')
    cy.get(this.edit_newGroup).type(groupName)
  }

  checkErrorMessage(locator, errorMessage) {
    cy.shouldElement(locator,0, 'contain.text',errorMessage)
  }

  checkGreenCheckmarkCircle() {
    cy.shouldHaveAttribute(this.clickGreenCheckmark, 'class', 'md hydrated group-name-available')
  }

  checkRedCloseCircle() {
    cy.shouldHaveAttribute(this.redCloseCircle, 'name', 'close-circle-outline')
  }

  clickCheckmarkCircle(colorType) {
    if (colorType === "green") {
      cy.get(this.clickGreenCheckmark).eq(0).scrollIntoView().should('be.exist')
      cy.clickElement(this.clickGreenCheckmark, 0);
    } else {
      cy.get(this.redCloseCircle).eq(0).scrollIntoView().should('be.exist')
      cy.clickElement(this.redCloseCircle, 0);
    }
  }

  clickOnEllipsisAndOption(optionMenu) {
    if (optionMenu === 'Quick View' || optionMenu === 'Search for Subs') {
      cy.wait(5000)
      cy.clickElement(this.ellipsisMenuProductCard, 0)
    } else {
      cy.clickElement(this.ellipsisMenuIcon, 0);
    }

     cy.xpath(`//ion-label[.='${optionMenu}']`)
         .should('be.visible').click()
  }


  clickProductOptionByText(optionMenu) {
    cy.contains("Replacement").then($el => {
      cy.wrap($el).scrollIntoView().should('exist')
      cy.wait(500)
      cy.clickElement(this.ellipsisMenuProductCard, 1)
    })

    cy.xpath(`//*[.='${optionMenu}']`).eq(0)
        .should('be.visible').click()
  }

  verifyEllipsisOptionMenu(optionMenu) {
    cy.xpath(`//ion-label[.='${optionMenu}']`).eq(0).should('be.visible')
  }

  clickProductCardEllipsis() {
    cy.wait(5000)
    cy.clickElement('.usf-product-card-ellipsis > ion-icon', 0)
    cy.shouldElement('.list-ios', 0 , 'be.visible')
  }


  saveProductCardInformation() {
    global.productNumber = Cypress.$('.usf-product-card-desc-body-txt > p').first().text()
    global.productPrice = Cypress.$('.usf-product-card-price > div > span').first().text()
    global.productDescription = Cypress.$('.usf-product-card-desc-heading-txt').first().text()
  }

  checkModalTitle(modalTitle) {
    cy.wait(2000)
    cy.shouldElement(this.editListNameModal, 0, 'be.visible');

    if (modalTitle.includes('Delete Group')) {
      cy.shouldElement('.title', 0, 'contain', modalTitle);
    } else if (modalTitle.includes('Quick View')) {
      cy.shouldElement('.quick-view-title-txt', 0, 'contain', modalTitle);
    } else {
      cy.shouldElement(this.titleModal, 0, 'contain', modalTitle);
    }
  }

  enterNewListName(newListName) {
    cy.get(this.input_newListName)
        .should('be.visible')
        .clear({timeout: 5000})
        .should('have.value', '')
        .type(newListName)
        .should('have.value', newListName)
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
      case 'Cancel':
        cy.clickElement(".cancel-button", 0)
        break;
      case 'Continue':
        cy.clickElement(".continue-button", 0)
        break;
    }
  }

  selectOptionToDelete(optionInfo) {
    if (optionInfo === 'Delete the group and move the products to the Unassigned group.' || optionInfo === 'Replace from all 1 lists on which this product is included') {
      cy.clickElementForce('span[class=\'mat-radio-outer-circle\']', 1);
    }
  }


  validateButtonGroupNameChanged(groupNumber, newGroupName) {
    cy.reload()
      cy.get(`button:nth-of-type(${groupNumber}) > .button-content`)
          .should('contain.text', newGroupName, {matchCase: false})
  }

  clickOnSubmitButton() {
    cy.clickElement(this.btn_submit, 0)
  }

  validateGroupNameChanged(groupNumber, newGroupName) {
    cy.clickElement(`button:nth-of-type(${groupNumber}) > .button-content`, 0)

    cy.get('.list-management-group-name')
        .should('contain.text', newGroupName, {matchCase: false})
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (1000000 - 10) + 10)
  }

    clickByGroupName(groupNumber) {
      cy.clickElement('.groups-list .sc-ion-label-md-h', Number(groupNumber) )
    }
}




