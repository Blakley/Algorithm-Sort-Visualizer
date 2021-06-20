var container = document.getElementById("array");
var sort_algo = "";
var sort_size = 50;
var bar_width = 20;

/* disable buttons once sort starts */
function disable_buttons() {
    // disable buttons
    document.getElementsByClassName('sort-btn')[0].style.display = "none";
    document.getElementsByClassName('algorithm-btn')[0].style.display = "none";

    document.getElementById("f1").disabled = true;
    document.getElementById("f2").disabled = true;
    document.getElementById("f3").disabled = true;
    document.getElementById("f4").disabled = true;
}

/* enable buttons once sort ends */
function enable_buttons() {
    // enable buttons
    document.getElementsByClassName('sort-btn')[0].style.display = "";
    document.getElementsByClassName('algorithm-btn')[0].style.display = "";

    document.getElementById("f1").disabled = false;
    document.getElementById("f2").disabled = false;
    document.getElementById("f3").disabled = false;
    document.getElementById("f4").disabled = false;
}

/* Adds a single block */
function add_block(index) {
    var value = Math.ceil(Math.random() * 100);
        
    var element = document.createElement("div");
    element.classList.add("block");
    element.style.height = `${value * 5}px`;
    element.style.transform = `translate(${index * bar_width}px)`;

    var element_value = document.createElement("label");
    element_value.classList.add("block_id");
    element_value.innerText = value;

    element.appendChild(element_value);
    container.appendChild(element);
}

/* Create blocks */
function generate_array() {
    // add new blocks
    for (var i = 0; i < sort_size; i++) {
        add_block(i);
    }
}

/* Resizes the blocks */
function resize_array() {
    // create new array container
    let outter_div = document.getElementsByClassName('content')[0];
    let new_container = document.createElement("div");
    new_container.setAttribute("id", "array");
    outter_div.appendChild(new_container);

    // remove old array container & set global var
    document.getElementById("array").remove();
    container = new_container;

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

/* Swap two blocks */
function swap(element_1, element_2) {
    //
    return new Promise((resolve) => {
        // switch style
        var temp_style = element_1.style.transform;
        element_1.style.transform = element_2.style.transform;
        element_2.style.transform = temp_style;

        // wait 
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                container.insertBefore(element_2, element_1);
                resolve();
            }, 50);
        });
    });
}

/* Bubble Sort */
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
async function insertion_sort() {
    var blocks = document.querySelectorAll(".block");

    for (var i = 1; i < blocks.length; i += 1) {
       
        var j = i - 1;
        var key = parseInt(blocks[i].childNodes[0].innerHTML);
        var height = blocks[i].style.height;

        while (j >= 0 && parseInt(blocks[j].childNodes[0].innerHTML) > key) {
        
            blocks[j].style.backgroundColor = "#FF4949";
              
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            j = j - 1;
        
            // wait
            await new Promise((resolve) =>
              setTimeout(() => {
                resolve();
              }, 100)
            );
              
            // Provide lightgreen color to the sorted part
            for(var k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = "#13CE66";
            }
        }
        
        // Placing the selected element to its correct position
        blocks[j + 1].style.height = height;
        blocks[j + 1].childNodes[0].innerHTML = key;    
    }
}

/* Heap Helper Function */
async function heapify(n, i) {
    var blocks = document.querySelectorAll(".block");
    
    var largest = i; 
    var l = 2 * i + 1; 
    var r = 2 * i + 2; 

    if (l < n && Number(blocks[l].childNodes[0].innerHTML) > Number(blocks[largest].childNodes[0].innerHTML))
        largest = l;

    if (r < n && Number(blocks[r].childNodes[0].innerHTML) > Number(blocks[largest].childNodes[0].innerHTML))
        largest = r;
 
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
            }, 100)
        );
    
        await heapify(n, largest);
    }
}

/* Heap Sort */
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
        }, 100)
        );
    
        await heapify(i, 0);
    }

    blocks[0].style.backgroundColor = "#13CE66";
}

/* Quick Sort Helper function */
async function quick_partition(l, r) {
    var blocks = document.querySelectorAll(".block");
  
    var pivot = Number(blocks[r].childNodes[0].innerHTML);
    var i = l - 1;
    blocks[r].style.backgroundColor = "#3e8da8";
  
    for (var j = l; j <= r - 1; j++) {
        blocks[j].style.backgroundColor = "#3e8da8";
    
        await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 50)
        );

        var value = Number(blocks[j].childNodes[0].innerHTML);

        // To compare value of two blocks
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
                blocks[j].style.backgroundColor = "#FF4949";
            }
            
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 50)
            );
        } 
        else {
            blocks[j].style.backgroundColor = "#FF4949";
        } 
    }

    i++;
    var temp1 = blocks[i].style.height;
    var temp2 = blocks[i].childNodes[0].innerText;
    blocks[i].style.height = blocks[r].style.height;
    blocks[r].style.height = temp1;
    blocks[i].childNodes[0].innerText = blocks[r].childNodes[0].innerText;
    blocks[r].childNodes[0].innerText = temp2;
    blocks[r].style.backgroundColor = "#13CE66";
    blocks[i].style.backgroundColor = "#13CE66";
    
    await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 50)
    );

    for (var k = 0; k < 20; k++) {
        blocks[k].style.backgroundColor = "#13CE66";
    } 

    return i;
}

/* Quick Sort */
async function quick_sort(l, r) {
    if (l < r) {
      var pivot_idx = await quick_partition(l, r);
      await quick_sort(l, pivot_idx - 1);
      await quick_sort(pivot_idx + 1, r);
    }
}

/* Changes the sort algorithm */
function choose_algorithm(algorithm) {
    sort_algo = algorithm;
    
    if (sort_algo == "bubble")
        document.getElementById("algo-type").text = "Bubble Sort";
        
    if (sort_algo == "insert") 
        document.getElementById("algo-type").text = "Insertion Sort";
        
    if (sort_algo == "heap") 
        document.getElementById("algo-type").text = "Heap Sort";

    if (sort_algo == "quick")
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

    if (sort_algo == "bubble")
        await bubble_sort();
        
    if (sort_algo == "insert")
        await insertion_sort();
        
    if (sort_algo == "heap")
        await heap_sort();

    if (sort_algo == "quick") {
        let r =  document.querySelectorAll(".block").length-1;
        await quick_sort(0, r);
    }

    enable_buttons();
}

/* Refreshes the page */
function refresh() {
    location.reload();
}

// generate initial array
generate_array();
