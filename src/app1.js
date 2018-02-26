
let dailyJournal = {};

dailyJournal.updateNavBar = (storageForNav) => {
    if(!storageForNav ) {
      storageForNav = [date];
    } else if(!storageForNav.includes(date))  {
      storageForNav.push(date);
    }
    return storageForNav;
}

let nowDate = new Date(); 
let date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/'+nowDate.getFullYear();
let currentDate = document.querySelector('#date');
currentDate.innerHTML = date;

let landingPageIcon = document.querySelector("#landing-page-title");
let bulletMenu = document.querySelector('#bullet-menu');
let bulletSelected = bulletMenu.options[bulletMenu.selectedIndex].value; 
let content = document.querySelector('#content');
let list = document.querySelector('#list');

let addButton = document.querySelector('#add');
let saveButton = document.querySelector('#save');
let deleteButton = document.querySelector('#delete');
let navBar = document.querySelector('#nav');
let happyNav = document.querySelector('#happy-nav');
let picture = document.querySelector('img');
let middleCol = document.querySelector('.middle');
let journalEntries = [];
let preview = document.querySelector('.preview');


if(localStorage.hasOwnProperty('journalDates')) {
  let currentStorageArr = JSON.parse(localStorage.getItem('journalDates'));
  
  currentStorageArr.forEach(journalDate => {
    let dateLink = document.createElement('li');
    dateLink.innerHTML = journalDate;
    dateLink.className = "dateLink";
    dateLink.setAttribute("onclick", "displayJournal(event)");
    navBar.appendChild(dateLink);
  });
}

const renderContent = (entry) => {
  let listItem = document.createElement('li');
    let bullet = document.createElement('span');
    if(entry.type === 'completed-task' || entry.type === 'uncompleted-task') {
      let checkbox = document.createElement('input');
      let entryContent = document.createElement('label');
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";
      checkbox.setAttribute("onclick", "toggleCheckbox(event)");
      if(entry.type === 'completed-task') {
        checkbox.checked = true;
      } else if(entry.type === 'uncompleted-task') {
        checkbox.checked = false;
      }
      listItem.appendChild(checkbox);
    } else if(entry.type === 'happy-moments') {
      bullet.innerHTML = "&hearts;   ";
      bullet.setAttribute("style", "color: red;");
      listItem.appendChild(bullet);
    } else if(entry.type === 'event') {
      bullet.innerHTML = "&#x25CF;   ";
      bullet.setAttribute("style", "color: yellow;");
      listItem.appendChild(bullet);
    } else if(entry.type === 'gratitude') {
      bullet.innerHTML = "&#10047;   ";
      bullet.setAttribute("style", "color: hotpink;");
      listItem.appendChild(bullet);
    }

    let entryContent = document.createElement('label');
    entryContent.textContent = entry.content;

    listItem.appendChild(entryContent);

    return listItem;
}

if(localStorage.hasOwnProperty(`journalEntries-${date}`)) {
  
  let currentStorageValue = JSON.parse(localStorage.getItem(`journalEntries-${date}`));
  
  currentStorageValue.forEach(entry => {
    
    let listItem = renderContent(entry);

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

    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
  });

  if(localStorage.getItem(`${date}-picture`)) {
    let picInStore = localStorage.getItem(`${date}-picture`);
    let currentPic = document.createElement('img');
    currentPic.className = 'current-pic';
    currentPic.height = 200;
    currentPic.src = picInStore;
    middleCol.insertBefore(currentPic, saveButton)
  }
}

