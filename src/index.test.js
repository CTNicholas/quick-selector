const qs = require('./index.js')

test('falsy/empty values entered', () => {
  const vals = [null, false, 0, -0, 0n, undefined, NaN, '', [], {}]
  vals.forEach(val => {
    expect(qs(val)).toBe(null)
    expect(qs`${val}`).toBe(null)
    vals.forEach(val2 => {
      expect(qs(val, val2)).toBe(null)
    })
  })
  expect(qs``).toBe(null)
})

test('no value entered', () => {
  expect(qs()).toBe(null)
  expect(qs).toBeInstanceOf(Function)
})

test('element not found on page', () => {
  document.body.innerHTML = '<div class="body-part"></div>'
  expect(qs('#body-part')).toBeInstanceOf(Array)
  expect(qs`#body-part`.length).toBe(0)
})

test('element found on page', () => {
  document.body.innerHTML = '<div class="body-part">Hello</div>'
  const bodyPart = qs`.body-part`
  expect(bodyPart).toBeInstanceOf(Array)
  expect(bodyPart[0]).toBeInstanceOf(HTMLElement)
  expect(bodyPart[0]).toBe(document.querySelector('.body-part'))
  expect(bodyPart[0]).not.toBe(document.querySelector('#body-part'))
})

test('set and get methods tested', () => {
  document.body.innerHTML = '<div class="body-part">Hello</div>'
  const bodyPart = qs`.body-part`
  expect(bodyPart[0].innerHTML).toBe('Hello')
  bodyPart.set(el => el.innerHTML = 'Hey now')
  expect(bodyPart[0].innerHTML).toBe('Hey now')
  expect(bodyPart.get(el => el.innerHTML)[0]).toBe('Hey now')
})

test('only method tested', () => {
  document.body.innerHTML = `
    <div class="body-part">apple is red</div>
    <div class="body-part">banana is yellow</div>
  `
  const bodyPart = qs`.body-part`.only(1)
  expect(bodyPart[0].innerHTML).toBe('banana is yellow')
})

test('filter method tested', () => {
  document.body.innerHTML = `
    <div class="body-part">apple is red</div>
    <div class="body-part">banana is yellow</div>
    <div class="body-part">cherry is red</div>
  `
  const bodyPart = qs`.body-part`
  expect(bodyPart.filter(el => el.innerHTML.includes('red')).length).toBe(2)
  expect(bodyPart.filter(el => el.innerHTML.includes('red'))[0].innerHTML).toBe('apple is red')
})

test('adding event listener and testing event', () => {
  document.body.innerHTML = `
    <div class="body-part">Hello</div>
    <img class="body-part" />
  `
  let testVal = false
  const els = qs`.body-part`.click(ev => {
    expect(els).toBeInstanceOf(Array)
    expect(els.length).toBe(2)
    testVal = true
  })
  clickEvent('.body-part', 'click')
  expect(testVal).toBe(true)
})

test('removing event listener', () => {
  document.body.innerHTML = '<div class="body-part">Hello</div>'
  let testVal = false
  const clickFunc = () => { console.log('clicked') }
  qs`.body-part`.click(clickFunc)
  qs`.body-part`.remove.click(clickFunc)
  clickEvent('.body-part', 'click')
  expect(testVal).toBe(false)
})

// create artificial event
function clickEvent (selector, event) {
  const bodyPart = document.querySelector(selector)
  const evObj = document.createEvent('Events')
  evObj.initEvent(event, true, false)
  bodyPart.dispatchEvent(evObj)
}
