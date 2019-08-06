int pinos1 = 9;
int pinos2 = 10;
int pinob = 13;
int pinoe = 6;
int pinos = 7;
int sensor1;
int sensor2;
int estado;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(pinos1, INPUT);
  pinMode(pinos2, INPUT);
  pinMode(pinob, OUTPUT);
  //pinMode(pinoe, INPUT);
  //pinMode(pinos, INPUT);

}

/*bool FuncaoEntrada(){
  while(sensor1==1){
    while(sensor2==1){
      if(sensor1==0){
        Serial.println("Entrada detectada!
      }
    }
  }
}*/

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println(digitalRead(pinos1));
  Serial.println(digitalRead(pinos2));
  sensor1 = digitalRead(pinos1);
  sensor2 = digitalRead(pinos2);
  //estado = digitalRead(pinoe);
  /*if(estado==HIGH){
    Serial.println("Entrada liberada!");
    delay(5000);
  }*/
  if((sensor1==1)||(sensor2==1)){
    Serial.println("Movimento bloqueado!");
    tone(pinob,261);
    //digitalWrite(pinob, HIGH);
    delay(100);
    //digitalWrite(pinob, LOW);
    noTone(pinob);
  }
  
  
}
