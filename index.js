// global variables
var array_storage = document.getElementById("array");
var sort_algo = "";
var sort_size = 30;
var bar_width = 20;
var sort_time = 0;

/* disable buttons once sort starts */
function disable_buttons() {
    // disable buttons
    document.getElementsByClassName('sort-btn')[0].style.display = "none";
    document.getElementsByClassName('reset-btn')[0].style.display = "none";
    document.getElementsByClassName('algorithm-btn')[0].style.display = "none";
    document.getElementsByClassName('htmlCss-sub-menu')[0].style.display = "none";

    // disable submenu buttons
    document.getElementById("f1").disabled = true;
    document.getElementById("f2").disabled = true;
    document.getElementById("f3").disabled = true;
    document.getElementById("f4").disabled = true;
}

/* enable buttons once sort ends */
function enable_buttons() {
    // enable buttons
    document.getElementsByClassName('sort-btn')[0].style.display = "";
    document.getElementsByClassName('reset-btn')[0].style.display = "";
    document.getElementsByClassName('algorithm-btn')[0].style.display = "";
    document.getElementsByClassName('htmlCss-sub-menu')[0].style.display = "";

    document.getElementById("f1").disabled = false;
    document.getElementById("f2").disabled = false;
    document.getElementById("f3").disabled = false;
    document.getElementById("f4").disabled = false;
}

/* Adds a single block */
function add_block(index) {
    var value = Math.ceil(Math.random() * 100); // get random bar size    
    var element = document.createElement("div");
    element.classList.add("block");

    // set the bar's height and width
    element.style.height = `${value * 5}px`;
    element.style.transform = `translate(${index * bar_width}px)`;

    // add a number to the bar to determine the sorting order
    var element_value = document.createElement("label");
    element_value.classList.add("block_id");
    element_value.innerText = value;

    element.appendChild(element_value);
    array_storage.appendChild(element);
}

/* Create blocks */
function generate_array() {
    // reset time
    document.getElementById("algo-type").innerHTML = sort_algo;

    // add new blocks
    for (var i = 0; i < sort_size; i++) {
        add_block(i);
    }
}

/* Resizes the blocks */
function resize_array() {
    // create new array array_storage
    let outter_div = document.getElementsByClassName('content')[0];
    let new_array_storage = document.createElement("div");
    new_array_storage.setAttribute("id", "array");
    outter_div.appendChild(new_array_storage);

    // remove old array array_storage & set global var
    document.getElementById("array").remove();
    array_storage = new_array_storage;

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
        // switch style
        var temp_style = block_1.style.transform;
        block_1.style.transform = block_2.style.transform;
        block_2.style.transform = temp_style;

        // wait 
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                array_storage.insertBefore(block_2, block_1);
                resolve();
            }, 50);
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
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
  
            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
  
            // Compare two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
  
            // Revert comparison block color
            blocks[j].style.backgroundColor = "#3e8da8";
            blocks[j + 1].style.backgroundColor = "#3e8da8";
        }
  
        // Change blocks to complete stlye-color (green)
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
}

/* Insertion Sort */
// space: O(1), worst-case--time: O(n^2) -> best: O(n)
async function insertion_sort() {
    var blocks = document.querySelectorAll(".block");

    for (var i = 1; i < blocks.length; i++) {
       
        var j = i - 1; // (1) previous item
        var current = parseInt(blocks[i].childNodes[0].innerHTML);
        var height = blocks[i].style.height;

        blocks[i].style.backgroundColor = "#ff0000";

        // wait
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 75)
        );

        // (2)
        while (j >= 0 && parseInt(blocks[j].childNodes[0].innerHTML) > current) {
        
            blocks[j].style.backgroundColor = "#ff0000";
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            j = j - 1;
        
            // wait
            await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, 75)
            );
              
            // Provide lightgreen color to the sorted part
            for(var k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = "#13CE66";
            }
        }
        
        // (3) Placing the selected element to its correct position
        blocks[j + 1].style.height = height;
        blocks[j + 1].childNodes[0].innerHTML = current;  
    }
}

/* Heap Helper Function */
async function heapify(n, i) {
    var blocks = document.querySelectorAll(".block");
    
    var largest = i; 
    var left = 2 * i + 1; 
    var right = 2 * i + 2; 

    if (left < n && Number(blocks[left].childNodes[0].innerHTML) > Number(blocks[largest].childNodes[0].innerHTML))
        largest = left;

    if (right < n && Number(blocks[right].childNodes[0].innerHTML) > Number(blocks[largest].childNodes[0].innerHTML))
        largest = right;
 
    if (largest != i) {
        
        var temp1 = blocks[i].style.height;
        var temp2 = blocks[i].childNodes[0].innerText;
        blocks[i].style.height = blocks[largest].style.height;
        blocks[largest].style.height = temp1;
        blocks[i].childNodes[0].innerText = blocks[largest].childNodes[0].innerText;
        blocks[largest].childNodes[0].innerText = temp2;
        blocks[largest].style.backgroundColor = "#FF4949";
    
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 65)
        );
    
        await heapify(n, largest);
    }
}

