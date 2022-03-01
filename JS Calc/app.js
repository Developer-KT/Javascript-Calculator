function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText=num;                                                 //add value to history-value
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }
    else {
    document.getElementById("output-value").innerText=getFormatedNumber(num);
    }
}

function getFormatedNumber(num) {
    if (num == "") {                                                                                       //To be able to backspace result
        return "";
    }
    var n = Number(num);                                                                                       //to add commas
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {                                                                        //to go back to original number (without commas)
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id == "clear") {                                                                          //If clicked clear button
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();                                      //We reverse (remove) commas so we can backspace numbers only
            if (output) {                                                                                       //If output has a value
                output = output.substring(0,output.length-1);                                              //Remove last character (using substring)    {per click}
                printOutput(output);
            }
        }
        else {                                                                                             //Signs (+-*/) operators
            var output = getOutput();
            var history = getHistory();
            if (output != "") {                                                                            //If output is not empty
                output = reverseNumberFormat(output);
                history = history + output
                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })
}

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        var output = reverseNumberFormat(getOutput());
        if (output!= NaN) {                                                                                //if output is a number
            output = output + this.id;
            printOutput(output);
        }
    })
}