var userDatas = [];

function splitByType() {
  var filteredArray = [];
  var trashArray = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i].cost_in_credits !== 'unknown') {
      filteredArray.push(userDatas[i]);
    } else {
      trashArray.push(userDatas[i]);
    }
  }
  return {
    filtered: filteredArray,
    trash: trashArray
  };
}

function sortByPricesAsc() {
  var filteredData = splitByType(userDatas).filtered;
  var unknowns = splitByType(userDatas).trash;
  var change;
  var i = filteredData.length - 1;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (filteredData[j].cost_in_credits !== 'unknown') {
        if (parseInt(filteredData[j].cost_in_credits, 10) > parseInt(filteredData[j + 1].cost_in_credits, 10)) {
          [filteredData[j], filteredData[j + 1]] = [filteredData[j + 1], filteredData[j]];
          change = j;
        }
      }
    }
    i = change;
  }
  var mergedData = filteredData.concat(unknowns);
  return mergedData;
}

function deleteConsumablesNullObjects(userDatasConsumable) {
  var lastI = userDatasConsumable.length;
  for (var i = 0; i < lastI; i++) {
    if (userDatasConsumable[i].consumables === null) {
      userDatasConsumable.splice(i, 1); // ? Törli az i indexű elemét a tömbnek
      i--;
      lastI--;
    }
  }
  return userDatasConsumable;
}

function replaceNullWithUnknown(userDatasReplace) {
  for (var i = 0; i < userDatasReplace.length; i++) {
    for (var k in userDatasReplace[i]) {
      if (userDatasReplace[i][k] === null) {
        userDatasReplace[i][k] = 'unknown';
      }
    }
  }
}

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
  userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  deleteConsumablesNullObjects(userDatas);
  replaceNullWithUnknown(userDatas);
  var modifiedDatas = sortByPricesAsc(userDatas);
  var crew1 = searchForCrew1(userDatas);
  var biggestCargo = searchForBiggestCargoCap(userDatas);
  var allPassengers = sumAllPassengers(userDatas);
  var longestShipImage = searchForLongestShip(userDatas);
  console.log(modifiedDatas);
  console.log('1 fős legénységgel rendelkező hajók száma:');
  console.log(crew1);
  console.log('A legnagyobb rakományú hajó');
  console.log(biggestCargo);
  console.log(`Az összes utas száma: ${allPassengers}`);
  console.log('A leghosszabb hajó képének neve');
  console.log(longestShipImage);
}
getData('/json/spaceships.json', successAjax);
