const int girop1 = 9;
const int girop2 = 10;
int pinob = 13;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(girop1, INPUT);
  pinMode(girop2, INPUT);
  pinMode(pinob, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  Serial.print(digitalRead(girop1));
  Serial.println(digitalRead(girop2));
  if(verificaEntrada()){
    Serial.println("Entrou");
    delay(5000);
  }
  
}
