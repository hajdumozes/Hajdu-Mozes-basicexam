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
    DOM.innerHTML += `<div class="div-mozes${i}" onclick="putToTheSideDiv(${modifiedDatasInput[i]})"> 
    <pre> ${JSON.stringify(modifiedDatasInput[i], null, 4)}
    <img src='../img/${modifiedDatasInput[i].image}' class="imageMozes" 
    alt='${modifiedDatasInput[i].model}'
    </pre> </div>`;
    document.querySelector('.div-mozes' + i).addEventListener('click', putToTheSideDiv(modifiedDatasInput, i));
  }
}

// ! 5. feladat
function putToTheSideDiv(modifiedDatasInput, index) {
  var sideDiv = document.querySelector('.one-spaceship');
  sideDiv.style.color = 'white';
  sideDiv.innerHTML += `<pre>${JSON.stringify(modifiedDatasInput[index], null, 4)}</pre>`;
}


//
/*
function addEvents(modifiedDatas) {
  var sideDiv = document.querySelector('.one-spaceship');
  sideDiv.style.color = 'white';
  var myDivs = document.querySelectorAll('.div-mozes');
 for (var i = 0; i < myDivs.length; i++) {
    /*myDivs[i].addEventListener('click', function () {
      console.log(i);
      // console.log(JSON.stringify(modifiedDatas[1], null, 4));
      sideDiv.innerHTML = `<pre>${JSON.stringify(modifiedDatas[1], null, 4)}</pre>`;
    });
  }
}
*/
/*
function searchForCrew1(userDatasCrew) {
  var crew1 = [];
  for (var i = 0; i < userDatasCrew.length; i++) {
    if (userDatasCrew[i].crew === '1') {
      crew1.push(userDatasCrew[i]);
    }
  }
  return crew1;
}

function searchForBiggestCargoCap(userdatasCargo) {
  var max = userdatasCargo[0];
  for (var i = 0; i < userdatasCargo.length; i++) {
    if (parseInt(userdatasCargo[i].cargo_capacity, 10) > parseInt(max.cargo_capacity, 10)) {
      max = userdatasCargo[i];
    }
  }
  return max;
}

function sumAllPassengers(userdatasPassengers) {
  var passengersSum = 0;
  for (var i = 0; i < userdatasPassengers.length; i++) {
    if (userdatasPassengers[i].passengers !== 'unknown') {
      passengersSum += parseInt(userdatasPassengers[i].passengers, 10);
    }
  }
  return passengersSum;
}

function searchForLongestShip(userdatasLength) {
  var max = userdatasLength[0];
  for (var i = 0; i < userdatasLength.length; i++) {
    if (parseInt(userdatasLength[i].lengthiness, 10) > parseInt(max.lengthiness, 10)) {
      max = userdatasLength[i];
    }
  }
  var maxImage = max.image;
  return maxImage;
}

function sortByModelNames() {
  var userDatasByModel = userDatas.slice();
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

function searchForModels() {
  var userDataModels = sortByModelNames();
  // ? Kisbetűssé kell alakítani a keresett elemet, meg a potenciális találatot is.
  var searched = (document.querySelector('#search-text').value).toLowerCase();
  var found = false;
  var i = 0;
  while (i < userDataModels.length && !found) {
    if (userDataModels[i].model.toLowerCase().indexOf(searched) > -1) {
      found = true;
      // ? Az első paraméter a bevitt objektum, a második az objektum módosítása, végül helykihagyás.
      alert(JSON.stringify(userDataModels[i], null, 4));
    }
    i++;
  }
  if (!found) {
    var divSW = document.querySelector('.spaceship-list');
    divSW.innerHTML += "<img src='../img/itsatrap.jpg' style='display:block; margin:0 auto'/>";
    alert("It's a trap! There is no model like that!");
  }
}
*/
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
  // addEvents(modifiedDatas);
  // spaceshipList.innerHTML += `< pre > ${ jsonModifiedDatas } </pre > `;
  /*
  var crew1 = searchForCrew1(userDatas);
  var biggestCargo = searchForBiggestCargoCap(userDatas);
  var allPassengers = sumAllPassengers(userDatas);
  var longestShipImage = searchForLongestShip(userDatas);
  console.log(modifiedDatas);
  console.log('1 fős legénységgel rendelkező hajók száma:');
  console.log(crew1);
  console.log('A legnagyobb rakományú hajó');
  console.log(biggestCargo);
  console.log(`Az összes utas száma: ${ allPassengers } `);
  console.log('A leghosszabb hajó képének neve');
  console.log(longestShipImage);
  */
}
getData('/json/spaceships.json', successAjax);
