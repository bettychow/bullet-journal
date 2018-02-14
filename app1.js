let nowDate = new Date(); 
let date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/'+nowDate.getFullYear();
let currentDate = document.querySelector('#date');
currentDate.innerHTML = date;

let bulletMenu = document.querySelector('#bullet-menu');
let bulletSelected = bulletMenu.options[bulletMenu.selectedIndex].value; 
let content = document.querySelector('#content');
let list = document.querySelector('#list');

let idIndex = 0;
let addButton = document.querySelector('#add');
let saveButton = document.querySelector('#save');
let deleteButton = document.querySelector('#delete');
let navBar = document.querySelector('#nav');
let happyNav = document.querySelector('#happy-nav');

console.log(Object.keys(localStorage));

if(!localStorage.hasOwnProperty(`${date}-idIndex`)) {
  localStorage.setItem(`${date}-idIndex`, idIndex);
}

if(localStorage.hasOwnProperty(date)) {
  let currentStorageValue = localStorage.getItem(date);
  console.log('yyyyyy', currentStorageValue);
  
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  console.log('frag', frag);
  console.log(frag.querySelectorAll('span'))
  
  list.appendChild(frag);
}

if(localStorage.hasOwnProperty('journalDates')) {
  let currentStorageValue = localStorage.getItem('journalDates');
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  
  navBar.appendChild(frag);
}


const addToStorage = (newEntry) => {
  let existingValue =  localStorage.getItem(date);
  let updatedStorage = '';
  if(existingValue) {
    updatedStorage = existingValue += newEntry.outerHTML;
  } else {
    updatedStorage = newEntry.outerHTML;
  }
  localStorage.setItem(date, updatedStorage);

  console.log('pppp', localStorage);

}

const toggleCheckbox = (event) => {
  
  if(!event.target.attributes.checked) {
    event.target.outerHTML = '<input type="checkbox" id="1" onclick="toggleCheckbox(event)" checked>'
    console.log('gggggg', event.target.outerHTML);
    
    
  } else {
    event.target.outerHTML = '<input type="checkbox" id="1" onclick="toggleCheckbox(event)">'
  }

}

const createAndAddNewEntry = () => {
  
  let bulletMenu = document.querySelector('#bullet-menu');
  let bulletSelected = bulletMenu.options[bulletMenu.selectedIndex].value; 
  let list = document.querySelector('#list');
  let newEntry = document.createElement('li');
  //newEntry.className = "entry";

  let currentIdIndex = Number(localStorage.getItem(`${date}-idIndex`));

  if(bulletSelected === 'task') {
    currentIdIndex++;
    localStorage.setItem(`${date}-idIndex`, currentIdIndex);

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = currentIdIndex;
    checkbox.className = "checkbox";
    checkbox.setAttribute("onclick", "toggleCheckbox(event)");
    newEntry.appendChild(checkbox);
  
  } else if ( bulletSelected === 'event') {
    let circle = document.createElement('span');
    circle.innerHTML = "&#x25CF;   ";
    circle.className = "circle";
    newEntry.appendChild(circle);

  } else if(bulletSelected === 'happy-moment') {

    let heart = document.createElement('span');
    heart.innerHTML = "&hearts;   ";
    heart.setAttribute("style", "color: red;");
    newEntry.appendChild(heart);

  }

  let inputContent = document.querySelector('#content').value;
  let entryContent = document.createElement('label');
  let editInput = document.createElement('input');
  let editButton = document.createElement('button');
  let deleteButton = document.createElement('button');

 // entryContent.className = "entryContent";
  editInput.type = 'text';
  editButton.innerHTML = 'Edit';
  editButton.className = 'edit'
  deleteButton.innerHTML = 'Delete';
  deleteButton.className = 'delete';

  editButton.setAttribute("onclick", "editEntry(event)");
  deleteButton.setAttribute("onclick", "deleteEntry(event)");

  currentIdIndex++;
  localStorage.setItem(`${date}-idIndex`, currentIdIndex);
  entryContent.setAttribute("id", currentIdIndex);
  entryContent.textContent = inputContent;

  newEntry.appendChild(entryContent);
  newEntry.appendChild(editInput);
  newEntry.appendChild(editButton);
  newEntry.appendChild(deleteButton);


  if(newEntry.querySelector('label').textContent) {
    addToStorage(newEntry);
    list.appendChild(newEntry);
  }
  content.value = '';
  bulletMenu.selectedIndex = 0;
}


