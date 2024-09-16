function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
window.onload = function () { 

    var response = httpGet('https://localhost:7262/api/ToDo');
    // var response = '[{"id":1,"toDo":"Wash a car"},{"id":3,"toDo":"Watch a movie"}]';
    var array1 = JSON.parse(response); 
    console.log(array1);
    const outputElement = document.getElementById('output');
    array1.forEach(item => {
    const listItem = document.createElement('div');
    listItem.innerText = `${item.toDo}`;
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
    });
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
    var response = httpPost('https://localhost:7262/api/ToDo', inputValue.value);
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