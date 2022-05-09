
function logInIntialize(){
  overlay.style.display = 'none';
  logInNav.addEventListener('click', function() {
    overlay.style.display = 'block';
    logInPage.style.display = 'block';
  })

  overlay.addEventListener('click', function(){
    overlay.style.display = 'none';
    logInPage.style.display = 'none';
  })

  logInForm.addEventListener('submit', function(event){
    event.preventDefault()
    let form = event.target;
    let data = getFormFields(form);
    console.log(data)
    signIn(data)
      .then((res) => logInSuccess(res))
      .then(() => form.reset())
      .catch(() => displayTextLogIn.innerHTML = 'Email or Password is Incorrect')
    //document.location.href = 'index.html';
  })
}

logInIntialize()

function logInSuccess(res){
  userNav.innerHTML = 'Welcome ' + res.user.email;
  userNav.style.display = 'block';
  signUpNav.style.display = 'none';
  logInNav.style.display = 'none';
  signOutNav.style.display = 'block';
  overlay.style.display = 'none';
  logInPage.style.display = 'none';
  store.user = res.user;

}