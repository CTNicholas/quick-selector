const addTemplate = createTemplate()

module.exports = function (literals, ...substitutions) {
  const query = createQuery(literals, substitutions)
  if (query === null) return null
  const elements = Array.from(document.querySelectorAll(query))
  return elements.length > 0 ? addTemplate(elements) : null
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

function eventFunction ({ elements, event }) {
  return function (func) {
    elements.forEach(element => {
      element.addEventListener(event, func)
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

function getAllEvents () {
  return Object.getOwnPropertyNames(document).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))).filter(eventName =>
    !eventName.indexOf('on') && (document[eventName] == null || typeof document[eventName] == 'function')
  ).map(eventName => eventName.substr(2))
}

function createQuery (literals, substitutions) {
  if (Array.isArray(literals) && Array.isArray(substitutions)) {
    return literals.map((literal, index) => {
      return (literal || '') + (substitutions[index] || '')
    }).join() || null
  } else if (typeof literals === 'string' || literals instanceof String) {
    return literals
  } else {
    return null
  }
}
