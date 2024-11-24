// Selecionando elementos do DOM
const itemInput = document.getElementById('item-input');
const addItemBtn = document.getElementById('add-item-btn');
const itemsList = document.getElementById('items-list');
const clearListBtn = document.getElementById('clear-list-btn');

// carregar os itens do LocalStorage
function loadItems() {
    const items = JSON.parse(localStorage.getItem('recipeItems')) || [];
    items.forEach(addItemToList);
}

// Fadicionar um item na lista e no LocalStorage
function addItemToList(itemText) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = itemText;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-danger btn-sm';
    removeBtn.textContent = 'Remover';
    removeBtn.onclick = () => {
        li.remove();
        removeItemFromLocalStorage(itemText);
    };

    li.appendChild(removeBtn);
    itemsList.appendChild(li);
}

//salvar um item no LocalStorage
function saveItemToLocalStorage(itemText) {
    const items = JSON.parse(localStorage.getItem('recipeItems')) || [];
    items.push(itemText);
    localStorage.setItem('recipeItems', JSON.stringify(items));
}

// remover um item do LocalStorage
function removeItemFromLocalStorage(itemText) {
    const items = JSON.parse(localStorage.getItem('recipeItems')) || [];
    const filteredItems = items.filter(item => item !== itemText);
    localStorage.setItem('recipeItems', JSON.stringify(filteredItems));
}

// adicionar item
addItemBtn.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText) {
        addItemToList(itemText);
        saveItemToLocalStorage(itemText);
        itemInput.value = '';
    }
});

// limpar lista
clearListBtn.addEventListener('click', () => {
    itemsList.innerHTML = '';
    localStorage.removeItem('recipeItems');
});

// Carregar os itens ao iniciar
loadItems();
