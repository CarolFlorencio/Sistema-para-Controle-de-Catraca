void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  String WorkingString = "ff";
  long A = strtol(WorkingString.c_str(),NULL,16);
  WorkingString= String(A);
  Serial.println(WorkingString);
}
