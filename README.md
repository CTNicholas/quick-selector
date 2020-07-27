# Quick selector

Syntactic sugar for querySelector, querySelectorAll, & addEventListener allowing you to select, modify, and add event listeners for multiple elements in one line of code. All Javascript events are supported.

## Install

Node:

```shell
npm install query-selector
```

```javascript
import qs from 'query-selector'
// or
const qs = require('query-selector')
```

Browser:

`<script src="https://unpkg.com/quick-selector@1.0.0/dist/qs.js"></script>`

Examples

```javascript
// Quick selector
qs`input.email`.input(ev => console.log(ev.target.value)).click(ev => ev.target.value = '')

// Vanilla JS
const emailInput = document.querySelectorAll('input.email')
for (const input of emailInput) {
  input.addEventListener('input', ev => {
    console.log(ev.target.value)
  })
  input.addEventListener('click', ev => {
    ev.target.value = ''
  })
}
```

```javascript
const clickFunc = () => console.log("I've been clicked")

// Quick selector
qs`p.text`.filter(el => el.innerHTML.startsWith('Hello')).click(clickFunc).set(el => el.style.color = 'red')

// Vanilla
const textBox = document.querySelectorAll('p.text')
for (const box of textBox) {
  if (box.innerHTML.startsWith('Hello')) {
    box.addEventListener('click', clickFunc)
    box.style.color = 'red'
  }
}
```

## Usage

Selecting `<div class="box">` element, use any CSS selectors:

```javascript
const boxes = qs`div.box`
```

Adding and removing click event listener:

```javascript
const clickEvent = () => console.log('Clicked!')
qs`div.box`.click(clickEvent)
```

Removing event listener:

```javascript
qs`div.box`.remove.click(clickEvent)
```

Selecting only `div.box` elements with the innerHTML value of 'Apples':

```javascript
const filtered = qs`.subtitle`.filter(element => element.innerHTML === 'Apples')
```

Setting text colour of these elements to red:

```javascript
filtered.set(element => element.style.color  = 'red')
```

Getting an array containing the text content of each `<p>` element:

```javascript
const paragraphText = qs`p`.get(element => element.textContent)
```

Selecting only the first element (use any index as an argument), and adding a class:

```javascript
qs`p`.only(0).set(p => p.classList.add = 'first-paragraph')
```
