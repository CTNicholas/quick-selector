/*
 * Initialise events and template
 */
const addTemplate = initTemplate()

/*
 * Exports qs function
 * Creates new DOM query, and returns templated result
 * If element array passed, return templated result
 */
module.exports = function (literals, ...substitutions) {
  const query = createQuery(literals, substitutions)
  if (isInvalidQuery(query)) return null
  if (isArray(query)) {
    return addTemplate(query)
  } else {
    return newQuerySelector(query)
  }
}

/*
 * Gets elements with querySelectorAll and adds template
 * If no elements, return empty array
 */
function newQuerySelector(query) {
  const elements = Array.from(document.querySelectorAll(query))
  return elements.length > 0 ? addTemplate(elements) : []
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
function initTemplate () {
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
      element.addEventListener(event, func)
    })
    return elements
  }
}

/*
 * Removes event listener, returns elements
 */
function removeEventFunction ({ elements, event }) {
  return function (func) {
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
 * Works with JSDom for testing
 */
function getAllEvents () {
  const HTMLDocumentEvents = Object.getOwnPropertyNames(Object.getPrototypeOf(document)) || []
  const DocumentEvents = Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))) || []
  const allEventNames = HTMLDocumentEvents.concat(DocumentEvents).filter(eventName =>
    !eventName.indexOf('on') && (document[eventName] == null || typeof document[eventName] == 'function')
  ).map(eventName => eventName.substr(2))
  return allEventNames.length > 0 ? allEventNames : []
}

/*
 * Takes arguments from a tagged template literal
 * If valid HTML element array submitted as first argument, return
 * Else If array entered as a substitution, and no literals, return substitution array
 * Else If return a query string to be used with document.querySelectorAll
 * If not valid, return null
 */
function createQuery (literals, substitutions) {
  if (isArray(literals) && isElement(...literals)) {
    return literals
  } else if (isArray(literals, substitutions)) {
    if (literals.join() === '' && isElement(...substitutions)) {
      return substitutions
    } else {
      return combineTemplateArrays(literals, substitutions) || null
    }
  } else if (isString(literals)) {
    return literals
  } else {
    return null
  }
}

/*
 * Combines two arrays into one string, one index at a time
 * If undefined, uses an empty string
 */ 
function combineTemplateArrays(literals, substitutions) {
  return literals.map((literal, index) => {
    return (literal || '') + (substitutions[index] || '')
  }).join('')
}

/*
 * Check if arguments are valid DOM elements
 */
function isElement (...args) {
  return args.every(arg => arg instanceof Element || arg instanceof HTMLDocument )
}

/* 
 * Check if arguments are valid arrays
*/
function isArray (...args) {
  return args.every(arg => Array.isArray(arg))
}

/* 
 * Check if arguments are valid strings
*/
function isString (...args) {
  return args.every(arg => typeof arg === 'string' || arg instanceof String)
}

/*
 * Checks if valid query
 */
function isInvalidQuery(query) {
  return !query || query.length === 0 || query === '[object Object]'
}
