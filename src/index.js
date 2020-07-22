const addTemplate = createTemplate()

module.exports = function (literals, ...substitutions) {
  const query = createQuery(literals, substitutions)
  const element = document.querySelector(query)
  if (element === null) return null
  return addTemplate(element)
}

function createTemplate () {
  const events = getAllEvents()
  return function (element) {
    events.map(event => {
      element[event] = function (func) {
        element.addEventListener(event, func)
        return element
      }
    })
    return element
  }
}

function getAllEvents () {
  return Object.getOwnPropertyNames(document).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))).filter(function(i) {
    return !i.indexOf('on') && (document[i] == null || typeof document[i] == 'function')
  }).map(val => val.substr(2))
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
