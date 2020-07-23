const addTemplate = createTemplate()

module.exports = function (literals, ...substitutions) {
  const query = createQuery(literals, substitutions)
  const element = document.querySelectorAll(query)
  if (element === null) return null
  return addTemplate(element)
}

function eventFunction ({ element, event, func }) {
  element.addEventListener(event, func)
  return element
}

function createTemplate () {
  const events = getAllEvents()
  return function (element) {
    events.map(event => {
      element[event] = function (func) {
        return eventFunction({ element, event, func })
      }
    })
    return element
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
