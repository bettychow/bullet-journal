let monthlyHappy = {}

monthlyHappy.updateMonthNav = (storageForMonthNav) => {
  if(!storageForMonthNav ) {
    storageForMonthNav = [currentMonthInWord];
  } else if(!storageForMonthNav.includes(currentMonthInWord))  {
    storageForMonthNav.push(currentMonthInWord);
  }
  return storageForMonthNav;
}

monthlyHappy.isJournalMonth = (allMonthsArr, currentMonthInWord) => {
  let happyMonthExists = false;

  allMonthsArr.forEach(month => {
    if(month === currentMonthInWord) {
      happyMonthExists = true;
    }
  });
  return happyMonthExists;
}

let nowDate = new Date(); 
let currentMonth = nowDate.getMonth();
const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let currentMonthInWord = months[currentMonth];
let currentMonthHeading = document.querySelector('#current-month');
let happyList = document.querySelector('#happy-list');
let monthNav = document.querySelector('#month-nav');

currentMonthHeading.innerHTML = currentMonthInWord;


const saveToMonthNav = () => {
  let monthNav = document.querySelector('#month-nav');
  let allMonths = monthNav.querySelectorAll('li');
  let currentMonth = nowDate.getMonth();
  const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let currentMonthInWord = months[currentMonth];
  let allMonthsArr = [];

  allMonths.forEach(month => {
    allMonthsArr.push(month.innerHTML);
  })
  
  if (!monthlyHappy.isJournalMonth(allMonthsArr, currentMonthInWord)) {
    let monthLink = document.createElement('li');
    monthLink.innerHTML = currentMonthInWord;
    monthLink.className = "monthLink";
    monthLink.setAttribute("onclick", "displayMonthlyHappyMoments(event)");

    let storageForMonthNav = JSON.parse(localStorage.getItem('happyMonths'));
    
    storageForMonthNav = monthlyHappy.updateMonthNav(storageForMonthNav, currentMonthInWord);
    localStorage.setItem('happyMonths', JSON.stringify(storageForMonthNav));
    monthNav.appendChild(monthLink);
  }
}

const updateMonthNav = (storageForMonthNav) => {
  if(!storageForMonthNav ) {
    storageForMonthNav = [currentMonthInWord];
  } else if(!storageForMonthNav.includes(currentMonthInWord))  {
    storageForMonthNav.push(currentMonthInWord);
  }
  return storageForMonthNav;
}

const renderContent = (entry, key) => {
  let listItem = document.createElement('li');
  let date = document.createElement('span');
  date.innerHTML = key.slice(15);
  listItem.appendChild(date);
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
    }

    let entryContent = document.createElement('label');
    entryContent.textContent = entry.content;

    listItem.appendChild(entryContent);
    saveToMonthNav();
    return listItem;
}


Object.keys(localStorage).forEach(key => {
  
  if(key.includes('journalEntries')) {
   
    let month = key.slice(15, 16);
    
   if(months[Number(month) - 1] === currentMonthHeading.innerHTML ) {
     let journalEntriesArr = JSON.parse(localStorage[key]);
    
     for(let i = 0; i < journalEntriesArr.length; i++) {
      if(journalEntriesArr[i].type === 'happy-moments') {
        let listItem = renderContent(journalEntriesArr[i], key); 
        happyList.appendChild(listItem);
      }
     }
    }
  } 
});


const goToCurrentMonth = () => {
  location.reload();
}

const displayMonthlyHappyMoments = (event) => {
  let selectedMonth = event.target.innerHTML;
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let monthInNum = months.indexOf(selectedMonth) + 1;
  
  document.querySelector('#current-month-title').innerHTML = selectedMonth;
  
  while (happyList.firstChild) {
    happyList.removeChild(happyList.firstChild);
   }

  Object.keys(localStorage).forEach(key => {

    if(key.includes('journalEntries')) {
      let month = key.slice(15, 16);
      
     if(months[Number(month) - 1] === selectedMonth ) {
       let journalEntriesArr = JSON.parse(localStorage[key]);
      
       for(let i = 0; i < journalEntriesArr.length; i++) {
        if(journalEntriesArr[i].type === 'happy-moments') {
          let listItem = renderContent(journalEntriesArr[i], key); 
          happyList.appendChild(listItem);
        }
        
       }
     }
    } 
  });
  
  if(!document.querySelector(".back-to-current-month")) {
    let back = document.createElement('button');
    back.setAttribute("onclick", "goToCurrentMonth()");
    back.innerHTML = 'Back to current month';
    back.className = "back-to-current-month"
    let rightCol = document.querySelector('.right2')
    rightCol.appendChild(back);
  }
}

