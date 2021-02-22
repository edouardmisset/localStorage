//----------
// Variables
//----------
const addItems = document.querySelector('.add-items');
const submit = addItems.querySelector('#submit');
const itemsList = document.querySelector('.plates');
const items = [];

//----------------
// Event Listeners
//----------------
itemsList.addEventListener('click', checkingItem);
submit.addEventListener('submit', addItem);
window.addEventListener('load', retrieveLocalStorage);

//----------
// Functions
//----------
// Function to check and uncheck an item
function checkingItem(e) {
  if (e.target && e.target.nodeName == 'LI') {
    const checkbox = e.target.previousElementSibling;
    checkbox.checked = !checkbox.checked;
  }
}

// Adding a new item
function addItem(e) {
  e.preventDefault(); // prevents page from reloading

  const item = {
    name: this.previousElementSibling.value,
    checked: false,
  };

  // Add item to the list
  items.push(item);

  // Add item to the local storage
  const lastItem = items.length - 1;
  localStorage.setItem(lastItem, JSON.stringify(items[lastItem]));

  // Display the new item
  displayItem(item);

  this.reset();
}

function displayItem(item) {
  const newItem = document.createElement('LI');
  itemsList.appendChild(newItem);
  newItem.innerHTML = `
  <input type="checkbox" for="item" name="${item.name}" />
  <label>${item.name}</label> 
  `;
}

// Retrieve the locally stored data & remove the 'Loading Tapas'
function retrieveLocalStorage() {
  if (localStorage.length) {
    for (let index = 0; index < localStorage.length; index++) {
      items.push(JSON.parse(localStorage[index]));
    }
    // Display the list of item
    items.forEach((item) => displayItem(item));
  }
  itemsList.removeChild(document.querySelector('#loading'));
}
