//json data
let data;

//function that searches through the JSON for selected Val
function selection(){
    //get the val from the doc.
    let val=document.getElementById("selector").value;
    //if the vall is all show the entire table
    if(val==="All"){
        makeTable(data.song);

    }else{
        //else show the artist
        let select= data.song.find(element => element.Artist===val);
        makeTable([select])
    }
  
} 

//Function to make a table
function makeTable(list){
    let text = "<table>"
    //add the column headers
    text += "<tr><td>Song Title</td><td>Artist</td><td>Release Date</td><td>Genre</td></tr>";
    //add the column vals
    for (let x in list) {
        text += "<tr><td>" + list[x].title + "</td><td>" + list[x].Artist + "</td><td>" + list[x].Released + "</td><td>" + list[x].Genre.toString() + "</td></tr>";
    }
    text += "</table>"
    //add table to doc
    document.getElementById("table").innerHTML = text;
}
//function to make selectors
function makeSelector(list){
    
    let text_select = "<select id='selector' onchange='selection()'>"
    //add the 'All' option
    text_select += "<option value='All'>All</option>";
    //add artists
    for (let x in list) {
        text_select += "<option value='"+list[x].Artist+"'>" + list[x].Artist+ "</option>";
    }

    text_select += "</select>"
    //add to doc
    document.getElementById("table2").innerHTML = text_select;
}




//fetch the json text
fetch('./songs.json')
    .then((response) => response.json())
    .then(function (json) {
        //it is important to do this code in here because fetch is async and this code can only be
        //run after the file has been retrieved
        data = json;
        //add json string to doc
        document.getElementById("json_string").innerText = JSON.stringify(data);

        //make selectors and table
        let list = data.song;
        makeSelector(list);
        makeTable(list);
       

    });


