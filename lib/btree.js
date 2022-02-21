/*
	LICENSE:
	https://creativecommons.org/licenses/by-nc/4.0/
    This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. 
	To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/ or send a 
	letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

	Documentation
	https://docs.google.com/document/d/1QJjxRaD_LHw_M5fnzLV2U8xGz5VwBdjh8ZJOMGkFL4Y/edit?usp=sharing
	
	
	
	 Costruisce un Btree su un sequenzial spanning curve.
	 I codici di ctalogazione si possono trovare qui:
	   https://docs.google.com/spreadsheets/d/1VsWsd_zifnDutbxkFYsp8sVppiGVKBQKXOvdlTYtsyI/edit?usp=sharing
	 Vengono poi ordinati secondoil mio metodo di spanning curve
	 e messi in un Btree di altezza 3. Può contenere fino a 10^9 combinazioni e 10^12 dati
	 Per esempio 
	   + 210 : matematica
	   + 000 : nel tempo
	   + 060 : tra 1500 e 1600
	   
	   Diviene ilnumero 200106000. Costruendo frasi di soggetto - predicato - oggetto
	
	
	
	*/
		
	
	
	/*
	  Object che tiene traccia dei dati archiviati in BTree
	*/
	function Book(author,titolo){
	   this.author=author;
	   this.titolo=titolo;
	}
	Book.prototype.getAuthor = function(){
	   return this.author;
	}
	Book.prototype.getTitolo = function(){
	   return this.titolo;
	}
	/*
	  Object che tiene traccia della posizione e del numero nel codice di catalogazione
	  nell'oggetto Node
	*/
	function ObjPos(){
	   this.pos = 0;
	   this.num=0;
	}
	ObjPos.prototype.getNum = function(){
	   return this.num;
	}
	ObjPos.prototype.getPos = function(){
	   return this.pos;
	}
	ObjPos.prototype.setNum = function(num){
	   this.num=num;
	}
	ObjPos.prototype.setPos = function(pos){
	   this.pos=pos;
	}
	
	/*
	  Object che è l'elemento base del BTree. forma un array di 1000 elementi
	  ogni 3 cifre della key di catalogazione
	*/
	function Node(){
	   this.divBase = 1000;
	   this.hash = this.createHash(this.divBase);
	}
	Node.prototype.getDivBase =function(){
	   return this.divBase;
	}
	Node.prototype.createHash = function(divBase){
	    var arr = new Array(divBase);
        for(i=0;i<arr.length;i++)
             arr[i]	= null;
        return arr;			 
	}
	Node.prototype.returnHash = function(){
	   return this.hash;
	}
	Node.prototype.setPositionOfHash =function(pos,obj){
	   this.hash[pos]= obj
	}
	Node.prototype.getPositionOfHash =function(pos){
	   return this.hash[pos];
	}
	Node.prototype.getPosition = function(num,base){
	   
	   var result = base/this.divBase; 
	   var obj = new ObjPos();
	   
	   if(num<=base){  
		 if(num<result){
	       obj.setPos(0);
	       obj.setNum(result);
	     }else{
	       obj.setPos(Math.floor(num/result));
	       obj.setNum(result);
	     }
	   }else{
	     if((num%base)>result){
		   obj.setPos(Math.floor((num%base)/result));
	       obj.setNum(result);
		 }else{
		   obj.setPos(0);
	       obj.setNum(result);
		 } 
	   }
	   //$( "<p>pos= "+obj.getPos()+" num: "+obj.getNum()+" numAttuale:"+num+" result:"+result+"</p>"  ).appendTo("#content" );
	   return obj;
	}
	
	/*
	  Object che costruisce il BTree
	*/
	function BTree(){
	    this.head = new Node();
	}
	BTree.prototype.getHead = function(){
	   return this.head;
	}
	/*
	   funzione che gestisce l'inserimento. 
	   @num: è la key di catalogazione
	   @base: è il numero massimo rappresentabile nella catalogazione
	   @obj: è il dato sul libro
	   @node: è il nodo attraversando l'albero
	*/
	BTree.prototype.insert = function(num,base,obj,node) {
	    var n = node;
		var objPosition= n.getPosition(num,base);
		var p =0;
		if(base<=n.getDivBase()){
		  p=(num%n.getDivBase());
		  if(n.getPositionOfHash(p)==null){
		     n.setPositionOfHash(p,new Array());
			 n.getPositionOfHash(p).push(obj);
			 $( "<p>**pos= "+p+" num: "+objPosition.getNum()+" obj: "+n.getPositionOfHash(p)+"</p>"  ).appendTo("#content" );
		  }else{
		     n.getPositionOfHash(p).push(obj);
			 $( "<p>*pos= "+p+" num: "+objPosition.getNum()+" obj: "+ n.getPositionOfHash(p)+"</p>"  ).appendTo("#content" );
		  }
		}else{
		    
		   $( "<p>pos= "+objPosition.getPos()+" num: "+objPosition.getNum()+"</p>"  ).appendTo("#content" );
		   if(n.getPositionOfHash(objPosition.getPos())==null){
		       
		       n.setPositionOfHash(objPosition.getPos(),new Node());
			   
			   this.insert(num,objPosition.getNum(),obj,n.getPositionOfHash(objPosition.getPos()));
			   
		   }else{
		       this.insert(num,objPosition.getNum(),obj,n.getPositionOfHash(objPosition.getPos()));
		   }
		}
  
    }
	/*
	   funzione che gestisce la ricerca. 
	   @key: è la key di catalogazione
	   @base: è il numero massimo rappresentabile nella catalogazione
	   @node: è il nodo attraversando l'albero
	*/
	BTree.prototype.search = function(key,base,node){
	    var n = node;
		var objPosition= n.getPosition(key,base);
		var p =0;
		var arr=null;
		if(base<=n.getDivBase()){
		  p=(key%n.getDivBase());
		  
		  if(n.getPositionOfHash(p)==null){
		     return null;
		  }else{
		     $( "<p><b>SS</b> pos= "+p+" num: "+objPosition.getNum()+" obj: "+(n.getPositionOfHash(p))+"</p>"  ).appendTo("#content" );
		     return n.getPositionOfHash(p);
			 
		  }
		}else{
		    
		   $( "<p><b>S</b> pos= "+objPosition.getPos()+" num: "+objPosition.getNum()+"</p>"  ).appendTo("#content" );
		   if(n.getPositionOfHash(objPosition.getPos())==null){  
		       return null;   
		   }else{
		       return this.search(key,objPosition.getNum(),n.getPositionOfHash(objPosition.getPos()));
		   }
		}
		
	}
	/*
	   funzione che combina due ricerche ricerca. 
	   @key1: è la prima key di catalogazione
	   @key2: è la seconda key di catalogazione
	   @base: è il numero massimo rappresentabile nella catalogazione
	   @node: è il nodo attraversando l'albero
	*/
	BTree.prototype.combineSearch = function(key1,key2,base,node){
	    var arr = arr2 = null;
		arr=this.search(key1,base,node);
		arr2=this.search(key2,base,node);
		return this.joinArray(arr,arr2);
	}
	/*
	  funzione che fa iljoin sql di due array.
	  Qui c'è un errore. non restituisce un array di oggetti Book
	*/
	BTree.prototype.joinArray = function (left, right) {

        var joined = left.map(function(e) {
         return Object.assign({}, e, right.reduce(function(acc,val) {
          if (val.author == e.author) {
            return val;
          } else{
		    return acc;
		  }
         }, {}))
        });
		
		return joined;

    }
	
