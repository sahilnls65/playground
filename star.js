// let n = 11;
// let q = Math.ceil(n / 2);
// let str = "";

// for (let i = 0; i <= n; i++) {
//   if (i <= q) {
//     for (let j = 0; j < i; j++) {
//       str += "* ";
//     }
//     str += "\n";
//   } else {
//     for (let k = 0; k < 2 * q - i; k++) {
//       str += "* ";
//     }
//     str += "\n";
//   }
// }

// console.log(str);

// 1
// 2 9
// 3 8 10
// 4 7 11 14
// 5 6 12 13 15

// let n = 5;
// let str = "";

// let temp = 0;
// let arr = [];

// for (let i = 0; i < n; i++) {
//   for (let j = 0; j <= i; j++) {
//     temp++;
//     arr.push(temp);
//   }
// }

// let temp2 = 0;

// for (let k = 0; k < n; k++) {
//   const tempSlice = arr.slice(temp2, temp2 + n - k);
//   temp2 += n - k;
//   str += tempSlice;
//   str += "\n";
// }

// console.log(str);

// A function to convert a simpleSchema to an itemSchema

