// ! Gergő feladatok 6-10

var arr = [3, 12, 5, 14, 65, 1, 11, 19, 8, 34, 45];
var arrayUnordered = [23, 42, 123, 53, 12, 23, 51, 5323, 53, 23, 5151];

// ! 6-7
function sortAsc(inputArray) {
  for (var i = 0; i < inputArray.length - 1; i++) {
    for (var j = i + 1; j < inputArray.length; j++) {
      if (inputArray[i] > inputArray[j]) {
        [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
      }
    }
  }
  console.log(inputArray);
  console.log(`A tömb második legkisebb eleme: ${inputArray[1]}`);
  console.log(`A tömb harmadik legnagyobb eleme: ${inputArray[inputArray.length - 3]}`);
  return inputArray;
}

sortAsc(arr);
// ! 8-9

/* Keresés és kiírás egybe
  function searchLinear(inputArrayLinear) {
  var found = false;
  var searched = 23;
  for (var i = 0; i < inputArrayLinear.length; i++) {
    if (inputArrayLinear[i] === searched) {
      found = true;
      console.log(`A tömb tartalmazza a következő számot: ${searched}`);
      break;
    }
  }
  if (!found) {
    console.log(`A tömb nem tartalmazza a következő számot: ${searched}`);
  }
} */

function searchLinear(inputArrayLinear) {
  var found = false;
  var searched = 23;
  var i = 0;
  while (i < inputArrayLinear.length && !found) {
    if (inputArrayLinear[i] === searched) {
      found = true;
    }
    i++;
  }
  return {
    searched: searched,
    found: found
  };
}

function searchLogarithmic(inputArrayBin) {
  var found = false;
  var searched = 23;
  var firstIndex = 0;
  var lastindex = inputArrayBin.length - 1;
  var middleIndex;
  while (!found && firstIndex <= lastindex) {
    middleIndex = Math.floor((firstIndex + lastindex) / 2);
    if (inputArrayBin[middleIndex] === searched) {
      found = true;
    } else if (searched < inputArrayBin[middleIndex]) {
      lastindex = middleIndex - 1;
    } else {
      firstIndex = middleIndex + 1;
    }
  }
  return {
    searched: searched,
    found: found
  };
}


// todo A két keresést nem írom ki külön, csak a két függvényt kell kicserélni a változóknál.
// todo erőforrásilag hülyeség, de felváltva raktam be őket, hogy az ESLINT kussoljon.
function consoleLogSearchResult(inputArrayCLG) {
  var searched = searchLogarithmic(inputArrayCLG).searched;
  var found = searchLinear(inputArrayCLG).found;
  if (found) {
    console.log(`A tömb tartalmazza a következő számot: ${searched}`);
  } else {
    console.log(`A tömb nem tartalmazza a következő számot: ${searched}`);
  }
}
consoleLogSearchResult(arr);

// ! 10

function searchLinearMultiple(inputArrayLinearMultiple) {
  var found = 0;
  var searched = 23;
  var i = 0;
  while (i < inputArrayLinearMultiple.length) {
    if (inputArrayLinearMultiple[i] === searched) {
      found++;
    }
    i++;
  }
  return {
    searched: searched,
    found: found
  };
}


function consoleLogSearchResultMultiple(inputArrayCLGMultiple) {
  var searched = searchLinearMultiple(inputArrayCLGMultiple).searched;
  var found = searchLinearMultiple(inputArrayCLGMultiple).found;
  if (found) {
    console.log(`A tömb a következő számot(${searched}) ennyiszer tartalmazza: ${found}`);
  } else {
    console.log(`A tömb nem tartalmazza a következő számot: ${searched}`);
  }
}
console.log('A 10. feladathoz készített tömb:');
console.log(arrayUnordered);
consoleLogSearchResultMultiple(arrayUnordered);
