const userNav = document.getElementById('user-nav')
const signOutNav = document.getElementById('sign-out-nav')
const signUpNav = document.getElementById('sign-up-nav')

const logInNav = document.getElementById('log-in-nav')
const logInForm = document.getElementById('log-in-form')

const overlay = document.getElementById('overlay')
const logInPage = document.getElementById('log-in')

const signUpForm = document.getElementById('sign-up-form')
const displayText = document.getElementById('display-text')

const userSigned = document.getElementById('user-signed')

const displayTextLogIn = document.getElementById('display-text-log-in')


const store = {
  
};


const signUp = function(data) {
  return $.ajax({
      method: 'POST',
      url: apiUrl + '/sign-up',
      data
  })
}

const signIn = function(data) {
  return $.ajax({
      method: 'POST',
      url: apiUrl + '/sign-in',
      data
  })
}

const signOut = function() {
  return $.ajax({
      method: 'DELETE',
      url: apiUrl + '/sign-out',
      headers: {
          Authorization: 'Bearer ' + store.user.token
      }
  })
}


function intialize(){
  userNav.style.display = 'none';
  signOutNav.style.display = 'none';

  signOutNav.addEventListener('click', function(){
    signOut()
      .then(() => signOutSuccess())
  })
}

intialize()


function signOutSuccess(){
  userNav.style.display = 'none'
  userNav.style.display = 'none';
  signUpNav.style.display = 'block';
  logInNav.style.display = 'block';
  signOutNav.style.display = 'none';
  store.user = '';

}

function signUpClick(){
  document.location.href = 'sign-up.html';
}
function homeClick(){
  document.location.href = 'index.html';
}

function galleryClick(){
  document.location.href = 'gallery.html';
}