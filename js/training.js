// validate Email

function validateEmail() {
  let value = emailInput.value;

  if (!value) {
    showErrorMessage(emailInput, 'Email is a required field.');
    return false;
  }

  if (value.indexOf('@') === -1 {
    showErrorMessage(emailInput, 'You must enter a valid email address.');
    return false;
  }

  showErrorMessage(emailInput, null);
  return true;
}


  let hasAtSign = value.indexOf('@') > -1;
  let hasDot = value.indexOf('.') > -1;
  return value && hasAtSign && hasDot;
}

// validate PW

function validatePassword() {
  let value = passwordInput.value;

  if (!value) {
    showErrorMessage(passwordInput, 'Password is a required field.');
    return false;
  }

  if (value.length < 8) {
    showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
    return false;
  }

  showErrorMessage(passwordInput, null);
  return true;

}
 // validateForm

function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

// show error message in input field

function showErrorMessage(input, message) {
  let container = input.parentElement; //the .input-wrappper

  // Remove an existing error

  let error = container.querySelector('.error.message');
  if (error) {
    container.removeChild(error);
  }

  // Now add the error if the message is not empty

  if (message) {
    let error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = message;
    container.appendChild(error);
  }
}

// validate form once the user start typing

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
