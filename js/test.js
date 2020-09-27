
function sum(){
    var i=8;
    //闭包访问函数内部变量
    return function(){
      return i
    };
}
console.log(sum());  



// var i=10;
// var i=0;
// console.log(i);
// for(var i=0;i<6;i++) {

// }
// console.log(i);