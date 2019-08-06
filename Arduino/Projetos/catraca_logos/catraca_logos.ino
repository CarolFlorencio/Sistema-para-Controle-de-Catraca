#include<Wiegand.h>
#include <SPI.h>
#include <Ethernet.h>
#include <TextFinder.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};

#define PIN1_D0 A3
#define PIN1_D1 A2
#define PIN2_D0 A1
#define PIN2_D1 A0

// Inicializa o display no endereco 0x27
LiquidCrystal_I2C lcd(0x27 ,2,1,0,4,5,6,7,3, POSITIVE);
Wiegand rfidE;
Wiegand rfidS;
IPAddress ip(192,168,26,75);
IPAddress gateway(192,168,26,1);
EthernetClient client;

const int RelePin = 7;
const int pinob = 12;
const int girop1 = 6;
const int girop2 = 5;

char server[] = "192.168.26.115";
bool requested = false;
bool v = true;
bool td = true; //bool para testar se o display já está exibindo o desejado
int tempo = 0;
int resposta;
int s1;
int s2;

void setup() {
  Serial.begin(9600);
  lcd.begin (16,2);
  lcd.setBacklight(LOW);

   //Install listeners and initialize Wiegand reader
   rfidE.onStateChange(stateChanged, "1 RFID");
   rfidE.onReceive(receivedData, "1 RFID");
   rfidE.onReceiveError(receivedDataError, "1 RFID");
   rfidE.begin(Wiegand::LENGTH_ANY, true);
   rfidS.onStateChange(stateChanged, "2 RFID");
   rfidS.onReceive(receivedData, "2 RFID");
   rfidS.onReceiveError(receivedDataError, "2 RFID");
   rfidS.begin(Wiegand::LENGTH_ANY, true);

   //initialize pins as INPUT
  pinMode(PIN1_D0, INPUT);
  pinMode(PIN1_D1, INPUT);
  pinMode(PIN2_D0, INPUT);
  pinMode(PIN2_D1, INPUT);

  pinMode(RelePin, OUTPUT);
  pinMode(pinob, OUTPUT);

  digitalWrite(RelePin, HIGH);
}

void loop() {
  // Checks for pending messages
  rfidE.flush();
  rfidS.flush();

  // Check for changes on the the wiegand input pins
  rfidE.setPin0State(digitalRead(PIN1_D0));
  rfidE.setPin1State(digitalRead(PIN1_D1));
  rfidS.setPin0State(digitalRead(PIN2_D0));
  rfidS.setPin1State(digitalRead(PIN2_D1));

  /*s1 = digitalRead(girop1);
  s2 = digitalRead(girop2);
  if(s1==1 || s2==1){
    exibirDisplay("Libere a catraca", "");
    tone(pinob,261);
  }
  else{
    //if(td){} 
    exibirDisplay("Colegio Logos", "Seja bem-vindo!");
    noTone(pinob);
  }*/
}

// Notifies when a reader has been connected or disconnected.
// Instead of a message, the seconds parameter can be anything you want -- Whatever you specify on `wiegand.onStateChange()`
void stateChanged(bool plugged, const char* message) {
    Serial.print(message);
    Serial.print("- State changed: ");
    Serial.println(plugged ? "CONNECTED" : "DISCONNECTED");
}

void exibirDisplay(String mensagem1, String mensagem2){
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(mensagem1);
  lcd.setCursor(0,1);
  lcd.print(mensagem2);
}

