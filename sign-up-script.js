


function signUpIntialize(){
  signUpForm.addEventListener('submit', function(event){
    event.preventDefault()
    let form = event.target;
    let data = getFormFields(form);
    console.log(data)
    //this changes to another page through JS
    //document.location.href = 'index.html';
    if(data.credentials.first_name === ""){
      displayText.innerHTML = 'Please enter your First Name';
    }else if(data.credentials.last_name === ""){
      displayText.innerHTML = 'Please enter your Last Name';
    }else if(data.credentials.phone === ""){
      displayText.innerHTML = 'Please enter your Phone Number';
    }else if(data.credentials.email === ""){
      displayText.innerHTML = 'Please enter email';
    }else if((data.credentials.password === "") || (data.credentials.password_confirmation === "")){
      displayText.innerHTML = 'Please enter password';
    }else if(data.credentials.password !== data.credentials.password_confirmation){
      displayText.innerHTML = 'Passwords do not match';
    }else{ 
      signUp(data)
          .then((res) => signUpSuccess(res))
          .then(() => form.reset())
          .catch(() => displayText.innerHTML = 'An account with this email already exists')
  }
  })

  if(store.user != undefined){
    userNav.innerHTML = 'Welcome ' + store.user.email;
  userNav.style.display = 'block';
  signUpNav.style.display = 'none';
  logInNav.style.display = 'none';
  signOutNav.style.display = 'block';
  }
}

signUpIntialize()

function signUpSuccess(res){
  signUpForm.style.display = 'none';
  userSigned.innerHTML = "Please Log In!"
  console.log(res)
}


