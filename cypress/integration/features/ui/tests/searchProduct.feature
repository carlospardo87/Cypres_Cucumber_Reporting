@MK
Feature: Home page - Search a product

  As a user, I need to navigate to Home page
  and search for a product

  Scenario:SUCCESS - User should be able to look for a product using the search bar
    Given User navigates to USF with "browser"
    When should be able to search "jeans"
    And should be able to click on magnifying glass icon
    Then should be able to see page "Search - My Store"

  Scenario Outline: FAIL - User should be able to look for a product using the search bar
    Given User navigates to USF with "browser"
    When should be able to search "<products>"
    And should be able to click on magnifying glass icon
    Then should be able to see page "<pageTitle>"

    Examples:
      | pageTitle              | products |
      | Search - My Store YYYY | t-shirt  |
      | Search - My Store XXXX | short    |




