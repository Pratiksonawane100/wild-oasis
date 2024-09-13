let arr = [10, 11, 7, 12, 14];
// let b = [];
let sum = 0;
for (let i = 0; i < arr.length - 1; i++) {
  // b.push(Math.abs(arr[i + 1] - arr[i]));
  sum += Math.abs(arr[i + 1] - arr[i]);
}
// const total = b.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   0
// );

console.log(sum);