const createAndAddNewEntry = () => {
  console.log('heeeeeeeee')
  let bulletMenu = document.querySelector('#bullet-menu');
  let bulletSelected = bulletMenu.options[bulletMenu.selectedIndex].value; 
  let list = document.querySelector('#list');
  let newEntry = document.createElement('li');

  if(bulletSelected === 'task') {

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = false;
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

  } else if(bulletSelected === 'gratitude') {
    let flower = document.createElement('span');
    flower.innerHTML = "&#10047;   ";
    flower.setAttribute("style", "color: hotpink;");
    newEntry.appendChild(flower);
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

  entryContent.textContent = inputContent;

  newEntry.appendChild(entryContent);
  newEntry.appendChild(editInput);
  newEntry.appendChild(editButton);
  newEntry.appendChild(deleteButton);

  if(newEntry.querySelector('label').textContent) {
    list.appendChild(newEntry);
  }
  console.log('rrr', list);
  content.value = '';
  bulletMenu.selectedIndex = 0;
}

addButton.addEventListener('click', createAndAddNewEntry);

const toggleCheckbox = (event) => {
  if(!event.target.attributes.checked) {
    event.target.outerHTML = '<input type="checkbox" id="1" class="checkbox" onclick="toggleCheckbox(event)" checked>'
  } else {
    event.target.outerHTML = '<input type="checkbox" id="1" class="checkbox" onclick="toggleCheckbox(event)">'
  }
}

const deleteEntry = (event) => {
  list.removeChild(event.target.parentNode);
  let items = list.querySelectorAll('li');
  updateJournalEntries(items);
}

const updateJournalEntries = (items) => {

  let journalEntriesArr = [];
  items.forEach(item => {
    
    let entry = {};
    let checkbox = item.querySelector('.checkbox');
    let bullet = item.querySelector('span');
    let entryContent = item.querySelector('label');
    
    if(checkbox && !checkbox.checked) {
      entry.type = 'uncompleted-task';
    } else if(checkbox && checkbox.checked) {  
      entry.type = 'completed-task';
    }
    
    if(bullet && bullet.innerHTML === "♥   " ) {
      entry.type = 'happy-moments';
    } else if (bullet && bullet.innerHTML === "●   " ) {
        entry.type = 'event';
    } else if (bullet && bullet.innerHTML === "✿   " ) {
      entry.type = 'gratitude';
  }

    entry.content = entryContent.innerHTML;
    journalEntriesArr.push(entry);
  });
    
  localStorage.setItem(`journalEntries-${date}`, JSON.stringify(journalEntriesArr));
}


const save = () => {
  let items = list.querySelectorAll('li');
  let preview = document.querySelector('.preview');
  let currentPic = document.querySelector('.current-pic');
  
  updateJournalEntries(items);
  
  if(preview.src !== 'file:///Users/kitty/Documents/Galvanize/bullet-journal/daily-journal.html' && !currentPic) {
    console.log('1111111', preview.src);
    
      localStorage.setItem(`${date}-picture`, preview.src);
    }
 
  if(currentPic  && preview.src === 'file:///Users/kitty/Documents/Galvanize/bullet-journal/daily-journal.html' ) {
    console.log('2222222');
    
    localStorage.setItem(`${date}-picture`, currentPic.src);
  }

  if(currentPic && preview.src !== 'file:///Users/kitty/Documents/Galvanize/bullet-journal/daily-journal.html') {
    console.log('3333333');
    
    localStorage.setItem(`${date}-picture`, preview.src);
  }
  saveToNav();
  location.reload();

}

saveButton.addEventListener('click', save);

const saveToNav = () => {
  let date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/'+nowDate.getFullYear();
  let navBar = document.querySelector('#nav');
  let journalDates = navBar.querySelectorAll('li');

  if (!isJournalDate()) {
    let dateLink = document.createElement('li');
    dateLink.innerHTML = date;
    dateLink.className = "dateLink";
    dateLink.setAttribute("onclick", "displayJournal(event)");

    let storageForNav = JSON.parse(localStorage.getItem('journalDates'));
    storageForNav = dailyJournal.updateNavBar(storageForNav, date);
    localStorage.setItem('journalDates', JSON.stringify(storageForNav));
    navBar.insertBefore(dateLink, navBar.childNodes[0]);
  }
}

const isJournalDate = function() {
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

const editEntry = (event) => {
  let listItem = event.target.parentNode;
  let labelContent = listItem.querySelector('label').innerHTML;
  let editInput = listItem.querySelector('.editInput');

  listItem.classList.toggle("editMode");

  if(listItem.className === "editMode") {
    editInput.value = labelContent;
  } else {
    listItem.querySelector('label').innerHTML = editInput.value;
  }
}

const goHome = () => {
  location.reload();
}

const displayJournal = (event) => {
  let dateOfJournal = event.target.textContent;
  let currentStorageForList = localStorage.getItem(`journalEntries-${dateOfJournal}`);
  let journalEntiresForTheDate = JSON.parse(currentStorageForList);
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

  journalEntiresForTheDate.forEach(entry => {
    let listItem = renderContent(entry);
    list.appendChild(listItem);
  })

  if(currentPic) {
    middleCol.removeChild(currentPic);
  } 

  let uploadFile = document.querySelector("#upload-file");
  uploadFile.style = "display: none;"
  insertPic();
}

const insertPic = () => {
  console.log('helllo');
  
  let dateOfJournal = event.target.textContent;
  let currentPic = document.querySelector('.current-pic');
  let homeButton = document.querySelector('#back-to-current-journal');
  
    if(localStorage.getItem(`${dateOfJournal}-picture`)) {
    
      let picInStore = localStorage.getItem(`${dateOfJournal}-picture`);
      let currentPic = document.createElement('img');
      currentPic.className = 'current-pic';
      currerntPic.height = 200;
      currentPic.src = picInStore;
      middleCol.insertBefore(currentPic, saveButton)
    }

}

function previewFile(){
  var preview = document.querySelector('.preview'); 
  var file    = document.querySelector('input[type=file]').files[0]; 
  var reader  = new FileReader();
  
  reader.onloadend = function () {
      preview.src = reader.result;
  }

  if (file) {
      reader.readAsDataURL(file); 
  } else {
      preview.src = "";
  }
}

previewFile(); 