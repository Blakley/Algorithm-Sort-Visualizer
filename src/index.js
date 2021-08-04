// global variables
var element_storage = document.getElementById("array");
var sort_algo = ""; // choosen algorthim
var sort_size = 30; // amount of elements to sort
var bar_width = 20;
var sort_time = 0; // elapsed time after sorting

/* disable buttons once the sorting starts */
function disable_buttons() {
    // disable nav-buttons
    document.getElementsByClassName('sort-btn')[0].style.display = "none";
    document.getElementsByClassName('reset-btn')[0].style.display = "none";
    document.getElementsByClassName('algorithm-btn')[0].style.display = "none";
    document.getElementsByClassName('htmlCss-sub-menu')[0].style.display = "none";

    // disable radio buttons
    document.getElementById("f1").disabled = true;
    document.getElementById("f2").disabled = true;
    document.getElementById("f3").disabled = true;
    document.getElementById("f4").disabled = true;
}

/* enable buttons once the sorting ends */
function enable_buttons() {
    // enable nav-buttons
    document.getElementsByClassName('reset-btn')[0].style.display = "";
    document.getElementsByClassName('algorithm-btn')[0].style.display = "";
    document.getElementsByClassName('htmlCss-sub-menu')[0].style.display = "";

    // enable radio buttons
    document.getElementById("f1").disabled = false;
    document.getElementById("f2").disabled = false;
    document.getElementById("f3").disabled = false;
    document.getElementById("f4").disabled = false;
}

/* Adds a single element */
function add_block(index) {
    var size = Math.ceil(Math.random() * 100); // calculate random bar size    
    var element = document.createElement("div");
    element.classList.add("block");

    // set the bar's height and width
    element.style.height = `${size * 5}px`;
    element.style.transform = `translate(${index * bar_width}px)`;

    // store an size-identifier for the specific element
    let value = document.createElement("label");
    value.classList.add("block_id");
    value.innerText = size;

    element.appendChild(value);
    element_storage.appendChild(element);
}

/* Create new elements */
function generate_array() {
    document.getElementById("algo-type").innerHTML = sort_algo;
    for (var i = 0; i < sort_size; i++)
        add_block(i); // add new blocks
}

/* Resizes the elements */
function resize_array() {
    // enable sort button
    document.getElementsByClassName('sort-btn')[0].style.display = "";

    // create new array element_storage
    let outter_div = document.getElementsByClassName('content')[0];
    let new_element_storage = document.createElement("div");
    new_element_storage.setAttribute("id", "array");
    outter_div.appendChild(new_element_storage);

    // remove old array element_storage & set global var
    document.getElementById("array").remove();
    element_storage = new_element_storage;

    // adjust array position & bar-size
    if (sort_size == 10) {
        outter_div.style.width = '200px';
        bar_width = 20;
    }

    if (sort_size == 30) {
        outter_div.style.width = '600px';
        bar_width = 20;
    }

    if (sort_size == 50) {
        outter_div.style.width = '1000px';
        bar_width = 20;
    }

    if (sort_size == 100) {
        outter_div.style.width = '1700px';
        bar_width = 17;
    }
        
    generate_array();
}

/* Swap two blocks (bubble_sort) */
function swap(block_1, block_2) {
    //
    return new Promise((resolve) => {
        // swap the element's style
        var temp_style = block_1.style.transform;
        block_1.style.transform = block_2.style.transform;
        block_2.style.transform = temp_style;

        window.requestAnimationFrame(function() {
            setTimeout(() => {
                // swap the two elements
                element_storage.insertBefore(block_2, block_1);
                resolve();
            }, 30);
        });
    });
}

/* Bubble Sort */
// space: O(1), worst-case--time: O(n^2) -> best: O(n) 
async function bubble_sort() {
    var blocks = document.querySelectorAll(".block");

    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
  
            // Change comparison block color
            blocks[j].style.backgroundColor = "#88898a";
            blocks[j + 1].style.backgroundColor = "#88898a";
  
            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
  
            // Compare two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]); // swap
                blocks = document.querySelectorAll(".block");
            }
  
            // Revert comparison block color
            blocks[j].style.backgroundColor = "#4c4d4e";
            blocks[j + 1].style.backgroundColor = "#4c4d4e";
        }
  
        // Change blocks to complete stlye-color
        blocks[blocks.length - i - 1].style.backgroundColor = "#88898a";
    }
}

/* Insertion Sort */
// space: O(1), worst-case--time: O(n^2) -> best: O(n)
async function insertion_sort() {
    var blocks = document.querySelectorAll(".block");

    // for every element, insert it in the correct position
    for (var i = 1; i < blocks.length; i++) {
       
        var j = i - 1; // (1) previous element reference
        var current = parseInt(blocks[i].childNodes[0].innerHTML);
        var height = blocks[i].style.height;

        blocks[i].style.backgroundColor = "#4c4d4e";

        // wait
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 75)
        );

        // (2) while Previous Element > Current Element
        while (j >= 0 && parseInt(blocks[j].childNodes[0].innerHTML) > current) {
        
            blocks[j].style.backgroundColor = "#4c4d4e";
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            j = j - 1;
        
            // wait
            await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, 75)
            );
              
            // apply sorted color-style to elements
            for(var k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = "#88898a";
            }
        }
        
        // (3) Placing the selected element to its correct position
        blocks[j + 1].style.height = height;
        blocks[j + 1].childNodes[0].innerHTML = current;  
    }
}

/* Changes the sort algorithm */
function choose_algorithm(algorithm) {
    sort_algo = algorithm;
    
    if (sort_algo == "Bubble Sort")
        document.getElementById("algo-type").text = "Bubble Sort";
    else    
        document.getElementById("algo-type").text = "Insertion Sort";
}

/* Changes the amount of elements to sort */
function choose_size(size) {
    sort_size = size;
    resize_array();
}

/* start visualization */
async function visualize() {
    disable_buttons();

    if (sort_algo == "Bubble Sort") {
        // begin sort-time calculation
        var begin = Date.now();
        await bubble_sort(); // sort function
        var end = Date.now();
        var time = (end - begin)/1000 + " seconds";
        let final_time = ": " + time;
        document.getElementById("algo-type").innerHTML += final_time;
    } 
    else  { // Insertion Sort
        // begin sort-time calculation
        var begin = Date.now();
        await insertion_sort(); // sort function
        var end = Date.now();
        var time = (end - begin)/1000 + " seconds";
        let final_time = ": " + time;
        document.getElementById("algo-type").innerHTML += final_time;
    }

    enable_buttons();
}

// generate initial array
generate_array();
