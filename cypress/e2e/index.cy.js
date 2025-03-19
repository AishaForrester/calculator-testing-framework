
/// <reference types="cypress" />



describe("Calculator", function() {

    beforeEach(function() {
      cy.visit('http://localhost:5500/index.html');  // if you're running a local server

      cy.reload();  // Reload to ensure the page is fresh

      cy.window().should('have.property', 'calculator');
        

    });



    it("should pass", function() {
      expect(true).to.equal(true);
  });

  it("should display 4 when 2+2 is calculated", function() {
    // Type '2+2' into the display
    cy.get('#display').type('2+2');

    // Click the equals button
    cy.get('#equals').click();

    // Assert the result is 4
    cy.get('#display').should('have.value', '4');
  });

  it("should return 2 when 4-2 is calculated", function() {
    cy.get('#display').type('4-2');
    cy.get('#equals').click();
    cy.get('#display').should('have.value', '2');
  });

  it("should return 8 when 4*2 is calculated", function() {
    cy.get('#display').type('4*2');
    cy.get('#equals').click();
    cy.get('#display').should('have.value', '8');
  });

  it("should return 2 when 4/2 is calculated", function() {
    cy.get('#display').type('4/2');
    cy.get('#equals').click();
    cy.get('#display').should('have.value', '2');
  });

  it("should return 3 when 9√ is calculated", function() {
    cy.get('#display').type('9√');
    cy.get('#equals').click();
    cy.get('#display').should('have.value', '3');
  });

  it("should return 0.1 when 10% is calculated", function() {
    cy.get('#display').type('10%');
    cy.get('#equals').click();
    cy.get('#display').should('have.value', '0.1');
  });

  it("should return -10 when 10 is clicked and +/- is pressed", function() {
    cy.get('#display').type('10');
    cy.get('#changeSign').click();
    cy.get('#display').should('have.value', '-10');
  });

  // More complex integration tests
  it("should recall memory correctly with successive MRC presses", function() {
    cy.get('#display').type('2+2');
    cy.get('#equals').click();
    cy.get('#memp').click(); // Add result to memory
    cy.get('#memr').click(); // Recall memory
    cy.get('#display').should('have.value', '4');
  });

  it("should subtract display value from memory when M- is pressed", function() {
    cy.get('#display').type('5+5');
    cy.get('#equals').click();
    cy.get('#memp').click(); // Add result to memory 
    cy.get('#clear').click();
    cy.get('#clear').click(); //turn the calculator back on

    cy.get('#display').type('3+3');
    cy.get('#equals').click();
    cy.get('#memm').click(); // Subtract from memory

    cy.get('#memr').click(); // Recall memory
    cy.get('#display').should('have.value', '4');
  });

  it("should disable all buttons when turned off", function() {
    cy.get('#display').type('123');
    cy.get('#clear').click(); // Turn off

    cy.get('#display').should('have.value', ''); // Display should be cleared

    cy.get('button').each(($btn) => {
      if ($btn.attr('id') !== 'clear') {
        cy.wrap($btn).should('be.disabled'); // All buttons except 'ON/C' should be disabled
      }
    });
  });

  //negative integers
  it("should return -2 for 1-3", function() {
    cy.get('#display').type('1-3'); // Type in the expression
    cy.get('#equals').click(); // Click the equals button
    
    cy.get('#display').should('have.value', '-2'); // Assert the result is -2
  });

  //complex calculations using BIMBAS
  it("should return 1.5 for 1+3-5*2/4", function() {
    cy.get('#display').type('1+3-5*2/4'); // Type in the expression
    cy.get('#equals').click(); // Click the equals button
    
    cy.get('#display').should('have.value', '1.5'); // Assert the result is 1.5
  });

  //decimal addition
  it("should return 1 for 0.25 + 0.75", function() {
    cy.get('#display').type('0.25+0.75'); // Type in the expression
    cy.get('#equals').click(); // Click the equals button
    
    cy.get('#display').should('have.value', '1'); // Assert the result is 1
  });

  // Negative test cases
  it("should return Infinity when dividing by 0", function() {
    cy.get('#display').type('10/0');
    cy.get('#equals').click();
    cy.get('#display').should('have.value', 'Infinity');
  });

  it("should return 'Invalid Input' for invalid input", function() {
    cy.get('#display').type('1++2');
    cy.get('#equals').click();
    cy.get('#display').should('have.value', 'Invalid Input');
  });




});