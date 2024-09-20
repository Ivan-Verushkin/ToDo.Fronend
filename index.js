const url = 'https://localhost:7262/api/ToDo';

window.onload = async function () {
    try {
        const response = await httpGet(url);
        const todos = JSON.parse(response);
        console.log(todos);
        const outputElement = document.getElementById('output');
        todos.forEach(item => {
            addToDoItem(outputElement, item.toDo, item.id);
        });
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

function addToDoItem(outputElement, text, id) {
    const listItem = document.createElement('div');
    listItem.innerText = text;
    listItem.classList.add('todo-item');
    outputElement.appendChild(listItem);
    
    AddUpdateDeleteButtons(outputElement, listItem, text, id);
}

function AddUpdateDeleteButtons(outputElement, listItem, text, id) {
    const inputElement = document.createElement('div');
    inputElement.classList.add('button-container');

    // Update Button with PUT logic
    const updateButton = createButton('Update', 'button-update', () => {
        const updatedToDo = prompt('Update the task:', text); // Prompt user for updated task

        if (updatedToDo) {
            const updatedItem = { id, toDo: updatedToDo }; // Create updated item object
            httpPut(`${url}/${id}`, updatedItem) // Call PUT with the new data
                .then(response => {
                    console.log('Item updated successfully:', response);
                    listItem.innerText = updatedToDo; // Update the UI directly
                })
                .catch(error => console.error('Error updating todo:', error));
        }
    });

    inputElement.appendChild(updateButton);

    // Delete Button with DELETE logic
    const deleteButton = createButton('Delete', 'button-delete', () => {
        httpDelete(url, id)
            .then(response => {
                console.log('Item deleted successfully:', response);
                listItem.remove(); // Remove the item from the UI
                inputElement.remove(); // Remove the buttons from the UI
            })
            .catch(error => console.error('Error deleting todo:', error));
    });

    inputElement.appendChild(deleteButton);
    outputElement.appendChild(inputElement);
}

function createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add(className);
    button.onclick = onClick;
    return button;
}

async function AddNewToDo() {
    const inputValue = document.getElementById('AddToDo').value;
    if (!inputValue) return;

    const outputElement = document.getElementById('output');
    try {
        const response = await httpPost(url, { toDo: inputValue });
        const newTodo = JSON.parse(response);
        const newId = newTodo.id;

        addToDoItem(outputElement, inputValue, newId);
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Fetch request functions

async function httpGet(theUrl) {
    const response = await fetch(theUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.text();
}

async function httpPost(theUrl, input) {
    const response = await fetch(theUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.text();
}

async function httpPut(theUrl, input) {
    const response = await fetch(theUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.text();
}

async function httpDelete(theUrl, id) {
    const response = await fetch(`${theUrl}/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.text();
}
