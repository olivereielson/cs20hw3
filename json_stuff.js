//json data
let data;
let genre = [];

//function that searches through the JSON for selected Val
function selection() {
    //get the val from the doc.
    let val = document.getElementById("selector").value;
    //fix symbole issues
    val= val.replaceAll("&","&amp;");

    //if the vall is all show the entire table
    if (val === "All") {
        makeTable(data.song);

    } else {
        //else show the genre
        let select = [];
        for (let x in data.song) {
            console.log(val);
            console.log(data.song[x]);
            if (data.song[x].Genre.includes(val)) {
                //store the JSON as a list of strings.... I am sure there is a better way to do this but it works and
                // I have to much work to make a more elegant solution. 
                select.push(JSON.stringify(data.song[x]));
            }
        }
        makeSelectTable(select)
    }

}


//make table with filtered data
function makeSelectTable(list) {
    let text = "<table>"
    //add the column headers
    text += "<tr><td>Song Title</td><td>Artist</td><td>Release Date</td><td>Genre</td></tr>";
    for (let x in list) {
        //parse the JSON
        let temp = JSON.parse(list[x]);
        text += "<tr><td>" + temp.title + "</td><td>" + temp.Artist + "</td><td>" + temp.Released + "</td><td>" + temp.Genre + "</td></tr>";
    }
    text += "</table>"
    //add table to doc
    document.getElementById("table").innerHTML = text;
}

//Function to make a table
function makeTable(list) {
    let text = "<table>"
    //add the column headers
    text += "<tr><td>Song Title</td><td>Artist</td><td>Release Date</td><td>Genre</td></tr>";
    //add the column vals
    for (let x in list) {
        text += "<tr><td>" + list[x].title + "</td><td>" + list[x].Artist + "</td><td>" + list[x].Released + "</td><td>" + "list[x].Genre" + "</td></tr>";
    }
    text += "</table>"
    //add table to doc
    document.getElementById("table").innerHTML = text;
}

//function to make selectors
function makeSelector(list) {

    let text_select = "<select id='selector' onchange='selection()'>"
    //add the 'All' option
    text_select += "<option value='All'>All</option>";
    //add genres
    for (let x in list) {
        for (let y in list[x].Genre) {

            if (!genre.includes(list[x].Genre[y])) {
                genre.push(list[x].Genre[y]);
                text_select += "<option value='" + list[x].Genre[y] + "'>" + list[x].Genre[y] + "</option>";
            }


        }
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


