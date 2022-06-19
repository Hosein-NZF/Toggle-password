/*  Make elements easier to reference later */
const materialTextField = document.getElementById('material-text-field__container');
const inputText = document.getElementById('input-text');
const labelText = document.getElementById('label-text');
const trailingIcon = document.getElementById('trailing-icon');
const activationIndicator = document.getElementById('activation-indicator');
const helperText = document.getElementById('helper-text');
const resetTextField = document.getElementById('reset');


const on = (el, event, cb) => el.addEventListener(event, cb);


let isShowPassword = false;
let isFailedRules = false;
let isInputValue = false;


on(inputText, 'input', (e) => {
  validateInput(e.target.value);
  isInputValue = e.target.value.length > 0;
});


on(inputText, 'blur', () => {
  if (isInputValue) {
    if (!isFailedRules) {
      helperText.classList.remove('js__helper-text--warning');
      helperText.classList.remove('js__helper-text--success');
    }
  } 
})


on(inputText, 'focus', () => {
 if (isInputValue && !isFailedRules) {
  helperText.classList.add('js__helper-text--success');
 } 
})

on(trailingIcon, 'mousedown', (e) => {
  e.preventDefault(); // prevent element from blurring
  isShowPassword = !isShowPassword;
  if (isShowPassword) {
    inputText.setAttribute('type', 'text'); // This allows us to see the password
    trailingIcon.innerHTML = 'visibility'; // this is how material icons knows which icon to show.
  } else {
    inputText.setAttribute('type', 'password'); // This will hide the password
    trailingIcon.innerHTML = 'visibility_off'; // this is how material icons knows which icon to show.
  }
})


on(resetTextField, 'click', () => {
  removeSuccessClasses();
  removeWarningClasses();
  labelText.classList.remove('js__label-text--input-has-value');
	isShowPassword = false;
	inputText.value ='';
	inputText.setAttribute('type', 'password');
  helperText.innerHTML='';
})


function validateInput(string) {
  let rules = [
    value => value.length > 0 || 'Required*',
    value => value.length > 7 || 'At least 8 characters'
  ];
  const failedRules = [];
  rules.forEach((rule) => {
    const result = typeof(rule(string)) === 'string' ? rule(string) : null;
    if (result) {
      failedRules.push(result);
    }
  })
  if (failedRules.length > 0) {
    isFailedRules = true;
    removeSuccessClasses();
    attachWarningClasses();
    helperText.innerHTML = failedRules[0];
  } else {
    isFailedRules = false;
    removeWarningClasses();
    attachSuccessClasses();
    helperText.innerHTML = 'Looks Good';
  }
}
function attachWarningClasses() {
  helperText.classList.add('js__helper-text--warning');
  materialTextField.classList.add('js__material-text-field--shake');
  activationIndicator.classList.add('js__activation-indicator--warning');
  labelText.classList.add('js__label-text--warning');
}
function removeWarningClasses() {
  helperText.classList.remove('js__helper-text--warning');
  materialTextField.classList.remove('js__material-text-field--shake');
  activationIndicator.classList.remove('js__activation-indicator--warning');
  labelText.classList.remove('js__label-text--warning');
}
function attachSuccessClasses() {
  helperText.classList.add('js__helper-text--success');
}
function removeSuccessClasses() {
  helperText.classList.remove('js__helper-text--success');
}