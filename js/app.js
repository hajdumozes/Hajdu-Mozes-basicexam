// ! 1. feladat
// ? Számok és unknown értékek szétválasztása. Sajnos mindkettő string típus.
function divideNumbersAndUnknowns(userDatas) {
  var numberArray = [];
  var trashArray = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i].cost_in_credits !== 'unknown') {
      numberArray.push(userDatas[i]);
    } else {
      trashArray.push(userDatas[i]);
    }
  }
  return {
    numbers: numberArray,
    trash: trashArray
  };
}

function bubbleSortByPricesAscending(userDatasFiltered) {
  var costNumbers = divideNumbersAndUnknowns(userDatasFiltered).numbers;
  var unknowns = divideNumbersAndUnknowns(userDatasFiltered).trash;
  var change;
  var i = costNumbers.length - 1;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (parseInt(costNumbers[j].cost_in_credits, 10) > // ? A Jason miatt még stringben vannak.
        parseInt(costNumbers[j + 1].cost_in_credits, 10)) {
        [costNumbers[j], costNumbers[j + 1]] = [costNumbers[j + 1], costNumbers[j]];
        change = j;
      }
    }
    i = change;
  }
  var mergedData = costNumbers.concat(unknowns);
  return mergedData;
}

// ! 2. feladat
function deleteConsumablesNullObjects(userDatasInput) {
  for (var i = 0; i < userDatasInput.length; i++) {
    if (userDatasInput[i].consumables === null) {
      userDatasInput.splice(i, 1); // ? Törli az i indexű elemét a tömbnek
      i--; // ? A splice módosítja a tömb hosszát. Ezért egyet visszaugrunk
    }
  }
  return userDatasInput;
}

// ! 3. feladat
function replaceNullsWithUnknown(userDatasInput) {
  for (var i = 0; i < userDatasInput.length; i++) {
    for (var k in userDatasInput[i]) {
      if (userDatasInput[i][k] === null) {
        userDatasInput[i][k] = 'unknown';
      }
    }
  }
}

// ! 4. feladat
// ? Az n betű után már nincsenek képek, erre van ez a függvény
function insertPicturesAfterAlphabetN(modifiedDatasInput) {
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (modifiedDatasInput[i].image[0] > 'n') {
      modifiedDatasInput[i].image = 'noship.jpg';
    }
  }
}

function intoHTMLSpaceShipList(modifiedDatasInput, DOM) {
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    DOM.innerHTML += `<div class="div-mozes${i} div-task6"> 
    <pre> ${JSON.stringify(modifiedDatasInput[i], null, 4)}
    <img src='../img/${modifiedDatasInput[i].image}' class="imageMozes" 
    alt='${modifiedDatasInput[i].model}'
    </pre> </div>`;
    // document.querySelector('.div-mozes' + i).addEventListener('onclick', putToTheSideDiv(modifiedDatasInput, i));
  }
}

// ! 5. feladat - nem született működő megoldás


function addEvents() {
  var myDivs = document.querySelectorAll('.div-task6');
  for (var i = 0; i < myDivs.length; i++) {
    myDivs[i].addEventListener('click', thisDivToTheSide);
  }
}

// ? Az elnevezések és a feltételek a "putToTheSideDiv" függvény miatt vannak (7.feladat)
function thisDivToTheSide(mouseEvent) {
  var sideDiv = document.querySelector('.one-spaceship');
  sideDiv.style.color = 'white';
  console.log(mouseEvent.path[1]);
  var chosenDivContent = document.createElement('div');
  chosenDivContent.id = 'divToDelete';
  chosenDivContent.innerHTML = mouseEvent.path[1].innerHTML;
  if (sideDiv.querySelector('#divToDelete')) {
    var divToDelete = sideDiv.querySelector('#divToDelete');
    sideDiv.removeChild(divToDelete);
  }
  sideDiv.appendChild(chosenDivContent);
}


// ! 6. feladat
function searchForCrew1Ships(modifiedDatasInput, DOM) {
  var crew1 = 0;
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (modifiedDatasInput[i].crew === '1') {
      crew1++;
    }
  }
  DOM.innerHTML += `<pre><strong><font size="4" face="verdana">Ships with crew of 1:  ${crew1}
  </font></strong></pre>`;
}

function searchForBiggestCargoCapacity(modifiedDatasInput, DOM) {
  var max = modifiedDatasInput[0];
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (parseInt(modifiedDatasInput[i].cargo_capacity, 10) > parseInt(max.cargo_capacity, 10)) {
      max = modifiedDatasInput[i];
    }
  }
  DOM.innerHTML += `<pre><strong><font size="4" face="verdana">Model with the biggest cargo:  ${max.model}
  </font></strong></pre>`;
}

