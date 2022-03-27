// This was coded by Sami Elsayed

document.addEventListener('DOMContentLoaded', () => {
    let addButton = document.querySelector('#add'); // Button to add new item
    let addInput = document.querySelector('#item'); // Input field to add new item

    // Add the svg icons for the buttons
    let removeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/></svg>`
    let completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`
})

/*
 * User clicks on the add button
 * If there is text inside the item field, add it to the to-do list
*/

addButton.addEventListener('click', function() {
    let newItem = document.getElementById('item').ariaValueMax; // Grabs the value of the input tag
    
    // If the input tag is not empty, run the function to add an item
    if (newItem) {
        addItemTodo(newItem); // this function will add a new item to the to-do list
        document.getElementById('item').value = ''; // reset the input after we added a new item
    }
})

// The user press enter

addInput.addEventListener('keypress', function(e) {
    // Did the user press enter? If so, then continue
    if (13 === e.keyCode) {
        let newItem = document.getElementById('item').value; // Grabs the value of the input tag

        // If the input tag is not empty, run the function to add an item
        if (newItem) {
            addItemTodo(newItem) // This function will add a new item to the to-do list
            document.getElementById('item').value = ''; // Reset the input after adding a new item
        }
    }
})

function addItemTodo(text) {
    let list = document.getElementById('todo'); // Grabs the ul
    let item = document.createElement('li'); // Creates an li
    item.innerText = text; // Set the inside of our li the same as the parameter that was passed in the function, which is going to be the value set by the user in the input field

    // Create container for the buttons remove and complete
    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button'); // Creates the two buttons
    remove.classList.add('remove');
    remove.innerHTML = removeSVG; // Add the SVG icon to the button
    remove.addEventListener('click', removeItem); // Add event listener for remove. This function will be defined more later

    let complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG; // Add the SVG icon to the button
    complete.addEventListener('click', completeItem); // Add event listener for complete. This function will also be defined more later

    // Append the buttons to the div
    buttons.appendChild(remove);
    buttons.appendChild(complete);

    // Append the div to the li
    item.appendChild(buttons);

    // Prepend the li to the ul
    list.insertBefore(item, list.childNodes[0]);
}

function completeItem() {
    let item = this.parentNode.parentNode; // Grabs the li by targeting the parent of the parent of the button (button -> div -> li)
    let parent = item.parentNode;  // Grabs the ul (li -> ul)
    let id = parent.id; // Grabs the parent id

    // Checks if the item should go in the completed, or if it should be re-added to to-do by using a ternary operator
    let target = id === 'todo' ?
        document.getElementById('completed') : document.getElementById('todo');
    
    parent.removeChild(item); // Removes the item to its current ul

    target.insertBefore(item, target.childNodes[0]); // Add the item to the new ul
}

function removeItem() {
    let item = this.parentNode.parentNode; // Grabs the li by targeting the parent of the parent of the button (button -> div -> li)
    let parent = item.parentNode; // Grabs the ul (li -> ul)

    parent.removeChild(item); // Removes li from ul
}