bool verificaEntrada(){
  bool b=false;
  bool b2=false;
  digitalWrite(RelePin, LOW);
  s1 = digitalRead(girop1);
  s2 = digitalRead(girop2);
  while(s1==0 || s2==0){
    s1 = digitalRead(girop1);
    s2 = digitalRead(girop2);
    Serial.print(s1);
    Serial.println(s2);
    if(s1==0 && s2==1){
      digitalWrite(RelePin, LOW);
      b = true;
      break;
    }
    if(s1==1 && s2==0){
      b = false;
      break;
    }
  }
  while(((s1==0 && s2==1) || (s1==1 && s2==1)) && b){
    s1 = digitalRead(girop1);
    s2 = digitalRead(girop2);
    if((s1==1 && s2==0)){
      b2=true;
    }
    tempo++;
    delay(1);
  }
  digitalWrite(RelePin, HIGH);
  return b&&b2;
}
bool verificaSaida(){
  bool b=false;
  bool b2=false;
  digitalWrite(RelePin, LOW);
  s1 = digitalRead(girop1);
  s2 = digitalRead(girop2);
  while(s1==0 || s2==0){
    s1 = digitalRead(girop1);
    s2 = digitalRead(girop2);
    Serial.print(s1);
    Serial.println(s2);
    if(s1==1 && s2==0){
      digitalWrite(RelePin, LOW);
      b = true;
      break;
    }
    if(s1==0 && s2==1){
      b = false;
      break;
    }
  }
  while(((s1==1 && s2==0) || (s1==1 && s2==1)) && b){
    s1 = digitalRead(girop1); 
    s2 = digitalRead(girop2);
    if((s1==0 && s2==1)){
      b2=true;
    }
    tempo++;
    delay(1);
  }
  digitalWrite(RelePin, HIGH);
  return b&&b2;
}

//Faz a liberação da entrada e confirma para o servidor
void entradaLiberada(){
  s1 = digitalRead(girop1);
  s2 = digitalRead(girop2);
  tempo = 0;
  while(tempo <= 5000){
     Serial.println();
     if(verificaEntrada()){
       exibirDisplay("Entrou", " ");
       v =false;
       break;
     }
     else{v = true;}
     tempo++;
     delay(1);
  }
  if(v){
    exibirDisplay("Não entrou", " ");
    v=false;
  }
}

//Faz a liberação da saida e confirma para o servidor
void saidaLiberada(){
  tempo = 0;
  while(tempo <= 5000){
      Serial.println();
      if(verificaSaida()){
        exibirDisplay("Saiu", " ");
        v =false;
        break;
     }
     else{v = true;}
     tempo++;
     delay(1);
  }
  if(v){
    exibirDisplay("Nao saiu", " ");
    v=false;
  }
}

//faz a request para o servidor
void fazRequest(String codigo, char idrfid){
  Ethernet.begin(mac, ip);
  if (client.connect(server, 1337)) 
  {
      String rota = "GET /catraca/liberar?idcard="+codigo+"&idrfid="+idrfid+" HTTP/1.1";
      lcd.setCursor(0,0);
      lcd.print("Conectado!");
      client.println(rota);
      client.println("Connection: close");
      client.println();
      requested = true;
      
  } 
  else {
    exibirDisplay("Falha ao conectar", " ");
    delay(1000);
  }
}
//Funcionamento principal da catraca
//Chama as funções de destravamento e envio do sistema
void enviacodigo(String codigo, char idrfid){
  fazRequest(codigo, idrfid);
  if (requested) {
      TextFinder response(client);
      if(response.find("cod:")){
        resposta = response.getValue();
        Serial.println(resposta);
        if(resposta==1){
          exibirDisplay("Entrada liberada", codigo);
          entradaLiberada();
          /*digitalWrite(RelePin, LOW);
          delay(2000);
          digitalWrite(RelePin, HIGH);*/
        }
        else if(resposta==2){
          exibirDisplay("Saida liberada", codigo);
          saidaLiberada();
          /*tone(pinob,261);
          delay(100);
          noTone(pinob);
          Serial.println("Não foi a resposta");*/
        }
        else if(resposta==3){
          exibirDisplay("Acesso negado!", codigo);
          tone(pinob,261);
          delay(100);
          noTone(pinob);
        }
      }
      else{
        Serial.println("Nadinha.");   
      }
      requested = false;
  }
  client.stop();
}

//Converte o valor do cartão de hexa para decimal
//E chama a função principal da catraca
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
    Serial.print("- Card readed: ");
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
    Serial.print("- Card read error: ");
    Serial.print(Wiegand::DataErrorStr(error));
    Serial.print(" - Raw data: ");
    Serial.print(rawBits);
    Serial.print("bits / ");
    exibirDisplay("Erro na leitura", "Tente novamente!");

    //Print value in HEX
    uint8_t bytes = (rawBits+7)/8;
    for (int i=0; i<bytes; i++) {
        Serial.print(rawData[i] >> 4, 16);
        Serial.print(rawData[i] & 0xF, 16);
    }
    Serial.println();
}
