// ! Gergő 11-15

// ! 11

function advBubbleSortAsc(advBubbleArray) {
  var i = advBubbleArray.length;
  var change;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (advBubbleArray[j] > advBubbleArray[j + 1]) {
        [advBubbleArray[j], advBubbleArray[j + 1]] = [advBubbleArray[j + 1], advBubbleArray[j]];
        change = j;
      }
    }
    i = change;
  }
  return advBubbleArray;
}

console.log(advBubbleSortAsc([23, 52, 74, 1230, 85, 30, 42, 7, 89]));

// ! 12

function advBubbleSortDesc(advBubbleArray) {
  var filteredArray = splitByType(advBubbleArray).filtered;
  var trashArray = splitByType(advBubbleArray).trash;
  var i = filteredArray.length;
  var change;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (filteredArray[j] < filteredArray[j + 1]) {
        [filteredArray[j], filteredArray[j + 1]] = [filteredArray[j + 1], filteredArray[j]];
        change = j;
      }
    }
    i = change;
  }
  filteredArray = filteredArray.concat(trashArray);
  return filteredArray;
}

function splitByType(inputArray) {
  var filteredArray = [];
  var trashArray = [];
  for (var i = 0; i < inputArray.length; i++) {
    if (typeof inputArray[i] === 'number' && !Number.isNaN(inputArray[i])) {
      filteredArray.push(inputArray[i]);
    } else {
      trashArray.push(inputArray[i]);
    }
  }
  return {
    filtered: filteredArray,
    trash: trashArray
  };
}


console.log(advBubbleSortDesc([23, 52, 74, 1230, 85, 30, 42, 7, 89, 0, 'apple', true, 'samsung']));

// ! 13
// todo Átmenetileg letiltva, mert idegesít a prompt. Csak ki kell venni a kommentből a parancsot.

function inputIntoArray(naturalArray) {
  var inputNumber;
  do {
    inputNumber = parseInt(prompt('Add a number to my array'), 10); // ? 10-es számrendszer
  }
  while (Number.isNaN(inputNumber));
  // ? A push eleve módosítja a tömböt, ha egyenlővé teszem, akkor az elemek számát kapom meg.
  naturalArray.push(inputNumber);
  return naturalArray;
}

function sortModifiedArray(modifiedArray) {
  inputIntoArray(modifiedArray);
  advBubbleSortAsc(modifiedArray);
  return modifiedArray;
}
// console.log(sortModifiedArray([12, 24, 643, 12, 64, 2, 63, 656, 23]));

// ! 14

function mergeTypes(unmergedArray) {
  var mergedArray = [];
  for (var i = 0; i < unmergedArray.length / 2; i++) {
    mergedArray.push(unmergedArray[i]);
    mergedArray.push(unmergedArray[unmergedArray.length - 1 - i]);
  }
  return mergedArray;
}

function combineFunctionsSplitAndMerge(Array) {
  splitByType(Array);
  var numbers = splitByType(Array).filtered;
  var strings = splitByType(Array).trash;
  var mergedArray = numbers.concat(strings);
  mergeTypes(mergedArray);
  return mergedArray;
}

console.log(combineFunctionsSplitAndMerge([3, 6, 12, 'apple', 'samsung', 42,
  'lg', 'lenovo', 'sony', 100]));

// ! 15

function oddOrEven(oddAndEven) {
  var oddArray = [];
  var evenArray = [];
  for (var i = 0; i < oddAndEven.length; i++) {
    if (oddAndEven[i] % 2 === 0) {
      evenArray.push(oddAndEven[i]);
    } else {
      oddArray.push(oddAndEven[i]);
    }
  }
  return {
    odd: oddArray,
    even: evenArray
  };
}
console.log(oddOrEven([32, 2, 634, 312, 463, 8642, 41, 748, 11, 63, 45, 832, 232]));
