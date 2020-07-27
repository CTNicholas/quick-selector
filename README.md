# Quick selector

Syntactic sugar for `querySelector`, `querySelectorAll`, & `addEventListener` allowing you to select, modify, and add event listeners for multiple elements in one line of code. All Javascript events are supported.

## Install

### Node

```shell
npm install query-selector
```

```javascript
import qs from 'query-selector'
// or
const qs = require('query-selector')
```

### Browser

``` html
<script src="https://unpkg.com/quick-selector@1.0.2/dist/qs.js"></script>
```

## Usage

### Selecting

Selecting `<div class="box">` element, use any CSS selectors:

```javascript
const boxes = qs`div.box`
```

### Events 

Adding and removing click event listener:

```javascript
const clickEvent = () => console.log('Clicked!')
qs`#custom-button`.click(clickEvent)
```

Removing event listener:

```javascript
qs`#custom-button`.remove.click(clickEvent)
```

### Filtering

Selecting only `div.box` elements with the `innerHTML` value of 'Apples':

```javascript
const filtered = qs`.subtitle`.filter(element => element.innerHTML === 'Apples')
```

Selecting only the first `.subtitle` element and adding a class  (`only()`'s argument corresponds to array index of query):

```javascript
qs`.subtitle`.only(0).set(p => p.classList.add = 'first-paragraph')
```
### Setting & getting

Setting text colour of elements to red:

```javascript
qs`p`.set(element => element.style.color  = 'red')
```

Getting an array containing the text content of each `<p>` element:

```javascript
const paragraphText = qs`p`.get(element => element.textContent)
```

### Modifying vanilla-selected elements

Adding a blur event to a list of elements selected with `querySelectorAll`:

```javascript
const elementList = document.querySelectorAll('input')
qs(elementList).blur(event => console.log(`${event.target} lost focus`))
```

## Comparison

### Selecting and adding two event listeners

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

### Selecting, filtering selection, adding event listener, setting text colour 

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

## API

### Query function

| Function   | Arguments                                                    | Returns                                                      |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| qs``, qs() | *String* or *Array*. Input a CSS selector text string, or an array of HTML elements | An array of HTML elements, with a special set of methods attached |

### Query function methods

| Method         | Arguments                                                    | Returns                                                     | Notes                                                        |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| .*eventName*() | *Function*. A function to be added to the event.             | The templated array it was called upon.                     | Every single event compatible with the user's browser will work. See Examples:  `.click`, `.mousedown`, `.blur`. |
| .remove        | *None*. Use in conjunction with an *eventName*() method.     | N/A                                                         | Use `.remove` before an *eventName*() function, with the original function as the argument. Example: `.remove.click(clickFunction)`. |
| .set()         | *Function*. Pass a function that will be applied to a `.forEach()` method, iterating through the object. | The templated array it was called upon.                     | More info on [.forEach() at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). |
| .get()         | *Function*. Pass a function that will be applied to a `.forEach()` method, iterating through the object. | A new array containing the return values from the function. | More info on [.forEach() at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). |
| .only()        | *Number*. Pass a positive integer, corresponding to the index of the item in the quick-select array. | A templated array containing only the selected element.     | `.only(0)` selects the first item on the page that matched the quick-select query. |

Note: All Array methods work, but the above methods all return a templated quick-select array (apart from `.get()`), and can be used with method chaining.