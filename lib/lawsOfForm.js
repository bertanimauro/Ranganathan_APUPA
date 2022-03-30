/*
     Implementation of the rule of sobstitution about the book of laws of form of G Spencer-Brown
     Chapter 5 (A calculus taken out of the calculus) and Chapter 6 (The primary algebra)
     
     https://docs.google.com/document/d/1-RoNCgkf38dObIocaA6lb2k0OfaNkKQgSDfBqUUklFE/edit?usp=sharing

     Call LoFTheorem(str) where str is a conforme string to laws of form calcolus of chapter 5-6.
     cross is build by brackets "()". So for example Theorem 8 invariance is write as str = (p(p)) = .
*/
function theorem8(str){
   const re = /\(\(([a-z]{1})\)([a-z]{1})\)/g;
   var arr = str.match(re);
  
   if((arr != null) ){ 
      for(i=0;i<arr.length;i++){
        str = str.replace(arr[i],"");
      }
   }
      
  return str;
}

function theorem9(str){
   const re = /\(\(([a-z]{1})([a-z]{1})\)\(([a-z]{1})([a-z]{1})\)\)/;
   var arr = str.match(re);
  
   while((arr != null) && (arr[1].localeCompare(arr[3]!= 0) && (arr[2].localeCompare(arr[4])==0)) ){ 
        str = str.replace(arr[0],"(("+arr[1]+")("+arr[3]+"))"+arr[2]);
        arr = str.match(re);
   }
      
  return str;
}

function reflectionAndPrimaryForm(str) {
   var str5 = str;
   var str2=null;
   var str3="";
   do{
      str4 = str5;
      str2 = str4.match(/(\(\(([a-z]+)\)\))/g);
      if(str2!= null){
        for(i=0;i<str2.length;i++){
          str3 = str2[i].match(/[a-z]+/);
          str5 = str4.replace(str2[i],str3);
        }
      }
      str2 = null;
      str5 = str5.replaceAll("()()", "()");
      str5 = str5.replaceAll("(())", "");
   }while(str4.localeCompare(str5)!= 0)

   return str5;
}

function integration(str){
  var arr = str.match(/\(\)[a-z]{1}/g);
  
   if((arr != null) ){ 
      for(i=0;i<arr.length;i++){
        str = str.replace(arr[i],"()");
      }
   }
      
  return str;
}

function generation(str){
   const re = /\(([a-z]{1})([a-z]{1})\)([a-z]{1})/;
   var arr = str.match(re);
  
   while((arr != null) && (arr[2].localeCompare(arr[3]== 0) && (arr[1].localeCompare(arr[2])!=0)) ){ 
        str = str.replace(arr[0],"("+arr[1]+")"+arr[2]);
        arr = str.match(re);
   }
      
  return str;
}

function occultation(str){
   const re = /\(\(([a-z]{1})\)([a-z]{1})\)([a-z]{1})/;
   var arr = str.match(re);
  
   while((arr != null) && (arr[1].localeCompare(arr[3]== 0) && (arr[1].localeCompare(arr[2])!=0)) ){ 
        str = str.replace(arr[0],arr[1]);
        arr = str.match(re);
   }
      
  return str;
}

function iteration(str){
   const re = /([a-z]{2})/g;
   var arr = str.match(re);
  
   if((arr != null) ){ 
      for(i=0;i<arr.length;i++){
        if((arr[i].charAt(0))==(arr[i].charAt(1)))
           str = str.replace(arr[i],arr[i].charAt(0));
      }
   }
      
  return str;
}

function extension(str){
   const re = /\(\(([a-z]{1})\)\(([a-z]{1})\)\)\(\(([a-z{1}])\)([a-z]{1})\)/;
   var arr = str.match(re);
  
   while((arr != null) && (arr[1].localeCompare(arr[3]== 0) && (arr[2].localeCompare(arr[4])==0)) ){ 
        str = str.replace(arr[0],arr[1]);
        arr = str.match(re);
   }
      
  return str;
}

function echelon(str){
   const re = /\(\(\(([a-z]{1})\)([a-z]{1})\)([a-z]{1})\)/;
   var arr = str.match(re);
  
   while((arr != null) && (arr[1].localeCompare(arr[2]!= 0) && (arr[2].localeCompare(arr[3])!=0)) ){ 
        str = str.replace(arr[0],"("+arr[1]+arr[3]+")"+"(("+arr[2]+")"+arr[3]+")");
        arr = str.match(re);
   }
      
  return str;
}

function modifiedTrasposition(str){
   const re = /\(\(([a-z]{1})\)\(([a-z]{1})([a-z]{1})\)\(([a-z]{1})([a-z]{1})\)\)/;
   var arr = str.match(re);
  
   while((arr != null) && (arr[1].localeCompare(arr[2]!= 0) && (arr[2].localeCompare(arr[4])!=0) && (arr[3].localeCompare(arr[5]== 0))) ){ 
        str = str.replace(arr[0],"(("+ arr[1] + ")("+arr[2]+")("+arr[4]+"))(("+arr[1]+")("+arr[3]+"))");
        arr = str.match(re);
   }
      
  return str;
}

function LoFTheorem(str){
    var str2 =str;
    var str3 = str;
    do{
        str2=str3;
        str3 = reflectionAndPrimaryForm(str3);
        str3 = integration(str3);
        str3 = generation(str3);
        str3 = occultation(str3);
        str3 = iteration(str3);
        str3 = extension(str3);
        str3 = echelon(str3);
        str3 = modifiedTrasposition(str3);
        str3 = theorem8(str3);
        str3 = theorem9(str3);
        
    }while(str3.localeCompare(str2)!= 0)

    return str3;
}

function LoF(str) {
   var str2 = "";
   while(str.localeCompare(str2)!= 0){
      str2 = str.replaceAll("(())", "");
      str = str2.replaceAll("()()", "()");
   }
   return str;
}
