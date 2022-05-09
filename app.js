//only using jquery in relation to AJAX api calls

let apiUrl
const apiUrls = {
  production: 'https://agile-sea-87482.herokuapp.com',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}


//GET FORM FIELDS (necessary to communicate with backend)
const addNestedValue = function (pojo, name, value) {
  const recurse = function recurse (pojo, keys, value) {
    const key = keys.shift()
    const next = keys[0]
    if (next === '') { // key is an array
      pojo[key] = pojo[key] || []
      pojo[key].push(value)
    } else if (next) { // key is a parent key
      pojo[key] = pojo[key] || {}
      recurse(pojo[key], keys, value)
    } else { // key is the key for value
      pojo[key] = value
    }

    return pojo
  }

  const keys = name.split('[').map((k) => k.replace(/]$/, ''))
  return recurse(pojo, keys, value)
}

const formatHtml = (html) => {
  var tab = '\t';
  var result = '';
  var indent= '';

  html.split(/>\s*</).forEach(function(element) {
      if (element.match( /^\/\w/ )) {
          indent = indent.substring(tab.length);
      }

      result += indent + '<' + element + '>\r\n';

      if (element.match( /^<?\w[^>]*[^\/]$/ ) && !element.startsWith("input")  ) {
          indent += tab;
      }
  });

  return result.substring(1, result.length-3);
}

// is a part of a form that can hold a value (input, select, textarea)
const isFormControl = type => {
const formControls = ['TEXTAREA', 'SELECT', 'INPUT', 'METER', 'PROGRESS']
return formControls.includes(type.toUpperCase())
}

const getFormFields = (form) => {
// Preconditions
if (form.tagName !== 'FORM') {
  const submittedHtml = form.outerHTML
  throw new Error(`Couldnt get form fields data. Expected a form, but instead got: ${submittedHtml} Please review 'get-form-fields.md'`)
}

const target = {}

const elements = form.elements || []
for (let i = 0; i < elements.length; i++) {
  const e = elements[i]
  if (!e.hasAttribute('name')) {

    const isSubmitInput = e.tagName === 'INPUT' && e.type.toUpperCase() === 'SUBMIT'
    const isButton = e.tagName === 'BUTTON' || isSubmitInput
    // if the element does not have a name and isn't a button
    if (isFormControl(e.tagName) && !isButton) {
      // cause an error
      throw new Error(`Couldnt get form fields data. \n${formatHtml(e.outerHTML)}\ndoes not have a name. Please review 'get-form-fields.md'`)
    }

    continue
  }

  if (isFormControl(e.tagName) && !e.hasAttribute('type')) {
    throw new Error(`Couldnt get form fields data. \n${formatHtml(e.outerHTML)}\n does not have a type. Please review 'get-form-fields.md'`)
  }

  let type = 'TEXT'
  switch (e.nodeName.toUpperCase()) {
    case 'SELECT':
      type = e.hasAttribute('multiple') ? 'MULTIPLE' : type
      break
    case 'INPUT':
      type = e.getAttribute('type').toUpperCase()
      break
  }

  const name = e.getAttribute('name')

  if (type === 'MULTIPLE') {
    for (let i = 0; i < e.length; i++) {
      if (e[i].selected) {
        addNestedValue(target, name, e[i].value)
      }
    }
  } else if ((type !== 'RADIO' && type !== 'CHECKBOX') || e.checked) {
    addNestedValue(target, name, e.value)
  }
}

return target
}

