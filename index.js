const url = 'https://localhost:7262/api/ToDo';

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
window.onload = function () { 

    var response = httpGet(url);
    // var response = '[{"id":1,"toDo":"Wash a car"},{"id":3,"toDo":"Watch a movie"}]';
    var array1 = JSON.parse(response); 
    console.log(array1);
    const outputElement = document.getElementById('output');
    array1.forEach(item => {
    const listItem = document.createElement('div');
    listItem.innerText = `${item.toDo}`;
    listItem.style.border = "1px solid black";
    listItem.style.marginTop = "60px"; 
    listItem.style.paddingTop = "30px"; 
    listItem.style.paddingBottom = "30px"; 
    listItem.style.color = "white";
    listItem.style.backgroundColor = "rgb(56, 175, 56)";
    listItem.style.width = "600px";
    listItem.style.textAlign ="center";
    outputElement.appendChild(listItem);
    AddUpdateDeleteButtons(outputElement, item.id);
    });
}
function AddUpdateDeleteButtons(outputElement, id){
    const inputElement = document.createElement('div');
    inputElement.style.width = "600px";
    inputElement.style.height = "50px";
    const updateButton = document.createElement('button');
    updateButton.innerText = 'Update';
    updateButton.style.width = "300px";
    updateButton.style.height = "50px";
    updateButton.style.backgroundColor = 'rgb(150, 146, 250)';
    updateButton.style.color = "white";
    inputElement.appendChild(updateButton);
    const deleteButton = document.createElement('button');
    deleteButton.onclick = function(){ httpDelete(url, id)};
    deleteButton.innerText = 'Delete';
    deleteButton.style.width = "300px";
    deleteButton.style.height = "50px";
    deleteButton.style.backgroundColor = 'rgb(255, 90, 90)';
    deleteButton.style.color = "white";
    inputElement.appendChild(deleteButton);
    outputElement.appendChild(inputElement);
}
function AddNewToDo()
{
    const inputValue = document.getElementById('AddToDo');
    if(inputValue.value === null){
        return;
    }
    const outputElement = document.getElementById('output');
    const listItem = document.createElement('div');
    listItem.innerText = inputValue.value;
    listItem.style.border = "1px solid black";
    listItem.style.marginTop = "30px"; 
    listItem.style.marginBottom = "30px"; 
    listItem.style.paddingTop = "30px"; 
    listItem.style.paddingBottom = "30px"; 
    listItem.style.color = "white";
    listItem.style.backgroundColor = "rgb(56, 175, 56)";
    listItem.style.width = "600px";
    listItem.style.textAlign ="center";
    outputElement.appendChild(listItem);
    var response = httpPost(url, inputValue.value);
    const array2 = JSON.parse(response);
    var position = array2[array2.length-1].id;
    AddUpdateDeleteButtons(outputElement, position);
    console.log(response);
}

function httpPost(theUrl, input)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json"); // Set Content-Type to JSON
    
    // Convert input object to JSON string
    var jsonInput = JSON.stringify(input);
    xmlHttp.send( jsonInput);
    return xmlHttp.responseText;
}

function httpPut(theUrl, input)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json"); // Set Content-Type to JSON
    
    // Convert input object to JSON string
    var jsonInput = JSON.stringify(input);
    xmlHttp.send( jsonInput);
    return xmlHttp.responseText;
}

function httpDelete(theUrl, id)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", theUrl + "/" + id, false ); // false for synchronous request
    xmlHttp.send( null );
    location.reload();
    return xmlHttp.responseText;
}