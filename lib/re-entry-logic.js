//https://docs.google.com/document/d/1qYehjY-RjO-kfjEFcdL_hNmAQDRTWLm2ULRNnQAMJeo/edit?usp=sharing

/*
@param {string} : string of the calculus
@param {int} : number of variables of the calculus
 */
function calculus(str,str2,n,m){
  var a = new ThreeValuesLogic(n);
  
  return a.trasformString(str,str2,m);
}

/*
Class ThreeValuesLogic implements a three values logic as describe in 
https://docs.google.com/document/d/12UAwwtUGkLGJy1gHfo6DsfBjEatK_8zz-NSwuLclPBM/edit?usp=sharing
@param {n} : , number of variable. The limit is 50 then the time grows exponentially */
function ThreeValuesLogic(n) {
     this.n = n; 
     this.variableCalculus = null;
     this.variableChange = new Array(); 
}

/* 
0 0 0
0 0 1
0 0 2
0 1 0
0 1 1
0 1 2
0 2 0
0 2 1
0 2 2
first colum max = 9 and time to 3
second colum max = 3 and times = 9
third colum max =1 and times =27
@param {int} : max
@param {int} : time */
ThreeValuesLogic.prototype.privateTablesOfVariables = function(max,time){
	    
  var arr=new Array();
  var i,j;
    for(i=0;i<time;i++){
      for(j=0; j<max;j++){
        arr.push(i%3);
      }
    }
  return arr;

}

/*
@param {int} max
@param {int} time
@param {int} a: the value of the variable, 0,1,2

 */
ThreeValuesLogic.prototype.privateTablesOfVariables2 = function(max,time,a){
	    
  var arr=new Array();
  var i,j;
    for(i=0;i<time;i++){
      for(j=0; j<max;j++){
        arr.push((i%3)==a?1:0);
      }
    }
  return arr;

}

/* With this function I have created the combinations of n variables with 3 possible values */
ThreeValuesLogic.prototype.createTablesOfVariables = function(){
     var arr = new Array();
     var arr2 = new Array();
     var i,j;
     for(i=0;i<this.n;i++){
         arr.push(this.privateTablesOfVariables(Math.pow(3,this.n-1-i),Math.pow(3,1+i)));
     }

     for(i=0;i< arr[0].length;i++){
       arr2[i] = new Array();
       for(j=0;j<arr.length;j++){
           arr2[i].push(arr[j][i]);
       }
     }

     return arr2;
}

/* With this function I write the variables of the calculus */
ThreeValuesLogic.prototype.createVariableofCalcolus = function(){
     var arr = new Array();
     var arr2 = new Array();
     var i,j;
     for(i=0;i<this.n;i++){
       for(j=0;j<3;j++){
         arr.push(this.privateTablesOfVariables2(Math.pow(3,this.n-1-i),Math.pow(3,1+i),j%3));
       }
     }

     for(i=0;i< arr[0].length;i++){
       arr2[i] = new Array();
       for(j=0;j<arr.length;j++){
           arr2[i].push(arr[j][i]);
       }
     }

     this.variableCalculus = arr2;
}

ThreeValuesLogic.prototype.trasformString = function(str,str2,m){
    this.createVariableofCalcolus();
    this.constructVariableChange(str2);
    var arr= new Array();
    var strTemp=str;
    var str3="";
    var i,j;
    for(i=0;i<this.n;i++){
       
       str = str.replaceAll("("+String.fromCharCode(97 +i)+")","\""+this.getVariableChangeModified((i))+"\"");
       
    }
    str = str.replaceAll("and","this.aB");
       str = str.replaceAll("or","this.oB");
       str = str.replaceAll("imply","this.iB");
       str = str.replaceAll("not","this.nB");
       str = str.replaceAll("set","this.sB");

    arr.push(eval(str));
    for(j=0;j<m;j++){
      str3=strTemp;
       for(i=0;i<this.n;i++){
        str3 = str3.replaceAll("("+String.fromCharCode(97 +i)+")","\""+this.getVariableChangeModified(i)+"\"");
       }
       str3 = str3.replaceAll("and","this.aB");
       str3 = str3.replaceAll("or","this.oB");
       str3 = str3.replaceAll("imply","this.iB");
       str3 = str3.replaceAll("not","this.nB");
       str3 = str3.replaceAll("set","this.sB");
       arr.push(eval(str3));
    }
    return arr;
          
    
}

ThreeValuesLogic.prototype.constructVariableChange = function(str){
   var i,j;
   var arr;
   for(i=0;i<this.n;i++){
      str = str.replaceAll("["+String.fromCharCode(97 +i)+"]",""+(i*3));
       str = str.replaceAll("("+String.fromCharCode(97 +i)+")",""+((i*3)+1));
       str = str.replaceAll("{"+String.fromCharCode(97 +i)+"}",""+((i*3)+2));
   }
   arr = str.split(",");
   for(j=0;j<this.n;j++){
       this.variableChange.push(this.getVariableChange(Number(arr[j])));
   }

}
 
ThreeValuesLogic.prototype.getVariableChange = function(i){
     var str="";
     var j;
     for(j=0;j<this.variableCalculus.length;j++){
       str+=this.variableCalculus[j][i];
     }

     return str;
}

ThreeValuesLogic.prototype.getVariableChangeModified = function(i){
     
     
       return  this.variableChange[i];

}

ThreeValuesLogic.prototype.sB = function(a,b){
     this.variableChange[b.charCodeAt(0)-97]= a;
     return this.variableChange[b.charCodeAt(0)-97];
     
}

ThreeValuesLogic.prototype.aB = function(a,b){
     var i;
     var c = "";
     for(i=0;i<a.length;i++){
       c += String(Number(a.charAt(i)) & Number(b.charAt(i)));
     }

     return c;
}

ThreeValuesLogic.prototype.oB = function(a,b){
     var i;
     var c = "";
     for(i=0;i<a.length;i++){
       c += String(Number(a.charAt(i)) | Number(b.charAt(i)));
     }

     return c;
}

ThreeValuesLogic.prototype.iB = function(a,b){
     var i;
     var c = "";
     for(i=0;i<a.length;i++){
       c += String(this.privatenB(Number(a.charAt(i))) | Number(b.charAt(i)));
     }

     return c;
}

ThreeValuesLogic.prototype.nB = function(a){
     var i;
     var c = "";
     for(i=0;i<a.length;i++){
       c += this.privatenB(a.charAt(i));
     }

     return c;
}

ThreeValuesLogic.prototype.privatenB = function(a){
     var i;
     var c = "";
       c = (a=='0')?'1':'0';
     

     return c;
}
