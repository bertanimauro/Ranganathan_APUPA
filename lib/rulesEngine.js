/*
LICENSE:
	https://creativecommons.org/licenses/by/4.0/
    This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. 
	To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/ or send a 
	letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

DOCUMENTATION: https://github.com/bertanimauro/cellularAutomata ,
   https://docs.google.com/document/d/1_jLowlngU4MUw19gQKWvuj_xNGgHBrPqOjRrXnUPido/edit?usp=sharing , 
   Awbrey Jon, Propositional equation reasoning systems, Oeis wiki, (2003) url: https://oeis.org/wiki/Propositional_Equation_Reasoning_Systems


*/

var max;


/*
Dato il numero di variabili (totVariable) del calcolo proposizionale
trova i valori numerici (cellular automa) delle singole variabili. 
Le ritorna in ordine in un array, la prima è nominata la variabile a, poi b, poi c...
fino a z, poi a1, b1, c1,...z1 e così via. La seconda metà dell'array sono le variabili
della prima metà negate con operatore bitwise:
 *
 * @param  {int} number of variables of predicate calcolus
 * @return {arr[]} numeric value of the variable of predicate calcolus, the second half are the variable negated. 
 */
function constructVariable(totVariable){    
     var arr = new Array();
     var arr2 = new Array();
     max = Math.pow(2,totVariable);

     for(k=1;k<=(totVariable);k++){
         arr.push(privateConstructVariable1(max,Math.pow(2,k)));
     }
    for(i=0;i<arr.length;i++){
         arr[i]= BigInt("0b"+arr[i]);
    }
    for(j=0;j<arr.length;j++){
         arr2.push(negationBitwise(arr[j],max));
    }
    return arr.concat(arr2);
}

/*
Metodo privato per ConstructVariable
 *
 * @param  {int} max number of bit of a word
 * @param  {int} max number of time the loop iterate 
 * @return {String} the number in base 2 of the single variable of predicate calcolus. 
 */
function privateConstructVariable1(max,time){
  var str="";
    for(i=1;i<=time;i++){
      for(j=0;j<(max/time);j++){
        str += (((i%2)==0)? "0" : "1");
      }
    }
  return str;
}

/* Costruisce trueTable del calcolo proposizionale in totVariable variabili 
 * @param  {int} number of variables of predicate calcolus
 * @return {arr[]} true table 
 */
function trueTable(totVariable){
    var arr = new Array();
     var arr2 = new Array();
     var arr3 = new Array();
     max = Math.pow(2,totVariable);

     for(k=1;k<=(totVariable);k++){
         arr.push(privateTrueTable1(max,Math.pow(2,k)));
     }
    for(i=(arr[0].length-1);i>=0;i--){
        for(j=0;j<arr.length;j++){
          arr3.push(arr[j][i]);
        }
        arr2.push(arr3);
        arr3 = new Array();
    }
       

    
    return arr2;

}
/* 
 * Data una frase logica calcola cosa ne consegue. Massimo 9 variabili. Il ritorno
 * è una stringa in DNF format e il numero della rule
 * @param {String} string of the logical sentence to evaluate
 * @param {int} number of variables of predicate calcolus
 * @return {arr[]} The conseguent logic sentence in DNF format and the number of the rule  
 */
function cellularAutomata(str,totVariable){
    var arrNum = new Array();
    var arrReturn = new Array();
    var str3 = "";
    var str2="";
    arr=trueTable(totVariable);
    num = BigInt(evaluateFormula(str,totVariable));
    strNum = convertBase(num.toString(), 10, 2);
    numDigit= Math.pow(2,totVariable);
    for(i=(strNum.toString()).length;i<numDigit;i++){
        strNum = "0"+strNum;
    }

    for(i=(strNum.length-1);i>=0;i--){
       arrNum.push(strNum.charAt(i));
    }
    
    for(i=0;i<arr.length;i++){
      for(j=0;j<arr[0].length;j++){
        if(arrNum[i]!=0){
          if(j!=(arr[0].length-1)){
            str3 += ((arr[i][j]==1)? (String.fromCharCode(97 +j)+ " && "):(" !"+ String.fromCharCode(97 +j) + " && ") ) 
          }else{
            str3 += ((arr[i][j]==1)? (String.fromCharCode(97 +j)):(" !"+ String.fromCharCode(97 +j) ) ) 
          }
        }
      }
      if(arrNum[i]!=0){
        if(i!=(arr.length-1)){
          str2 += "( "+str3+" ) || ";
        }else{
          str2 += "( "+str3+" ) ";
        }
      }
      str3="";
    }

    arrReturn.push(str2.substring(0,str2.length-3));
    arrReturn.push(num);
  return arrReturn;
}
/*
 * private function of TrueTable
 * @param  {int} max number of bit of a word
 * @param  {int} max number of time the loop iterate 
 * @return {arr[]} the number in base 2 of the single variable of predicate calcolus. 
 */
