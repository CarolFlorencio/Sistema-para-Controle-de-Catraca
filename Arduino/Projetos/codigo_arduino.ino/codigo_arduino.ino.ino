#include <Wiegand.h>

WIEGAND wg;
String numhex;
String codigo="";
void setup() {
	Serial.begin(9600);  
	
	// default Wiegand Pin 2 and Pin 3 see image on README.md
	// for non UNO board, use wg.begin(pinD0, pinD1) where pinD0 and pinD1 
	// are the pins connected to D0 and D1 of wiegand reader respectively.
	wg.begin(8,9);
}

void loop() {
	if(wg.available())
	{
		numhex=String(wg.getCode(), HEX);
    String aux = "";
    for(int i=numhex.length(); i<6; i++){
      aux+="0";
    }
    numhex= aux+numhex;
    long A;
    for(int i=0; i<numhex.length(); i++){
      aux+=numhex[i];
      if(i==1){
        A = strtol(aux.c_str(), NULL, 16);
        aux="";
      }
    }
    long B = strtol(aux.c_str(), NULL, 16);
    codigo+=String(A);
    aux="";
    for(int i=codigo.length(); i<3; i++){
      aux+="0";
    }
    codigo=aux+codigo+String(B);
		Serial.print("CARD ID= ");
    Serial.print(A);
    Serial.print(",");
    Serial.print(B);
    Serial.print(", STRING CARD ID= ");
    Serial.print(codigo);
		Serial.print(", Type W");
		Serial.println(wg.getWiegandType());
    codigo="";    
	}
 
}
