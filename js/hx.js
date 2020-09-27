// for(i=2;i<100;i++) {
//   var tag=true;//判断100以内质数
//   for(j=2;j<=Math.sqrt(i);j++) {
//     if(i%j==0) {
//       tag=false;
//     }
//   }
//   if(tag==true) {
//     console.log(i);
//   }
// }

// // 1.xiaoshuo-ss-sfff-fe  变为驼峰xiaoshuoSsSfffFe
// function getCamelCase(str) {
//   var arr = str.split("-"); //将字符串按-切割为字符串数组
//   return arr.map(function (item, index) {
//     //map方法函数里面三个参数   依次:item必选=数组的值   index=数组元素的索引  arr=当成元素所属数组对象
//     if (index === 0) {
//       return item;
//     } else {
//       return item.charAt(0).toUpperCase() + item.slice(1);
//       //charAt() 方法可返回指定位置的字符
//       //arrayObject.slice(start,end):从已有的数组中返回选定的元素,自动把字符串看成数组
      
//     }
//   }).join('');//将数组按指定符号拼接成字符串 如不指定按逗号

// }//思路:将字符串用split成字符数组，用map将数组转换为新的数组，数组用join方法拼成新的字符串
// console.log(getCamelCase("xiaoshuo-ss-sfff-fe"))

// // // //2.数组去重
// function qc(arr){
//   var n=[];
//   for(i in arr){
//     if(n.indexOf(arr[i])===-1){ //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置 没有则返回-1
//       n.push(arr[i])
//     }
//   }
//   return n;
// }
// console.log(qc([1,1,2,3,3,5]))

// function unique(arr){
//   var arr1=[arr[0]];
//   for(i=1;i<arr.length;i++){
//     if(arr.indexOf(arr[i])==i) arr1.push(arr[i]);
//   }
//   return arr1;
// }
// console.log(unique([1,2,3,1,2]));

//获取最先没重复值了的值加入数组
// function unique2(arr){
//   var r=[];
//   for(var i=0,l=arr.length;i<l;i++){
//     for(var j=i+1;j<l;j++){
//       if(arr[i]===arr[j]) j=++i;
//     }
//     console.log(arr[i]);
//     r.push(arr[i]);
//   }
//   return r;
// }
// unique2([1,1,2,3]);
//(2) var arry =[1,25,15,1,2,15,5,15,25,35,1]
// var set =new Set(arry)
// console.log(set)
// console.log([...set])

// (x) => x + 6相当于
//  function(x){
//   return x + 6;
// }
// const removeDuplicateItems=arr => [...new Set(arr)];
// console.log(removeDuplicateItems([1,1,2,2]));

// //Array.from方法可以将 Set 结构转为数组。
//    //这就提供了去除数组重复成员的另一种方法。
//    const items = new Set([1, 2, 3, 4, 5]);
//    const array = Array.from(items);
//    console.log(array);//[1, 2, 3, 4, 5]
 
  //  function dedupe(array) {//这就提供了去除数组重复成员的另一种方法。
  //    return Array.from(new Set(array));
  //  }
 
  //  console.log(dedupe([1, 1, 2, 3, 2, 5, 3]));//[1,2,3,5]

  // // 3.统计字符串中出现次数最多的字母
  // function getChar(str) {
  //   if (typeof (str) != "string") return;
  //   const obj = [];
  //   //1.const定义的变量不可以修改，而且必须初始化。
  //   //2.var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
  //   //3.let是块级作用域，函数内部使用let定义后，对函数外部无影响。
  //   for (let i = 0; i < str.length; i++) {
  //     let char = str.charAt(i);
  //     obj[char] = obj[char] || 0;
  //     obj[char]++;
  //   }
  //   let maxChar;
  //   let maxNum = 0;
  //   for (let key in obj) {
  //     if (obj[key] > maxNum) {
  //       maxChar = key;
  //       maxNum = obj[key];
  //     }
  //   }
  //   return maxChar;
  // }
  // console.log(getChar("abbbbbc"))

  // //4.字符串反序
  // console.log("say I love you".split("").reverse().join(""));
  // ---------------------------------------------------

  // 5.合并多个有序数组
  // var arr=[[0,1],[-1,1],[2,3,4]];
  // arr=arr.reduce((a,b)=>a.concat(b)).sort((a,b)=>a-b);
  // console.log(arr);
  //map和reduce的区别：map返回的是个集合，函数依次作用到每一个元素，每个元素都会被函数单独作用一次。
  //reduce返回的是函数经过执行运算后的结果，reduce累计运算,前两个元素作用得到结果后，继续和下一个元素运算
  //sort默认按照第一个元素大小排序，设定a，b后有campareFunction a-b>0则a排在b后

  // 考虑去重（数组转化为对象，利用对象键名唯一性，然后.keys一次性取键名）
  //无论arr是不是空数组，forEach返回的都是undefined。这个方法只是将数组中的每一项作为callback的参数执行一次。
  //map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。
  var arr = [
    [5, 1],
    [-1, 1],
    [2, 3, 4]
  ];
  var obj = {};
  arr = arr.forEach(item => item.forEach(num => obj[num] = true))
  arr = Object.keys(obj).map(num => +num).sort((a, b) => a - b);
  console.log(arr);
//Object.leys可获取对象的属性名 题目中为["1","2"...]  返回字符串数组  +num为强制类型转换(number)"1"=1


