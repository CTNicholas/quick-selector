/*
 * Initialise events and template
 */
const addTemplate = createTemplate()

/*
 * Exports qs function
 * Creates querySelectorAll, and return templated result
 * If element array passed, return templated result
 */
module.exports = function (literals, ...substitutions) {
  const query = createQuery(literals, substitutions)
  if (!query || query.length === 0 || query === '[object Object]') return null
  if (Array.isArray(query)) {
    return addTemplate(query)
  } else {
    const elements = Array.from(document.querySelectorAll(query))
    return elements.length > 0 ? addTemplate(elements) : []
  }
}

/*
 * Initialises events and customMethods, then returns a function that applies
 * changes to an element list:

 * Each of these properties applies to every element in the array:
 * - Adds every type of eventListener to the qs element list's hidden properties
 *   qs`.element`.click(clickFunc)
 * 
 * - Adds a .remove property, to remove eventListeners 
 *   qs`.element`.remove.click(clickFunc)
 * 
 * - Adds set, to set properties of elements
 *   qs`.element`.set(el => el.style.color = 'red')
 * 
 * - Adds get, to get an array of properties of elements
 *   const getText = qs`.element`.get(el => el.innerHTML) // ['an element', 'inside another']
 * 
 * - Adds only to select a single element from an index, returning an array of 1
 *   qs`.element`.only(1) // [ HTMLElement ]
 * 
 * - Modifies the following array methods, to return an array that has been parsed by qs:
 *   Filter
 *   qs`.element`.filter(el => el.innerHTML.includes('Title'))
 */
function createTemplate () {
  const events = getAllEvents()
  const customMethods = {
    set: setFunction,
    get: getFunction,
    only: onlyFunction,
    filter: arrayFunction
  }
  return function (elements) {
    const customProps = {}
    const removeEventObject = {}
    events.forEach(event => {
      addAFunction(customProps, event, eventFunction, { elements, event })
      removeEventObject[event] = removeEventFunction({ elements, event })
    })
    customProps.remove = { value: removeEventObject }
    Object.entries(customMethods).forEach(([methodName, methodFunc]) => {
      addAFunction(customProps, methodName, methodFunc, { elements, methodName })
    })
    return Object.defineProperties(elements, customProps)
  }
}

/*
 * Adds a function to customProps, to be used in defuneProperties
 */
function addAFunction (customProps, propName, propFunc, funcVars) {
  customProps[propName] = {
    value: propFunc(funcVars)
  }
}

/*
 * The next few functions are all non-enumerable properties given to the created qs objects
 * Or in one case, an object that enables removes event listeners
 * 
 * Creates an event listener, returns elements
 */
function eventFunction ({ elements, event }) {
  return function (func) {
    elements.forEach(element => {
      element.addEventListener(event, func)// (jsEvent) => {
      //  func (jsEvent, elements)
      //})
    })
    return elements
  }
}

/*
 * Removes event listener, returns elements
 */
function removeEventFunction ({ elements, event }) {
  return function (func) {
    console.log('Removing', event, elements)
    elements.forEach(element => {
      element.removeEventListener(event, func)
    })
    return elements
  }
}

/*
 * Applies array method then returns qs templated array
 */
function arrayFunction ({ elements, methodName }) {
  return function (func) {
    return addTemplate([][methodName].call(elements, func))
  }
}

/*
 * Cycles through elements letting you edit elements
 */
function setFunction ({ elements }) {
  return function (func) {
    elements.forEach(func)
    return elements
  }
}

/*
 * Returns elements selected in func
 */
function getFunction ({ elements }) {
  return function (func) {
    return elements.map(element => func(element))
  }
}

/*
 * Selects an element by index and returns a qs templated array containing it
 */
function onlyFunction ({ elements }) {
  return function (index) {
    return addTemplate([elements[index]])
  }
}

/* 
 * Returns an array of names of all available events
 * Will always find a list of events, the second return value is for testing
 */
function getAllEvents () {
  const allEvents = Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))).filter(eventName =>
    !eventName.indexOf('on') && (document[eventName] == null || typeof document[eventName] == 'function')
  ).map(eventName => eventName.substr(2))
  return allEvents.length > 0 ? allEvents : ['click', 'mouseover']
}

/*
 * Takes arguments from a tagged template literal
 * If valid HTML element array submitted as first argument, return
 * Else If array entered as a substitution, and no literals, return substitution array
 * Else If return a query string to be used with document.querySelectorAll
 * If not valid, return null
 */
function createQuery (literals, substitutions) {
  if (Array.isArray(literals) && literals.every(isValidElement)) {
    return literals
  } else if (Array.isArray(literals) && Array.isArray(substitutions)) {
    if (literals.join() === '' && substitutions.every(isValidElement)) {
      return substitutions
    } else {
      return literals.map((literal, index) => {
        return (literal || '') + (substitutions[index] || '')
      }).join('') || null
    }
  } else if (typeof literals === 'string' || literals instanceof String) {
    return literals
  } else {
    return null
  }
}

/*
 *  Check if element is valid DOM element
 */
function isValidElement (element) {
  return element instanceof Element || element instanceof HTMLDocument
}