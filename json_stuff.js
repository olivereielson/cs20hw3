<!--./index.js-->

let data;

function selection(){
    
    let val=document.getElementById("selector").value;
    if(val==="All"){
        makeTable(data.song);

    }else{
        let select= data.song.find(element => element.Artist===val);
        makeTable([select])
    }
  
} 


function makeTable(list){
    let text = "<table>"
    text += "<tr><td>Song Title</td><td>Artist</td><td>Release Date</td><td>Genre</td></tr>";

    for (let x in list) {
        text += "<tr><td>" + list[x].title + "</td><td>" + list[x].Artist + "</td><td>" + list[x].Released + "</td><td>" + list[x].Genre.toString() + "</td></tr>";
    }
    text += "</table>"
    document.getElementById("table").innerHTML = text;
}

function makeSelector(list){
    
    let text_select = "<select id='selector' onchange='selection()'>"
    text_select += "<option value='All'>All</option>";
   
    for (let x in list) {
        text_select += "<option value='"+list[x].Artist+"'>" + list[x].Artist+ "</option>";
    }

    text_select += "</select>"
    document.getElementById("table2").innerHTML = text_select;
}





fetch('./songs.json')
    .then((response) => response.json())
    .then(function (json) {
        data = json;
        document.getElementById("json_string").innerText = JSON.stringify(data);

        let list = data.song;
        makeSelector(list);
        makeTable(list);
       

    });

$(document).ready(function (){
   

    
});