addButton.addEventListener('click', createAndAddNewEntry);

const editEntry = (event) => {
  let listItem = event.target.parentNode;
  let labelContent = listItem.querySelector('label').innerHTML;
  let editInput = listItem.querySelector('input[type=text]');

  listItem.classList.toggle("editMode");

  if(listItem.className === "editMode") {
    
    editInput.value = labelContent;
  } else {

  }
}

const deleteEntry = (event) => {
  console.log('eeeeeeeee', event.target.parentNode);
  list.removeChild(event.target.parentNode);
  console.log('kkkkkkk', list);
  let items = list.querySelectorAll('li');
  let itemsString = '';

  items.forEach(item => {
    itemsString += item.outerHTML;
  });

  localStorage.setItem(date, itemsString);
  
}

const save = () => {
  
  let items = list.querySelectorAll('li');
  let itemsString = '';
  
  items.forEach(item => {
    if(item.className === "editMode") {
      let editInput = item.querySelector('input[type=text]');
      
      item.querySelector('label').innerHTML = editInput.value;
      item.classList.toggle("editMode");
    }
    itemsString += item.outerHTML;
  })

  console.log('items', items);
  
 localStorage.setItem(date, itemsString);

 
saveToNav();

}

const saveToNav = () => {
  let navBar = document.querySelector('#nav');

  let journalDates = navBar.querySelectorAll('li');

  if (!isJournalDate()) {
    let dateLink = document.createElement('li');
    dateLink.innerHTML = date;
    dateLink.className = "dateLink";
    dateLink.setAttribute("onclick", "displayJournal(event)");

    let storageForNav = localStorage.getItem('journalDates');
    if(!storageForNav ) {
      storageForNav = dateLink.outerHTML;
    } else if(!storageForNav.includes(dateLink.outerHTML))  {
      storageForNav = dateLink.outerHTML + storageForNav;
    }
    localStorage.setItem('journalDates', storageForNav);
    navBar.insertBefore(dateLink, navBar.childNodes[0]);
  }
}

const isJournalDate = () => {
  let navBar = document.querySelector('#nav');
  let journalDates = navBar.querySelectorAll('li');
  let journalDateExists = false;

  journalDates.forEach(journalDate => {
    if(journalDate.innerHTML === date) {
      journalDateExists = true;
    }
  });
  return journalDateExists;
}


const displayJournal = (event) => {
  let dateOfJournal = event.target.textContent;
  let currentStorageValue = localStorage.getItem(dateOfJournal);
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  let middleCol = document.querySelector('.middle');

  document.querySelector('.daily-journal-title').innerHTML = `Date: ${dateOfJournal}`;
  bulletMenu.setAttribute("style", "display: none;");
  content.setAttribute("style", "display: none;");
  addButton.setAttribute("style", "display: none;");
  saveButton.setAttribute("style", "display: none;");
  

 if(!middleCol.querySelector('#home')) {
    let homeButton = document.createElement('button');
    homeButton.id = "home";
    homeButton.innerHTML = "Back to today's journal";
    homeButton.onclick = goHome;
    middleCol.appendChild(homeButton);
 }

 while (list.firstChild) {
  list.removeChild(list.firstChild);
 }
   list.appendChild(frag);
}

const goHome = () => {
  bulletMenu.setAttribute("style", "display: inline;");
  content.setAttribute("style", "display: inline;");
  addButton.setAttribute("style", "display: inline;");
  saveButton.setAttribute("style", "display: inline;");
  let title = document.querySelector('.daily-journal-title');
  title.innerHTML = `Today's date is ${date}`;
  while (list.firstChild) {
    list.removeChild(list.firstChild);
   }
   if(localStorage.hasOwnProperty(date)) {
    let currentStorageValue = localStorage.getItem(date);
    let frag = document.createRange().createContextualFragment(currentStorageValue);
    list.appendChild(frag);
  }

  let middleCol = document.querySelector('.middle');
  let homeButton = middleCol.querySelector('#home');
  middleCol.removeChild(homeButton);

}

saveButton.addEventListener('click', save);

