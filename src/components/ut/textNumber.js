import IdentityCodeValid from "./IDNumberCheck";

function textNumber1(text){
 var tip = '';
 var pass =true;
  if(text.length>10){
    tip = '输入太长，超出限制';
    pass = false;
  }else{
    tip = '';
    pass = true;
  }


  return pass;
}

function textNumber2(text){
  var tip = '';
  var pass =true;
  if(text.length>200){
    tip = '输入太长，超出限制';
    pass = false;
  }else{
    tip = '';
    pass = true;
  }


  return pass;
}
export default {
  textNumber1,
  textNumber2,
};
