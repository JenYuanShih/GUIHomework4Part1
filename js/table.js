/*
File: table.js
Purpose: Provide dynamic multiplicative table generation for index.html. Basing on the user input in html forms.
As well as providing real-time validation for user-input  
Author: Jen Yuan Shih (JenYuan_Shih@student.uml.edu)
Last Updated: 10/25/2021 3:48PM EST
*/

$(document).ready(function(){
    //validate the id for form
    var form = $("#tableForm");
    /**
     * validation the value used to generate the table, and only generate table
     * once all validation passes
     * rule includes: all input fields are required, values must be between -50 to 
     * 50, values enter must be an interger
     */
    form.validate({
        rules:{
            col_min: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            col_max: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            row_min: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            row_max: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages:{
            col_min: {
                required: "Missing Input Value",
                number: "Enter an Integer Value",
                range: "Enter an Integer From -50 to 50"
            },
            col_max: {
                required: "Missing Input Value",
                number: "Enter an Integer Value",
                range: "Enter an Integer From -50 to 50",
            },
            row_min: {
                required: "Missing Input Value",
                number: "Enter an Integer Value",
                range: "Enter an Integer From -50 to 50"
            },
            row_max: {
                required: "Missing Input Value",
                number: "Enter an Integer Value",
                range: "Enter an Integer from -50 to 50"
            }
        }
    });

    //generate table on submit if the validation passed
    $(document).on('submit', "#tableForm", function(){
        if(form.valid()){
            generateTable();
        }
        return false
    })
});


/**
 * generateTable function will read the input from the form when the 
 * submit button is clicked. Perform validation to see if the input by 
 * user is valid for multiplicative table generation. If valid, 
 * generate table. 
 */
 const generateTable = function(){

    let colMin = Number(document.getElementById('col_min').value);
    let colMax = Number(document.getElementById('col_max').value);
    let rowMin = Number(document.getElementById('row_min').value);
    let rowMax = Number(document.getElementById('row_max').value);
    var swapped = false;

    //Switching value between min and max if min value is greater than max value
    if(colMin > colMax){
        document.getElementById('col_min').value = (colMax);
        document.getElementById('col_max').value = (colMin);
        var temp = colMax;
        colMax = colMin;
        colMin = temp;
        swapped = true;
    }
    if(rowMin > rowMax){
        document.getElementById('row_min').value = (rowMax);
        document.getElementById('row_max').value = (rowMin);
        var temp2 = rowMax;
        rowMax = rowMin;
        rowMin = temp2;
        swapped = true;
    }
    if(swapped){
        document.getElementById("msg").innerHTML = ("Max < Min, Min and Max Swapped");
    }
    else{
        swapped
        document.getElementById("msg").innerHTML = ("");
    }
    

    document.getElementById("tableWrapper").innerHTML = ("");
    makeTable(colMin, colMax, rowMin, rowMax);
}

/**
 * Helper function to generate multiplicative table. Creating an HTML
 * table object size of ((c_max-c_min)*(r_max-r_min))
 * @param {*} c_min column minimum
 * @param {*} c_max column maximum
 * @param {*} r_min column minimum
 * @param {*} r_max column maximum
 * @returns HTMLTableSelectionElement that holds the dynamic 
 * multiplicative table 
 */
const makeTable = function(c_min, c_max, r_min, r_max){
    var tableDiv = document.getElementById("tableWrapper")
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    headRow.appendChild(document.createElement("td"));
    for(var hr = c_min; hr <= c_max; hr++){
        var headRowCell = document.createElement("td");
        headRowCell.classList.add("headerCell");
        headRowCell.appendChild(document.createTextNode(hr))
        headRow.appendChild(headRowCell);
    }
    tblBody.appendChild(headRow);
    for(var r = r_min; r <= r_max; r++){
        var row = document.createElement("tr");
        var headColCell = document.createElement("td");
        headColCell.appendChild(document.createTextNode(r));
        headColCell.classList.add("headerCell");
        row.appendChild(headColCell);
        for(var c = c_min; c<=c_max; c++){
            var cell = document.createElement("td");
            if(c%2==0 && r%2==0){
                cell.classList.add("greyCell");
            }
            else if((c%2==1 || c%2==-1) && (r%2==1 || r%2==-1)){
                cell.classList.add("greyCell");
            }
            var cellContent = document.createTextNode(r*c);

            cell.appendChild(cellContent);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tableDiv.appendChild(tbl);
}