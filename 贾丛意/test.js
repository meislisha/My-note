const arr1 = [
  [1, 2],
  [3, 4]
]

const arr = [
  [1, 2],
  [3, 4]
]

// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];

// console.log(Flat(arr1))

function Flat1(arr) {
  let arrResult = []
  arr.reduce((prev, curr) => {
    return prev
    // if (Array.isArray(curr)) {
    //   return prev.concat(Flat1(curr))
    // } else {
    //   return prev.concat(curr)
    // }
  })
  return arrResult
}
console.log(Flat1(arr1))
