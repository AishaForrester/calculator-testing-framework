

console.log("index.test.js loaded!");

describe("Calculator", function() {

    beforeEach(function() {
        console.log("running first beforEach")
        if (!window.calculator || typeof window.calculator.init !== 'function') {
            console.error("window.calculator is missing or init() is undefined!");
            throw new Error("window.calculator is not defined or init() is missing.");
        }
        console.log("Setting up test DOM before index.js...");

        
    
        var fixture = `
        <div id="container">
            <input id="display">
            <div id="allButtons">
                <button class="operator" id="changeSign">+/-</button> <button class="operator" id="sqrt">√</button>
                <button class="operator" id="percent">%</button> <button class="operator" id="div">÷</button> 
                <button class="memory" id="memr">MRC</button> <button class="memory" id="memm">M-</button> 
                <button class="memory" id="memp">M+</button> <button class="operator" id="mult">×</button> 
                <button class="number">7</button> <button class="number">8</button> <button class="number">9</button> 
                <button class="operator" id="minus">-</button> 
                <button class="number">4</button> <button class="number">5</button> <button class="number">6</button> 
                <button class="operator" id="plus">+</button> 
                <button class="number">1</button> <button class="number">2</button> <button class="number">3</button> 
                <button id="equals">=</button> 
                <button id="clear">ON/C</button> <button class="number">0</button> <button class="decimal" id="decimal">.</button> 
            </div>
        </div>`;
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    // Remove the HTML fixture from the DOM, cleaning up after each test, preventing one test from affecting
    //the other
    afterEach(function() {
        let container = document.getElementById('container');
        if (container) {
            container.remove();
        }
    });

    

    // Call the init function of calculator to register DOM elements, this is done before every test
    beforeEach(function() {
        console.log("Calling calculator.init() from within the beforeEach...");

        // Initialize the calculator (ensures window.calculate is available)
        window.calculator.init();
        
    });


    it("Should turn off the calculator (Off Unit Test)", function() {
        
        // turn off calculator
        document.getElementById('clear').click(); 

        // Verify the display is cleared
        expect(document.getElementById('display').value).toBe("");
 

        // Verify all buttons are disabled except for ON/C button
        const buttons = document.querySelectorAll("button");
        buttons.forEach((btn) => {
            if (btn.id !== 'clear') {
                expect(btn.disabled).toBe(true);
            } 
        });
    });


    it("Should turn on the calculator :On Unit Test", function() {
        
        // turns off calculator
        document.getElementById('clear').click(); 

        // Verify the display is cleared
        expect(document.getElementById('display').value).toBe("");

        // turn the calculator on
        document.getElementById('clear').click(); 


        // Verify all buttons are enabled except for ON/C button ctorAll("button");
        const buttons = document.querySelectorAll("button");
        buttons.forEach((btn) => {
            expect(btn.disabled).toBe(false); //button is enabled and can be interacted with
        });
    });

    


    //clearing calculator display
    it("Should clear calculator if it has value in display (clear unit test)", function() {
        document.getElementById('display').value = "1025";  // Ensure display is empty

        // Call powerToggle when display is empty
        document.getElementById('clear').click();  
        
        expect(document.getElementById('display').value).toBe("");

        // Verify all buttons are enabled (except the ON/C button)
        const buttons = document.querySelectorAll("button");
        buttons.forEach((btn) => {
            if (btn.id !== 'clear') {  // ON/C button should remain enabled
                expect(btn.disabled).toBe(false);
            }
        });
        
    });

    

    
    it("Should return 4 for 2+2 : Addition Unit Test", function() {
        document.getElementById('display').value = "2+2";
        document.getElementById('equals').click();

        expect(document.getElementById('display').value).toBe("4");
    });

    it("Should return 2 for 4-2 :Subtraction Unit Test", function() {
        document.getElementById("display").value = "4-2";
        document.getElementById('equals').click();

        expect(document.getElementById('display').value).toBe("2");
    });

    it("Should return 8 for 4*2 :Multiplication Unit Test", function() {
        document.getElementById("display").value = "4*2";
        document.getElementById('equals').click();

        expect(document.getElementById('display').value).toBe("8");
    });

    it("Should return 2 for 4/2 :Division Unit Test", function() {
        document.getElementById("display").value = "4/2";
        document.getElementById('equals').click();

        expect(document.getElementById('display').value).toBe("2");
    });

    it("Should return 3 for √9 :Square root Unit Test", function() {
        document.getElementById("display").value = "√9";
        document.getElementById('equals').click();

        expect(document.getElementById('display').value).toBe("3");
    });

    it("Should return 0.1 for 10% :Percent Unit Test", function() {
        document.getElementById("display").value = "10%";
        document.getElementById('equals').click();

        expect(document.getElementById('display').value).toBe("0.1");
    });

    it("Sign operators Unit Test: should return -10 for 10", function() {
        document.getElementById("display").value = "10";
        document.getElementById('changeSign').click();

        expect(document.getElementById('display').value).toBe("-10");
    });

    //Integration tests: MRC with M+
    it("Should recall and clear memory with successive MRC presses (Integration test)", function() {
        document.getElementById('display').value = "2+2";
        document.getElementById('equals').click();  // Click equals, result should be 4
        expect(document.getElementById('display').value).toBe("4");

        // Press M+ to add the result to memory
        document.getElementById('memp').click();

        //clear
        document.getElementById('clear').click();  

        // Press MRC to recall the memory
        document.getElementById('memr').click();
        expect(document.getElementById('display').value).toBe("4");  // Memory should recall 4
    });

    //Integration tests: MRC with M-
    it("(Should subtract display value from memory when M- is pressed (Integration)", function() {
        // Perform a calculation: 5 + 5
        document.getElementById('display').value = "5+5";
        document.getElementById('equals').click();  // Result should be 10

        expect(document.getElementById('display').value).toBe("10");

        // Press M+ to add the result to memory
        document.getElementById('memp').click();

        // Perform another calculation: 3 + 3
        document.getElementById('display').value = "3+3";
        document.getElementById('equals').click();  // Result should be 6

        // Press M- to subtract the display value (6) from memory (10)
        document.getElementById('memm').click();

        // Press MRC to recall the updated memory (should be 4 after subtraction)
        document.getElementById('memr').click();
        expect(document.getElementById('display').value).toBe("4");
    });



    //negative numbers
    it("Should return -2 for 1-3", function() {
        document.getElementById("display").value = "1-3";
        document.getElementById('equals').click();
        expect(document.getElementById('display').value).toBe("-2");
    });

    //complex calculation 1+3-5*2/4
    it("Should return 1.5 for 1+3-5*2/4 (BIMDAS Calculations Unit Test)", function() {
        document.getElementById("display").value = "1+3-5*2/4";
        document.getElementById('equals').click();
        expect(document.getElementById('display').value).toBe("1.5");
    });

    //adding decimals
    it("Should return 1 for 0.25 + 0.75 (Decimal addition Unit Test)", function() {
        document.getElementById("display").value = "0.25+0.75";
        document.getElementById('equals').click();
        expect(document.getElementById('display').value).toBe("1");
    });
    

    //Errors: Dividing by 0, inavalid operators
    it("Should return infinity for 10/0 (Dividing by 0 Unit Test)", function() {
        document.getElementById("display").value = "10/0";
        document.getElementById('equals').click();
        expect(document.getElementById('display').value).toBe("Infinity");
    });

    it("Should return invalid for 1++2 (Invalid operators Unit Test)", function() {
        document.getElementById("display").value = "1++2";
        document.getElementById('equals').click();
        expect(document.getElementById('display').value).toBe("Invalid Input");
    });



    



    








});