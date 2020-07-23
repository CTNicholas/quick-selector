/*
 *
 */


const addTemplate = createTemplate()

module.exports = function (literals, ...substitutions) {
  const query = createQuery(literals, substitutions)
  if (query === null) return null
  if (Array.isArray(query)) {
    return addTemplate(query)
  } else {
    const elements = Array.from(document.querySelectorAll(query))
    return elements.length > 0 ? addTemplate(elements) : null
  }
}

function createTemplate () {
  const events = getAllEvents()
  const customMethods = {
    set: setFunction,
    get: getFunction
  }
  return function (elements) {
    const customProps = {}
    events.forEach(event => {
      addAFunction(customProps, event, eventFunction, { elements, event })
    })
    Object.entries(customMethods).forEach(([methodName, methodFunc]) => {
      addAFunction(customProps, methodName, methodFunc, { elements })
    })
    return Object.defineProperties(elements, customProps)
  }
}

function addAFunction (customProps, propName, propFunc, funcVars) {
  customProps[propName] = {}
  customProps[propName].value = propFunc(funcVars)
}

/*
 * The next functions are all non-enumerable properties given to the created qs objects
 */
function eventFunction ({ elements, event }) {
  return function (func) {
    elements.forEach(element => {
      element.addEventListener(event, (jsEvent) => {
        func (jsEvent, elements)
      })
    })
    return elements
  }
}

function setFunction ({ elements }) {
  return function (func) {
    elements.forEach(func)
    return elements
  }
}

function getFunction ({ elements }) {
  return function (func) {
    return elements.map(element => func(element))
  }
}

/* 
 * Returns an array of names of all available events
 */
function getAllEvents () {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))).filter(eventName =>
    !eventName.indexOf('on') && (document[eventName] == null || typeof document[eventName] == 'function')
  ).map(eventName => eventName.substr(2))
}

/*
 * Takes arguments from a tagged template literal
 * If valid HTML element array submitted as first argument, return
 * Else If array entered as a substitution, and no literals, return substitution array
 * Else If return a query string to be used with document.querySelectorAll
 * If not valid, return null
 */
function createQuery (literals, substitutions) {
  console.log('here', literals, substitutions, substitutions.length, Array.isArray(substitutions))
  if (Array.isArray(literals) && literals.every(isValidElement)) {
    return literals
  } else if (Array.isArray(literals) && Array.isArray(substitutions)) {
    if (literals.join() === '' && substitutions.every(isValidElement)) {
      return substitutions
    } else {
      return literals.map((literal, index) => {
        return (literal || '') + (substitutions[index] || '')
      }).join() || null
    }
  } else if (typeof literals === 'string' || literals instanceof String) {
    return literals
  } else {
    return null
  }
}

function isValidElement (element) {
  return element instanceof Element || element instanceof HTMLDocument
}