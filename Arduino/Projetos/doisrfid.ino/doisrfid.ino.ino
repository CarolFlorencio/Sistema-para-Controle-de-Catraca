#include <Wiegand.h>

WIEGAND entrada;
WIEGAND saida;

void setup() {
	Serial.begin(9600);  
	
	// default Wiegand Pin 2 and Pin 3 see image on README.md
	// for non UNO board, use wg.begin(pinD0, pinD1) where pinD0 and pinD1 
	// are the pins connected to D0 and D1 of wiegand reader respectively.
	entrada.begin(10,11);
  saida.begin(8,9);
}
String convertecodigo(String numhex){
  String codigo="";
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
  codigo= aux+codigo+String(B);
  return codigo
}
void loop() {
	if(entrada.available())
	{
		String numhex=String(entrada.getCode(), HEX);
    Serial.print("CARD ID= ");
    Serial.print(convertecodigo(numhex));
    Serial.print(", ENTRADA");
		Serial.print(", Type W");
		Serial.println(entrada.getWiegandType());    
	}
 if(saida.available())
 {
    String numhex=String(saida.getCode(), HEX);
    Serial.print("CARD ID= ");
    Serial.print(convertecodigo(numhex));
    Serial.print(", ENTRADA");
    Serial.print(", Type W");
    Serial.println(saida.getWiegandType());    
  }
 
}
