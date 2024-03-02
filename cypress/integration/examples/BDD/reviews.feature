Feature: Testing NextJS Reviews Project

    All pages exist

    Scenario: Home page exists with one featured game
    Given I open NextJs Reviews Project home page
    Then Validate that one featured game exists

    Scenario: Reviews page exists with three reviews
    Given I open NextJs Reviews Project reviews page 
    Then Validate that three game reviews exist 

    Scenario: Hellblade page exists with all content
    Given I open the Hellblade page
    Then Validate that page contents exists

    Scenario: Hollow Knight page exists with all content
    Given I open the Hollow Knight page
    Then Validate that page contents exists

    Scenario: Stardew Valley page exists with all content
    Given I open the Stardew Valley page
    Then Validate that page contents exists