function sumAllPassengers(modifiedDatasInput, DOM) {
  var passengersSum = 0;
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (modifiedDatasInput[i].passengers !== 'unknown') {
      passengersSum += parseInt(modifiedDatasInput[i].passengers, 10);
    }
  }
  DOM.innerHTML += `<pre><strong><font size="4" face="verdana">All passengers:  ${passengersSum}
  </font></strong></pre>`;
}

function searchForLongestShipImageName(modifiedDatasInput, DOM) {
  var max = modifiedDatasInput[0];
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (parseInt(modifiedDatasInput[i].lengthiness, 10) > parseInt(max.lengthiness, 10)) {
      max = modifiedDatasInput[i];
    }
  }
  var maxImage = max.image;
  DOM.innerHTML += `<pre><strong><font size="4" face="verdana">Image name of the longest ship:  ${maxImage}
  </font></strong></pre>`;
}

// ! 7. feladat
function sortByModelNames(modifiedDatasInput) {
  var userDatasByModel = modifiedDatasInput.slice();
  var change;
  var i = userDatasByModel.length - 1;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (userDatasByModel[j].model > userDatasByModel[j + 1].model) {
        [userDatasByModel[j], userDatasByModel[j + 1]] = [userDatasByModel[j + 1], userDatasByModel[j]];
        change = j;
      }
    }
    i = change;
  }
  return userDatasByModel;
}

function searchForModels(modifiedDatasInput) {
  var userDataModels = sortByModelNames(modifiedDatasInput);
  document.querySelector('#search-button').addEventListener('click', function event() {
    // ? Kisbetűssé kell alakítani a keresett elemet, meg a potenciális találatot is.
    var searched = (document.querySelector('#search-text').value).toLowerCase();
    var found = false;
    var i = 0;
    while (i < userDataModels.length && !found) {
      if (userDataModels[i].model.toLowerCase().indexOf(searched) > -1) {
        found = true;
        putToTheSideDiv(userDataModels[i]);
      }
      i++;
    }
    if (!found) {
      putToTheSideDivNotFound();
    }
  });
}

function putToTheSideDiv(modifiedDatasInput) {
  // ? Probléma 1 : az innerHTML "(+)=" dolog nem szerencsés, nem szabad baszkurálni a gombot.
  var sideDiv = document.querySelector('.one-spaceship');
  // ? Probléma 2: Ha nem törlöm az előző tag-et, akkor egymás után pakolja.
  if (sideDiv.querySelector('#divToDelete')) {
    var divToDelete = sideDiv.querySelector('#divToDelete');
    sideDiv.removeChild(divToDelete);
  }
  // ? Probléma 3: Fekete hátteren pont nem látszik semmi.
  sideDiv.style.color = 'white';
  var myDiv = document.createElement('div');
  // ? Probléma 4: A két function-nek szinkronban kell lenniük, ezért a div és az if ugyanaz.
  myDiv.id = 'divToDelete';
  myDiv.innerHTML = `<pre>${JSON.stringify(modifiedDatasInput, null, 1)}
  <img src='../img/${modifiedDatasInput.image}' alt='${modifiedDatasInput.model}'</pre>`;
  sideDiv.appendChild(myDiv);
}

function putToTheSideDivNotFound() {
  var sideDiv = document.querySelector('.one-spaceship');
  if (sideDiv.querySelector('#divToDelete')) {
    var divToDelete = sideDiv.querySelector('#divToDelete');
    sideDiv.removeChild(divToDelete);
  }
  var myDiv = document.createElement('div');
  myDiv.id = 'divToDelete';
  myDiv.innerHTML = '<img src=\'../img/notFound.png\' style=\'display:block; margin:0 auto\'/>';
  sideDiv.appendChild(myDiv);
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    // ? ide belenyúltam az ESLINT miatt, 2 == helyett 3 === lett.
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  deleteConsumablesNullObjects(userDatas);
  replaceNullsWithUnknown(userDatas);
  var modifiedDatas = bubbleSortByPricesAscending(userDatas);
  insertPicturesAfterAlphabetN(modifiedDatas);
  var spaceshipList = document.querySelector('.spaceship-list');
  intoHTMLSpaceShipList(modifiedDatas, spaceshipList);
  searchForCrew1Ships(modifiedDatas, spaceshipList);
  searchForBiggestCargoCapacity(modifiedDatas, spaceshipList);
  sumAllPassengers(modifiedDatas, spaceshipList);
  searchForLongestShipImageName(modifiedDatas, spaceshipList);
  searchForModels(modifiedDatas);
  addEvents();
}
getData('/json/spaceships.json', successAjax);
