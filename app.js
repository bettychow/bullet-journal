let nowDate = new Date(); 
let date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/'+nowDate.getFullYear();
let list = document.querySelector('#list');
let idIndex = 0;

if(!localStorage.hasOwnProperty(`${date}-idIndex`)) {
  localStorage.setItem(`${date}-idIndex`, idIndex);
}

if(localStorage.hasOwnProperty(date)) {
  let currentStorageValue = localStorage.getItem(date);
  let frag = document.createRange().createContextualFragment(currentStorageValue);
  console.log('frag', frag);
  console.log(frag.querySelector('input'))
  
  list.appendChild(frag);
}

let currentDate = document.querySelector('#date');
currentDate.innerHTML = date;


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

document.querySelector('button').addEventListener('click', (event) => {

  let bulletMenu = document.querySelector('#bullet-menu');
  let bulletSelected = bulletMenu.options[bulletMenu.selectedIndex].value; 
  let list = document.querySelector('#list');
  let newEntry = document.createElement('li');

  let currentIdIndex = Number(localStorage.getItem(`${date}-idIndex`));

  console.log('uuuuuuuu', currentIdIndex);
  
  if(bulletSelected === 'task') {
    currentIdIndex++;
    newEntry.insertAdjacentHTML('afterbegin', `<input type="checkbox" id="${currentIdIndex}">`);
    localStorage.setItem(`${date}-idIndex`, currentIdIndex);
  } else if ( bulletSelected === 'event') {
    newEntry.insertAdjacentHTML('afterbegin', '<span type="text" style="color: orange;">&#x25CF;     </span>');
  } else if(bulletSelected === 'happy-moment') {
    newEntry.insertAdjacentHTML('afterbegin', '<span type="text" style="color: red;">&hearts;  </span>' );
  }

  let inputContent = document.querySelector('#content').value;
  let entryContent = document.createElement('span');
  currentIdIndex++;
  localStorage.setItem(`${date}-idIndex`, currentIdIndex);
  entryContent.setAttribute("id", currentIdIndex);
  entryContent.textContent = inputContent;
  newEntry.appendChild(entryContent);

  console.log('nnnnn', newEntry);
  
  addToStorage(newEntry);
  console.log('gggggg', list);
  
  list.appendChild(newEntry);
console.log('llll', list)
document.body.appendChild(list);
  
})




