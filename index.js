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
