
const inputSlider = document.querySelector("[data-length-slider]");
const lengthDisply = document.querySelector("[data-length]");
const passwordDisplay = document.querySelector(".disply");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#upperCase");
const lowercaseCheck = document.querySelector("#lowerCase");
const numberCheck = document.querySelector("#Number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector(".indicator");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type='checkbox']");
const symbol = '~!@#$%^&*()_-+=>?<,":;}{}[]/*-+';

let password = "";
let passwordlength = 10;
let checkCount = 0;
handleSlider();
// set strength circle color grey
setIndicator("#ccc");

// set password length using slider
function handleSlider() {
  inputSlider.value = passwordlength;
  lengthDisply.innerText = passwordlength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ((passwordlength - min) * 100 / (max - min)) + "% 100%";
  console.log('handle slider perfomed');
}

// set indicator color
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `2px 2px 5px 3px ${color}`;

    console.log('set indicator perfomed');
  }
  


// get random integer
function getRandInt(min,max) {
   return Math.floor(Math.random() *(max - min)) + min ;
  console.log('get random integer runnnn');

}

// generate random integer
function generateRandNum(){
    return getRandInt(0,9);
  console.log('called generate random number');

}


// generate random lowecase
function generateLowerCase() {
    
    return  String.fromCharCode(getRandInt(97,123));
  console.log('called generate random lowercase');

}

// generate random uppercase
function generateUpperCase() {
    
    return  String.fromCharCode(getRandInt(65,95));
  console.log('called generate random uppercase');

}


// generate symbol
function generateSymbol() {
    const randNum = getRandInt(0,symbol.length) ;
    return symbol.charAt(randNum);
  console.log('called generate random symbol');

}

//strength function
function calcStrength() {
    let hasUpper = false;
    let haslower = false;
    let hasNum =  false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) haslower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;
    if(hasUpper && haslower && (hasNum || hasSym) && passwordlength>= 8)
    {
        setIndicator("#0f0");
    }
    else if((hasUpper || haslower) && (hasNum || hasSym) && passwordlength >= 6)
    {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
  console.log('calculate strength function perform');
   
}

// copy function

async function copyContent()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
          copyMsg.innerText = "failed";
    }
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

    console.log('copy content perfomedddd');
}



// event listner on slider
inputSlider.addEventListener('input',(e) => {
    passwordlength = e.target.value;
    handleSlider();
})

// event listener on copyBtn

copyBtn.addEventListener('click', () =>
{
    if(passwordDisplay.value)
    {
        copyContent();
    }
})


// check box count function
function handelcheckBoxeschange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked) checkCount++;
    });

    if(passwordlength < checkCount)
    {
        passwordlength = checkCount;
        handleSlider();
    }

    console.log('halde check boxes workedd');

}

//shuffle password function 
function shufflePassword(array) {
    // fisher yates method 
    for(let i =array.length-1 ; i> 0; i--)
    {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str+=el));
    return str;
    console.log('shuffling password worked');
   
}
// event listner on checkboxes
for (const checkbox of allCheckBox) {
    checkbox.addEventListener('change', handelcheckBoxeschange);
  }


//generate password function event listner
generateBtn.addEventListener('click', () => {
    // none of check box is uncheckedd
    if(checkCount <= 0) return;
    if(passwordlength == checkCount)
    {
        passwordlength =checkCount;
        handleSlider();
    }
    // lets us start finding new password
    console.log('starting the journey');

    password = "";

    // lets put the stuff mentioned by checkboxex


    // if(uppercaseCheck.checked)
    // {
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked)
    // {
    //     password += generateLowerCase();
    // }
    // if(symbolCheck.checked)
    // {
    //     password += generateSymbol();
    // }
    // if(numberCheck.checked)
    // {
    //     password += generateRandNum();
    // }

    let funcArr = [];
    if(uppercaseCheck.checked)
    {
        funcArr.push(generateUpperCase());
    }
    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowerCase());
    }
    if(symbolCheck.checked)
    {
        funcArr.push(generateSymbol());
    }
    if(numberCheck.checked)
    {
        funcArr.push(generateRandNum());
    }


    // complusary  addition
    for(let i = 0 ; i < funcArr.length; i++)
    {
        password += funcArr[i];
    }
    console.log('complusary done');


    // remaining addition 
    for(let i = 0; i < passwordlength - funcArr.length; i++)
    {
        let randomIndex = getRandInt(0,funcArr.length);
        console.log(" rndom index" + randomIndex);
        password += funcArr[randomIndex];
    }

    console.log('remaining done');


    // shuffle the password 
    password = shufflePassword(Array.from(password));
    if (passwordDisplay) {
        passwordDisplay.value = password;
      }

    console.log('shuffling done');


    //strength shown 
    calcStrength();

})
