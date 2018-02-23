const dailyJournal = {};

let nowDate = new Date(); 
let date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/'+nowDate.getFullYear();

dailyJournal.isJournalDate = function() {
  let navBar = document.querySelector('#nav');
  let journalDates = navBar.querySelectorAll('li');
  // let journalDateExists = false;
  
  // journalDates.forEach(journalDate => {
  //   if(journalDate.innerHTML === date) {
  //     journalDateExists = true;
  //   }
  // });
  //console.log(journalDateExists);
  
  // return journalDateExists;

  return dailyJournal.findJournalDate(journalDates);
}




dailyJournal.findJournalDate = (journalDates) => {
  
  
  let journalDateExists = false;
  journalDates.forEach(journalDate => {
    if(journalDate.innerHTML === date) {
      journalDateExists = true;
    }
  });
  console.log(journalDateExists);
  
  return journalDateExists;
}





let currentDate = document.querySelector('#date');
currentDate.innerHTML = date;
console.log('dddd', typeof date);

let landingPageIcon = document.querySelector("#landing-page-title");
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
let picture = document.querySelector('img');
let middleCol = document.querySelector('.middle');



dailyJournal.isJournalDate = function() {
  let navBar = document.querySelector('#nav');
  let journalDates = navBar.querySelectorAll('li');
  let journalDateExists = false;
  
  journalDates.forEach(journalDate => {
    if(journalDate.innerHTML === date) {
      journalDateExists = true;
    }
  });
  console.log(journalDateExists);
  
  return journalDateExists;
}

if(!localStorage.hasOwnProperty(`${date}-idIndex`)) {
  localStorage.setItem(`${date}-idIndex`, idIndex);
}

if(localStorage.hasOwnProperty(date)) {
  let currentStorageValue = localStorage.getItem(date);
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  list.appendChild(frag);
}

if(localStorage.hasOwnProperty('journalDates')) {
  let currentStorageValue = localStorage.getItem('journalDates');
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  navBar.appendChild(frag);
}

if(localStorage.hasOwnProperty(`${date}-picture`)) {
  let currentStorageValue = localStorage.getItem(`${date}-picture`);
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  
 middleCol.insertBefore(frag, saveButton);
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
}

const toggleCheckbox = (event) => {
  if(!event.target.attributes.checked) {
    event.target.outerHTML = '<input type="checkbox" id="1" onclick="toggleCheckbox(event)" checked>'
  } else {
    event.target.outerHTML = '<input type="checkbox" id="1" onclick="toggleCheckbox(event)">'
  }
}

const createAndAddNewEntry = () => {
  
  let bulletMenu = document.querySelector('#bullet-menu');
  let bulletSelected = bulletMenu.options[bulletMenu.selectedIndex].value; 
  let list = document.querySelector('#list');
  let newEntry = document.createElement('li');
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

  editInput.type = 'text';
  editInput.className = 'editInput';
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
    listItem.querySelector('label').innerHTML = editInput.value;
  }
}

const deleteEntry = (event) => {
  list.removeChild(event.target.parentNode);
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
  let preview = document.querySelector('.preview');
  
  items.forEach(item => {
    if(item.className === "editMode") {
      let editInput = item.querySelector('input[type=text]');
      item.querySelector('label').innerHTML = editInput.value;
      item.classList.toggle("editMode");
    }
    itemsString += item.outerHTML;
  });
  
 localStorage.setItem(date, itemsString);

 let currentPicture = document.createElement('img');
 currentPicture.className = "current-pic";
 currentPicture.setAttribute("src", preview.getAttribute("src"));
 
 localStorage.setItem(`${date}-picture`, currentPicture.outerHTML);
 location.reload();
 saveToNav();

}

saveButton.addEventListener('click', save);

const saveToNav = () => {
  let navBar = document.querySelector('#nav');
  let journalDates = navBar.querySelectorAll('li');

  if (!dailyJournal.isJournalDate()) {
    console.log(dailyJournal.isJournalDate(date));
    
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

dailyJournal.isJournalDate = function() {
  let navBar = document.querySelector('#nav');
  let journalDates = navBar.querySelectorAll('li');
  let journalDateExists = false;
  
  journalDates.forEach(journalDate => {
    if(journalDate.innerHTML === date) {
      journalDateExists = true;
    }
  });
  console.log(journalDateExists);
  
  return journalDateExists;
}


const displayJournal = (event) => {
  let dateOfJournal = event.target.textContent;
  console.log('dddddd', dateOfJournal);
  
  let currentStorageForList = localStorage.getItem(dateOfJournal);
  let frag = document.createRange().createContextualFragment(currentStorageForList);
  let middleCol = document.querySelector('.middle');
  let currentPic = document.querySelector('.current-pic');
  
  document.querySelector('.daily-journal-title').innerHTML = `Date: ${dateOfJournal}`;
  bulletMenu.setAttribute("style", "display: none;");
  content.setAttribute("style", "display: none;");
  addButton.setAttribute("style", "display: none;");
  saveButton.setAttribute("style", "display: none;");

  if(!middleCol.querySelector('#back-to-current-journal')) {
      var homeButton = document.createElement('button');
      homeButton.id = "back-to-current-journal";
      homeButton.innerHTML = "Back to today's journal";
      homeButton.onclick = goHome;
      middleCol.appendChild(homeButton);
  }

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  list.appendChild(frag);

  let editButton = document.querySelectorAll('.edit');
  let deleteButton = document.querySelectorAll('.delete');

  editButton.forEach(button => {
    button.style = "display: none;";
  });

  deleteButton.forEach(button => {
    button.style = "display: none;";
  });

  if(currentPic) {
    middleCol.removeChild(currentPic);
  } 

  let uploadFile = document.querySelector("#upload-file");
  uploadFile.style = "display: none;"
  insertPic();
}

const insertPic = () => {
  let dateOfJournal = event.target.textContent;
  let currentPic = document.querySelector('.current-pic');
  let homeButton = document.querySelector('#back-to-current-journal');
  if(localStorage.hasOwnProperty(`${dateOfJournal}-picture`) && !currentPic ) {
    console.log('yyyyyy', localStorage.hasOwnProperty(`${dateOfJournal}-picture`))
    let currentStorageForPic = localStorage.getItem(`${dateOfJournal}-picture`);
    let frag = document.createRange().createContextualFragment(currentStorageForPic);
    middleCol.insertBefore(frag, homeButton);
  }
}

const goHome = () => {
  // bulletMenu.setAttribute("style", "display: inline;");
  // content.setAttribute("style", "display: inline;");
  // addButton.setAttribute("style", "display: inline;");
  // saveButton.setAttribute("style", "display: inline;");
  // let title = document.querySelector('.daily-journal-title');
  // title.innerHTML = `Today's date is ${date}`;
  // while (list.firstChild) {
  //   list.removeChild(list.firstChild);
  //  }
  //  if(localStorage.hasOwnProperty(date)) {
  //   let currentStorageValue = localStorage.getItem(date);
  //   let frag = document.createRange().createContextualFragment(currentStorageValue);
  //   list.appendChild(frag);
  // }

  // let middleCol = document.querySelector('.middle');
  // let homeButton = middleCol.querySelector('#home');
  // middleCol.removeChild(homeButton);
location.reload();
}

function previewFile(){
  var preview = document.querySelector('.preview'); //selects the query named img
  var file    = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader  = new FileReader();
  
  reader.onloadend = function () {
      preview.src = reader.result;
  }

  if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
  } else {
      preview.src = "";
  }
}

previewFile();  //calls the function named previewFile()

