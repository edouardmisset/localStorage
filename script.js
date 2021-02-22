//----------
// Variables
//----------
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

//----------------
// Event Listeners
//----------------
itemsList.addEventListener('click', checkingItem);
addItems.addEventListener('submit', addItem);

//----------
// Functions
//----------
// Function to check and uncheck an item and make it persistant
function checkingItem(e) {
  if (!e.target.matches('input')) return; // Skips unless the target is an input
  const element = e.target;
  const index = element.dataset.index;
  items[index].checked = !items[index].checked;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

// Adding a new item
function addItem(e) {
  e.preventDefault(); // prevents page from reloading

  const item = {
    name: this.querySelector('[name=item]').value,
    checked: false,
  };

  // Add item to the list
  items.push(item);

  // Display the new item
  populateList(items, itemsList);

  // Add item to the local storage
  localStorage.setItem('items', JSON.stringify(items));

  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.checked ? 'checked' : ''
      } />
          <label for="item${i}">${plate.name}</label>
        </li>
      `;
    })
    .join('');
}

populateList(items, itemsList);
