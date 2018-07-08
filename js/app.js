function sortByPricesAsc(userDatas) {
  var pricesAsc = userDatas.slice();
  var change;
  var i = pricesAsc.length;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i - 1; j++) {
      if (pricesAsc[j].cost_in_credits < pricesAsc[j + 1].cost_in_credits) {
        [pricesAsc[j], pricesAsc[j + 1]] = [pricesAsc[j + 1], pricesAsc[j]];
        change = j;
      }
    }
    i = change;
  }
  return pricesAsc;
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
  var pricesAsc = sortByPricesAsc(userDatas);
  console.log(pricesAsc);
}
getData('/json/spaceships.json', successAjax);
