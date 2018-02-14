let nowDate = new Date(); 
let currentMonth = nowDate.getMonth();
const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let currentMonthInWord = months[currentMonth];

let currentMonthHeading = document.querySelector('#current-month');
let happyList = document.querySelector('#happy-list');
let monthNav = document.querySelector('#month-nav');

currentMonthHeading.innerHTML = currentMonthInWord;



if(localStorage.hasOwnProperty('happyMonths')) {
  let currentStorageValue = localStorage.getItem('happyMonths');
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  
  monthNav.appendChild(frag);
}

Object.keys(localStorage).forEach(key => {
  if(Number(key[0]) && isNaN(Number(key[1]))) {
   if(months[Number(key[0]) - 1] === currentMonthHeading.innerHTML ) {
     let frag = document.createRange().createContextualFragment(localStorage[key]);
     let spanArr = frag.querySelectorAll('span');
     spanArr.forEach(span => {
       
       if(span.textContent === '♥   ') {
         console.log('hhhhh', happyList);
         let date = document.createElement('span');
         date.innerHTML = key;
         happyList.appendChild(date);
         happyList.appendChild(span.parentNode);
       }
     });
   }
  } 
});

const displayMonthlyHappyMoments = (event) => {
  let selectedMonth = event.target.innerHTML;
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let monthInNum = months.indexOf(selectedMonth) + 1;
  console.log('kkkk', Object.keys(localStorage)  );
  document.querySelector('#current-month-title').innerHTML = selectedMonth;
  
  while (happyList.firstChild) {
    happyList.removeChild(happyList.firstChild);
   }

     
  Object.keys(localStorage).forEach(key => {
    if(Number(key[0]) && isNaN(Number(key[1]))) {
      if(Number(key[0]) === monthInNum ) {
        let frag = document.createRange().createContextualFragment(localStorage[key]);
        let spanArr = frag.querySelectorAll('span');
        spanArr.forEach(span => {
          if(span.textContent === '♥   ') {
            let date = document.createElement('span');
            date.innerHTML = key;
            happyList.appendChild(date);
            happyList.appendChild(span.parentNode);
          }
        });
      }
     } 
  });
  let back = document.createElement('button');
  back.setAttribute("onlick", "goToCurrentMonth()");
  back.innerHTML = 'Back to current month';
  let rightCol = document.querySelector('.right2')
  rightCol.appendChild(back);
}

const goToCurrentMonth = () => {
  
}


 const saveToMonthNav = () => {
  let monthNav = document.querySelector('#month-nav');
  let allMonths = monthNav.querySelectorAll('li');
  let currentMonth = nowDate.getMonth();
  const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let currentMonthInWord = months[currentMonth];

  if (!isJournalMonth()) {
    let monthLink = document.createElement('li');
    monthLink.innerHTML = currentMonthInWord;
    monthLink.className = "monthLink";
    monthLink.setAttribute("onclick", "displayMonthlyHappyMoments(event)");

    console.log('nnnnn', monthLink);
    
    let storageForMonthNav = localStorage.getItem('happyMonths');
    if(!storageForMonthNav ) {
      storageForMonthNav = monthLink.outerHTML;
    } else if(!storageForMonthNav.includes(monthLink.outerHTML))  {
      storageForMonthNav += monthLink.outerHTML;
    }
    localStorage.setItem('happyMonths', storageForMonthNav);
    monthNav.appendChild(monthLink);
  }
}


const isJournalMonth = () => {
  let monthNav = document.querySelector('#month-nav');
  let allMonths = monthNav.querySelectorAll('li');
  let happyMonthExists = false;
  let currentMonth = nowDate.getMonth();
  const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let currentMonthInWord = months[currentMonth];

  allMonths.forEach(month => {
    if(month.innerHTML === currentMonthInWord) {
      happyMonthExists = true;
    }
  });
  return happyMonthExists;
}

saveToMonthNav();