function privateTrueTable1(max,time){
  var arr=new Array();
    for(i=1;i<=time;i++){
      for(j=0;j<(max/time);j++){
        arr.push(((i%2)==0)? "0" : "1");
      }
    }
  return arr;
}
/* Restituisce la bitwise negation di parole a nbit bit, a is a bigInt 
 * @param  {BigInt} number to convert in his negation
 * @param  {int} number of bit of a word 
 * @return {BigInt} the bitwite negation of a in a nbit word
*/
function negationBitwise(a,nbit) {
  //Make incoming value a modulus of some integer
  //I just use 1000 for the example
  var max = BigInt(Math.pow(2,nbit));
  a=BigInt(a);
  a=~a;
  a = a % max;
  //Force a positive
  while (a < 0) {
    a += max;
  }
  //Return object regerence for chaining
  return a;
}

/* Restituisce il numero della rule della conseguente della frase logica in str 
 * @param  {String} logic sentense
 * @param  {int} number of variable of predicate calcolus 
 * @return {BigInt} rule of the consequent of str
*/
function evaluateFormula(str,totVariable){
    var arr = constructVariable(totVariable);
    var str2;
    for(i=0;i<(arr.length/2);i++){
      str2="-"+String.fromCharCode(97 +i);
      str=str.replaceAll(str2," BigInt( '"+arr[i].toString()+"' ) ");
    }
    
    /*return BigInt(eval(eval(str)));*/
    return BigInt(eval(str));
}


function andBit(a,b){
   return BigInt(eval(" ( BigInt('" + a + "') & BigInt('" + b+"') ) "));

}

function orBit(a,b){
   return BigInt(eval(" ( BigInt('"+ a +"') | BigInt('" + b+"') ) "));
}

function impliesBit(a,b){
   return BigInt(eval(" ( BigInt('"+negationBitwise(a,max) +"') | BigInt('" + b+"') ) "));
}

function notBit(a){
   return BigInt(eval(" ( BigInt('"+negationBitwise(a,max) +"') ) "));

}
/*https://www.py4u.net/discuss/280717 
funzione privata di convertBase
*/
function parseBigInt(bigint, base) {
  //convert bigint string to array of digit values
  for (var values = [], i = 0; i < bigint.length; i++) {
    values[i] = parseInt(bigint.charAt(i), base);
  }
  return values;
}
/*https://www.py4u.net/discuss/280717
funzione privata di convertBase
 */
function formatBigInt(values, base) {
  //convert array of digit values to bigint string
  for (var bigint = '', i = 0; i < values.length; i++) {
    bigint += values[i].toString(base);
  }
  return bigint;
}
/* https://www.py4u.net/discuss/280717
 * Converte un BinInt in formato stringa da inputBase ad OutputBase
 * @param  {String} BigInt to converte base
 * @param  {int} base of binInt
 * @param  {int} base to convert binInt 
 * @return {String} bigint convert in base outputBase
*/
function convertBase(bigint, inputBase, outputBase) {
  //takes a bigint string and converts to different base
  var inputValues = parseBigInt(bigint, inputBase),
    outputValues = [], //output array, little-endian/lsd order
    remainder,
    len = inputValues.length,
    pos = 0,
    i;
  while (pos < len) { //while digits left in input array
    remainder = 0; //set remainder to 0
    for (i = pos; i < len; i++) {
      //long integer division of input values divided by output base
      //remainder is added to output array
      remainder = inputValues[i] + remainder * inputBase;
      inputValues[i] = Math.floor(remainder / outputBase);
      remainder -= inputValues[i] * outputBase;
      if (inputValues[i] == 0 && i == pos) {
        pos++;
      }
    }
    outputValues.push(remainder);
  }
  outputValues.reverse(); //transform to big-endian/msd order
  return formatBigInt(outputValues, outputBase);
}
