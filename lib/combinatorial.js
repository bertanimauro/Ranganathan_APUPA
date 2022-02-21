/*
 *  DOCUMENTATION: https://docs.google.com/document/d/1CVnv2FmXFHifh5YsABWQ0ZWAHMJzkOdwzh6bFfI_oKI/edit?usp=sharing
 */

/* Count the number of bit in a word of bit pass by number of rule
 @param: (int) number of rule
 @return: (int) count of bit marked to 1
*/
function count_one(n){

  var count = 0;
  var n = BigInt(n);
  while( n ){
    n = BigInt(n) & BigInt(n-BigInt(1));
    count++;
  }
  return count;
}
/* return a bool checking if x is a power of 2 
 @param: (int) number of rule
 @return: (bool) check if x is a power of 2
*/
function isPowerOfTwo(x){
  // x will check if x == 0 and !(x & (x - 1)) will check if x is a power of 2 or not
  x = BigInt(x);
  return (x && !(x & (x - BigInt(1))));
}
/* check if the bit in position i is marked to 1
@param: (int) number of rule
@param: (int) position to check
@return: (bool) chechk if the ith bit of number n is marked 
*/
function checkPosition(n,i){
  n = BigInt(n);
  var bool;
  if( n & (BigInt(1) << BigInt(i)) )
    bool=1;
  else
    bool=0;
  
  return bool;
}

/* Costruct a string of the possiblwe subset of N variable.
if we have 3 variable, A = {a,b,c} the string 110 is the subset {a,b}
if you N=power(2,N) you have the bit word of n variable.
@param: (int) number of variable of the set
@return: (array) all the possible 2^N subset  */
function possibleSubsets(N){
  var str="";
  var arr = new Array();
  for(i = 0;i < (1 << N); ++i){
    for(j = 0;j < N;++j){
      if(i & (1 << j))
        str+="1";
      else
        str+="0";
    }
    arr.push([i,str,count_one(i)]);
    str="";
  }

  return arr;
}
/* Find the larger power of 2 of the number x
@param: (int)  number of rule
@return: (int)  larger power of 2 of the number x
*/
function largest_power(x){
  var x = BigInt(x);
  var y = BigInt(0);
  y=x;
  while((y=((y)>>BigInt(1)))>0){
      x= x|y;
  }
  return BigInt(BigInt(x)+BigInt(1));
}
/* binomial function C(n,k) = n!/(k!(n-k)!)
@param: (int) n
@parama: (int) k
@return: (int) result c*/
function binomial_coefficient(n, k){
    if(k < 0 || k > n){
        return 0;
    }
    if(k == 0 || k == n){
        return 1;
    }
    k = Math.min(k, n - k);  // Take advantage of symmetry
    c = BigInt(1);
    for(i=0; i<(k);i++){
        c = BigInt(c) * BigInt(n - i) / BigInt(i + 1);
    }
    return BigInt(c);
}

/*
Sequence of distribution of String of q digit marked at 1.
n is the position of the first 1. So for example: q = 5 e n = 1
00011111 is a possible sequence. There is only this so the function return 1
For q = 5 and n=2 there is 5 possibility:
00101111- 00110111 - 00111011 - 00111101 - 00111110

q = 1digit: n
q = 2 d: (n(n-1))/2
q = 3 d: (n*(n+1))/2 - C(n+1,2)
q = 4 d: (n*(n+1)*(n+2))/6 - C(n+2,3)
q = 5 d: (n*(n-1)*(n-2)*(n-3))/24 - C(n,4)
q = 6 d: C(n,5)
q = 7 d: C(n,6)
q = 8 d: C(n,7) */
/* sequence for q =1 and n 
@param: (int) n position of first digit
@return: (int) 
*/
function seq1Digit(n){
  return BigInt(n);
}
/* sequence for q =2 and n position of first digit
@param: (int) n position of first digit
@return: (int) 
*/
function seq2Digit(n){
  return BigInt((BigInt(n)*BigInt(n-1))/BigInt(2));
}

/* the sequence of distribution of string of q digit marked at 1.
n is the position of the first digit. For q greater than 2.
 For example: q = 5 e n = 1
00011111 is a possible sequence. There is only this so the function return 1
For q = 5 and n=2 there is 5 possibility:
00101111- 00110111 - 00111011 - 00111101 - 00111110
@param: (int) n position of first digit
@param: (int) q digit marked at 1
@return: (int) result
*/
function seqQMore2Digit(n,q){
  return BigInt(binomial_coefficient(n+q-2,q-1));
}

/* the total sequences of distribution of string of q digit marked at 1 
in a word of n digit*/
function totQDigit(n,q){
   var tot=BigInt(0);
   if(q==0){
     tot = BigInt(1);
   }
   else{
     if(q==1){
       tot = BigInt(n);
     }else{
        tot = BigInt(seqQMore2Digit(n-q+1,q+1));
     }
   }
   return BigInt(tot);
   
}
