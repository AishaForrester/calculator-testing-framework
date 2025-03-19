'use strict';
console.log("index.js is in use...");

//Global window.calculator object encapsulates the functionality of our calculator
window.calculator = window.calculator || {}; 


console.log("window.calculator is initially:", window.calculator);
console.log("window.calculator.init is initially:", window.calculator.init);

window.calculator.init = function () {
    console.log("Initializing calculator after it has been called by beforeEach...");
    const display = document.getElementById('display');
    console.log("new display", display);

    console.log("window.calculator is now:", window.calculator);
    //'window.calculator is now:', Object{init: function(){ ... }}
    console.log("window.calculator.init is now:", window.calculator.init);
    //'window.calculator.init is now:', function(){ ... }

// Calculator Core functionality


(function(){ //runs before the index.test.js and all this is exucuted, this is window.calculate
    console.log("index.js init is loading..")
    //window.calculate = calculate;

    //const display = document.getElementById('display');
    console.log(document.getElementById("display"));
    if (!display) {
        console.error("Display element not found! Delaying init...");
        return;
    }
    console.log("Display found!");

    let memory = 0; //stores the memory value
    let memoryRecallCount = 0; //tracks consecutive presses of MRC
    //let clearCount = 0; tracks presses of on/c

    

    /**_________________Append input to screen______________ */
    function appendDisplay(input){
        display.value += input;
    }

    /**_________________Clear the display______________ */
    function clearDisplay() {
        display.value ="";
        
    }

    /**_________________Calculate the expression on the display______________ */
    function calculate() {
        try {
            // Step 1: Handle percentages (e.g., "50%" → "50/100")
            display.value = display.value.replace(/(\d+)%/g, "($1/100)");
    
            // Step 2: Handle square root (replace "9√" with "Math.sqrt(9)")
            display.value = display.value.replace(/(\d+)√/g, "Math.sqrt($1)");
    
            // Step 3: Evaluate the expression
            display.value = eval(display.value);  // Use eval after replacing √ with Math.sqrt()

            
        } catch (error) {
            display.value = "Invalid Input";
        }
    }
    

    /**_________________Calculate the square root______________ */
    function applySquareRoot() {
        try {
            display.value = Math.sqrt(parseFloat(display.value));
        } catch (error) {
            display.value = "Error";
        }
    }

    /**_________________Change between negative and positive signs(+/-)______________ */
    function toggleSign() {
        if (display.value) {
            display.value = parseFloat(display.value) * -1;
        }
    }

    /**_________________Displays the content of the memory(MRC)______________ */
    function memoryRecall() {
        if (memoryRecallCount === 1) {
            memory = 0; // Clear memory if pressed twice
            display.value = "";
            memoryRecallCount = 0;
        } else {
            display.value = memory; // Show stored memory
            memoryRecallCount++;
        }
    }

    /**_________________Adds display to what is in the memory(M+)______________ */
    function memoryAdd() {
        if (display.value !== "") {
            memory += parseFloat(display.value);
        }
        memoryRecallCount = 0; // Reset recall count
    }

    /**_________________Subtract the display from what is in the memory(M-)______________ */
    function memorySubtract() {
        if (display.value !== "") {
            memory -= parseFloat(display.value);
        }
        memoryRecallCount = 0;
    }

    /**_________________Switch between the on, off and clear functionality(Off/On/Clear)______________ */
    function powerToggle() {
        
        if (display.value === "") {
            display.value = ""; // Ensure clean start
            document.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
        } else {
            display.value = ""; // Turns off calculator
            document.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
            document.getElementById("clear").disabled = false; // Keep ON/C active
        }
    }
  
    
    //registers eventlisteners for all buttons to perform their operations
     //flow: this is assigned butnot called immediatley
        console.log("eventlisteners listening...");
		document.getElementById('changeSign').addEventListener('click', () =>toggleSign());
        document.getElementById('sqrt').addEventListener('click', ()=>appendDisplay('√'));
        document.getElementById('percent').addEventListener('click', ()=>appendDisplay('%'));
        document.getElementById('div').addEventListener('click', ()=>appendDisplay('/'));
        document.getElementById('memr').addEventListener('click', ()=>memoryRecall());
        document.getElementById('memm').addEventListener('click', ()=>memorySubtract());
        document.getElementById('memp').addEventListener('click', ()=>memoryAdd());
        document.getElementById('mult').addEventListener('click', ()=>appendDisplay('*'));
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => appendDisplay(button.textContent));
        });
        document.getElementById('minus').addEventListener('click', ()=>appendDisplay('-'));
        document.getElementById('plus').addEventListener('click', ()=>appendDisplay('+'));
        document.getElementById('equals').addEventListener('click', ()=>calculate());
        document.getElementById('clear').addEventListener('click', () => powerToggle());
        document.getElementById('decimal').addEventListener('click', ()=>appendDisplay('.'));
        
	
})();

};
