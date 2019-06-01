function fn(i){
  var i = 10
  return function(n){
    console.log(n + (++i));
  }
  
}

var f = fn()
f(10)
f(15)
fn(15)(12)
fn(20)(13)