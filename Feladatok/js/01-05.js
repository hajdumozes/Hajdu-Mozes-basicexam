//! Gergő feladatok 1-5

var arr = [3, 12, 5, 14, 65, 1, 11, 19, 8, 34, 45];
var smallest = arr[0];
var biggest = arr[0];
var avg = 0;
var sum = 0;
var even = 0;

for (var k in arr) {
  // ? ESLINT miatt került be ez a sor
  if (arr.hasOwnProperty(k)) {
    sum += arr[k];
    if (arr[k] < smallest) {
      smallest = arr[k];
    }
    if (arr[k] > biggest) {
      biggest = arr[k];
    }
    if (arr[k] % 2 === 0) {
      even += 1;
    }
  }
}
avg = Math.round(sum / arr.length);
console.log(`A legkisebb szám ${smallest}, a legnagyobb pedig ${biggest}.`);
console.log(`A számok összege ${sum}, átlaguk pedig kerekítve ${avg}.`);
console.log(`A páros elemek száma ${even}.`);
