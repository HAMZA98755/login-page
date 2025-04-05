// Test Submition 
document.forms[0].addEventListener("submit", function (submit) {
    handelEmptys()
    if (!(allValidation[0] && allValidation[1] && allValidation[2] && allValidation[3])) {
        submit.preventDefault();
    }
})
// Functions To Test input 
let checkName = (name) => /[A-Z][a-z]{3,16}/.test(name);
let checkNumber = (nubmer) => /9[0-9]{8}/.test(nubmer);
let checkEmail = (email) => /\w+@\w+\.(com|net|org|sy)/.test(email);
// Function To Crete Div For Anvalidate Inputs
let CreateDivForAnvalidInputs = (ele, errorMessage) => {
    let errorDiv = document.createElement("div");
    ele.appendChild(errorDiv);
    errorDiv.className = "error-div";
    errorDiv.innerHTML = errorMessage;
    errorDiv.style = "font-size: 16px; color: red; margin-top: 5px; font-weight: bold; font-family: monospace";
}
// Function To Return MessageError And To Return Right Funcion To Test Inputs
let returnMessageErrorAndFunction = (div) => {
    if (div.classList[0] === "first-name" || div.classList[0] === "last-name") 
        return ["Anvalid name!: First character must be capetal and can't be over 10 characters", checkName];
    else if (div.classList[0] === "phone-number")
        return ["Anvalid Phone Number!: Phone number must start 9 and can't be over 9 digits", checkNumber];
    else if (div.classList[0] === "email")
        return ["Anvalid email!: Email you enter not vallid email", checkEmail];
}
// Arrat To Store Statuse Of Inputs (Valid Or Not)
let allValidation = new Array([false, false, false, false]);
// Main Function To Handele Empty Inputs
let handelEmptys = () => {
    let divs = document.querySelectorAll("form > div:not(form > .year)");
    let emptyValidate = true;
    divs.forEach ((div) => {
        if (div.children[1].value === "") {
            if (document.querySelector(`.${div.classList[0]} .empty`) === null)
                creteDivForEmptyFilld(div)
        }
        else {
            if (document.querySelector(`.${div.classList[0]} .empty`) !== null)
                document.querySelector(`.${div.classList[0]} .empty`).remove();
        }
    })
}
// Function totCreate Div For Empty Filld
let creteDivForEmptyFilld = (div) => {
    let errorDiv = document.createElement("div");
    div.appendChild(errorDiv);
    errorDiv.className = "empty";
    errorDiv.innerHTML = "This feled requaired";
    errorDiv.style = "font-size: 16px; color: red; margin-top: 5px; font-weight: bold; font-family: monospace";
}
// Main Function To validate Form 
let validateForm = () => {
    let allDivs = document.querySelectorAll("form > div:not(form > .year)")
    // Check Input After 1 secound
    setInterval( () => {
        let index = 0;
        allDivs.forEach((ourDiv) => {
            let errorDiv = document.querySelector(`.${ourDiv.classList[0]} .error-div`)
            if (returnMessageErrorAndFunction(ourDiv)[1](ourDiv.children[1].value)) {
                if (errorDiv !== null) 
                    errorDiv.remove();
                allValidation[index] = true;
            }
            else if (ourDiv.children[1].value === "")
                allValidation[index] = false;
            else {
                allValidation[index] = false;
                if (errorDiv === null) 
                    CreateDivForAnvalidInputs(ourDiv, returnMessageErrorAndFunction(ourDiv)[0]);
            }
            index++
        })            
    }, 1000)
};
validateForm();
