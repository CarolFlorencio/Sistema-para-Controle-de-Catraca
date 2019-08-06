/*
 * Example on how to use the Wiegand reader library with interruptions.
 */

#include <Wiegand.h>

// These are the pins connected to the Wiegand D0 and D1 signals.
#define PIN_D0 8
#define PIN_D1 9
#define PIN2_D0 10
#define PIN2_D1 11
// The object that handles the wiegand protocol
Wiegand wiegand;
Wiegand wiegand2;

// Initialize Wiegand reader
void setup() {
  Serial.begin(9600);

  //Install listeners and initialize Wiegand reader
  wiegand.onReceive(receivedData, "1Card readed: ");
  wiegand.onReceiveError(receivedDataError, "1Card read error: ");
  wiegand.onStateChange(stateChanged, "1State changed: ");
  wiegand.begin(Wiegand::LENGTH_ANY, true);

  //Install listeners and initialize Wiegand reader
  wiegand2.onReceive(receivedData, "2Card readed: ");
  wiegand2.onReceiveError(receivedDataError, "2Card read error: ");
  wiegand2.onStateChange(stateChanged, "2State changed: ");
  wiegand2.begin(Wiegand::LENGTH_ANY, true);

  //initialize pins as INPUT
  pinMode(PIN_D0, INPUT);
  pinMode(PIN_D1, INPUT);
  //initialize pins as INPUT
  pinMode(PIN2_D0, INPUT);
  pinMode(PIN2_D1, INPUT);
}


// Continuously checks for pending messages and polls updates from the wiegand inputs
void loop() {
  // Checks for pending messages
  wiegand.flush();
  wiegand2.flush();

  // Check for changes on the the wiegand input pins
  wiegand.setPin0State(digitalRead(PIN_D0));
  wiegand.setPin1State(digitalRead(PIN_D1));
  // Check for changes on the the wiegand input pins
  wiegand2.setPin0State(digitalRead(PIN2_D0));
  wiegand2.setPin1State(digitalRead(PIN2_D1));
}

// Notifies when a reader has been connected or disconnected.
// Instead of a message, the seconds parameter can be anything you want -- Whatever you specify on `wiegand.onStateChange()`
void stateChanged(bool plugged, const char* message) {
    Serial.print(message);
    Serial.println(plugged ? "CONNECTED" : "DISCONNECTED");
}

void enviacodigo(String codigo, char idrfid){
  Serial.print(codigo);
  if(idrfid=='1'){
    Serial.println(" ENTRADA.");
  }
  if(idrfid=='2'){
    Serial.println(" SAIDA.");
  }
}

void convertecodigo(String numhex, char idrfid){
  String codigo="";
  String aux = "";
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
  enviacodigo(codigo, idrfid);
}

// Notifies when a card was read.
// Instead of a message, the seconds parameter can be anything you want -- Whatever you specify on `wiegand.onReceive()`
void receivedData(uint8_t* data, uint8_t bits, const char* message) {
    Serial.print(message);
    Serial.print(bits);
    Serial.print("bits / ");
    //Print value in HEX
    uint8_t bytes = (bits+7)/8;
    String codigo = "";
    for (int i=0; i<bytes; i++) {
        codigo+=String(data[i] >> 4, 16);
        codigo+=String(data[i] & 0xF, 16);
    }
    convertecodigo(codigo, message[0]);
}

// Notifies when an invalid transmission is detected
void receivedDataError(Wiegand::DataError error, uint8_t* rawData, uint8_t rawBits, const char* message) {
    Serial.print(message);
    Serial.print(Wiegand::DataErrorStr(error));
    Serial.print(" - Raw data: ");
    Serial.print(rawBits);
    Serial.print("bits / ");

    //Print value in HEX
    uint8_t bytes = (rawBits+7)/8;
    for (int i=0; i<bytes; i++) {
        Serial.print(rawData[i] >> 4, 16);
        Serial.print(rawData[i] & 0xF, 16);
    }
    Serial.println();
}
