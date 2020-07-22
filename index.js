simple export default function (literals, ...substitutions) {
  const query = createQuery(literals, substitutions)
  const el = document.querySelector(query)
  el.onclick = () => console.log('clicked')
  return el
}

function createQuery (literals, substitutions) {
  return literals.map((literal, index) => {
    return (literal || '') + (substitutions[index] || '')
  }).join()
}