/* Heap Sort */
// space: O(1), time complexity: O(nlog(n))
async function heap_sort() {
    var blocks = document.querySelectorAll(".block");
    let n = blocks.length;

    for (var i = n / 2 - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (var i = n - 1; i > 0; i--) {
        
        var temp1 = blocks[i].style.height;
        var temp2 = blocks[i].childNodes[0].innerText;
        blocks[i].style.height = blocks[0].style.height;
        blocks[0].style.height = temp1;
        blocks[i].childNodes[0].innerText = blocks[0].childNodes[0].innerText;
        blocks[i].style.backgroundColor = "#13CE66";
        blocks[0].childNodes[0].innerText = temp2;
    
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 50)
        );
    
        await heapify(i, 0);
    }

    blocks[0].style.backgroundColor = "#13CE66";
}

/* Quick Sort Helper function */
// get dividing point between left and right side
async function quick_partition(left, right) {
    var blocks = document.querySelectorAll(".block");
  
    var pivot = Number(blocks[right].childNodes[0].innerHTML);
    var i = left - 1;
    blocks[right].style.backgroundColor = "#3e8da8";
  
    for (var j = left; j <= right - 1; j++) {    
        await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 35)
        );

        var value = Number(blocks[j].childNodes[0].innerHTML);
        if (value < pivot) {
            i++;
           
            var temp1 = blocks[i].style.height;
            var temp2 = blocks[i].childNodes[0].innerText;
            blocks[i].style.height = blocks[j].style.height;
            blocks[j].style.height = temp1;
            blocks[i].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            blocks[j].childNodes[0].innerText = temp2;
            blocks[i].style.backgroundColor = "#13CE66";
           
            if (i != j) {
                blocks[j].style.backgroundColor = "#ff0000";
            }
            
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 20)
            );
        } 
    }

    i++;
    var temp1 = blocks[i].style.height;
    var temp2 = blocks[i].childNodes[0].innerText;
    blocks[i].style.height = blocks[right].style.height;
    blocks[right].style.height = temp1;
    blocks[i].childNodes[0].innerText = blocks[right].childNodes[0].innerText;
    blocks[right].childNodes[0].innerText = temp2;

    // wait to see style changes
    await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 20)
    );

    // change styling to complete
    for (var k = 0; k < 20; k++) {
        blocks[k].style.backgroundColor = "#13CE66";
    } 

    return i;
}

/* Quick Sort */
// space: O(1) runtime: O(nlog(n))
async function quick_sort(left, right) {
    var blocks = document.querySelectorAll(".block");
    if (left < right) {
        // partition then sort on left and right sides
        var piv = await quick_partition(left, right);
        await quick_sort(left, piv - 1);
        await quick_sort(piv + 1, right);
    }

    // change styling of blocks to complete
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#13CE66";
    } 
}

/* Changes the sort algorithm */
function choose_algorithm(algorithm) {
    sort_algo = algorithm;
    
    if (sort_algo == "Bubble Sort")
        document.getElementById("algo-type").text = "Bubble Sort";
        
    if (sort_algo == "Insertion Sort") 
        document.getElementById("algo-type").text = "Insertion Sort";
        
    if (sort_algo == "Heap Sort") 
        document.getElementById("algo-type").text = "Heap Sort";

    if (sort_algo == "Quick Sort")
        document.getElementById("algo-type").text = "Quick Sort";;

}

/* Changes the array size */
function choose_size(size) {
    sort_size = size;
    resize_array();
}

/* start visualization */
async function visualize() {
    disable_buttons();

    if (sort_algo == "Bubble Sort") {
        var begin = Date.now();
        await bubble_sort();
        var end = Date.now();
        var time = (end - begin)/1000 + " seconds";
        let final_time = ": " + time;
        document.getElementById("algo-type").innerHTML += final_time;
    }
                
    if (sort_algo == "Insertion Sort") {
        var begin = Date.now();
        await insertion_sort();
        var end = Date.now();
        var time = (end - begin)/1000 + " seconds";
        let final_time = ": " + time;
        document.getElementById("algo-type").innerHTML += final_time;
    }
        
        
    if (sort_algo == "Heap Sort") {
        var begin = Date.now();
        await heap_sort();
        var end = Date.now();
        var time = (end - begin)/1000 + " seconds";
        let final_time = ": " + time;
        document.getElementById("algo-type").innerHTML += final_time;
    }

    if (sort_algo == "Quick Sort") {
        let r =  document.querySelectorAll(".block").length-1;
        var begin = Date.now();
        await quick_sort(0, r);
        var end = Date.now();
        var time = (end - begin)/1000 + " seconds";
        let final_time = ": " + time;
        document.getElementById("algo-type").innerHTML += final_time;
    }

    enable_buttons();
}

/* refresh page */
function refresh() {
    location.reload();
}

// generate initial array
generate_array();
