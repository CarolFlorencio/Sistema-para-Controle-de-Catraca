
#define RF_G 10
#define RF_W 8
int count = 0;
int oldcount=0;
unsigned int rfid=0;

void setup() {
  Serial.begin(9600);
  pinMode(RF_G,INPUT_PULLUP);
  pinMode(RF_W,INPUT_PULLUP);
  //attachInterrupt(digitalPinToInterrupt(RF_G), data0, FALLING);
  //attachInterrupt(digitalPinToInterrupt(RF_W), data1, FALLING);

}

void loop() {
  // put your main code here, to run repeatedly:
  if(digitalRead(RF_G) + digitalRead(RF_W)<2)
  {
    Serial.print(digitalRead(RF_G));
    Serial.println(digitalRead(RF_W));
    count++;
  }
  if(count!=0 && digitalRead(RF_G) + digitalRead(RF_W)==2 && oldcount!=count)
    {Serial.println(count);oldcount=count;}
  /*
  if(count == 0 && digitalRead(RF_G) + digitalRead(RF_W)<2)
  {
      Serial.println("Added");count++;
  }
  if(count > 0 && count < 27)
    {
    Serial.print(digitalRead(RF_G));
    Serial.print(digitalRead(RF_W));
    Serial.print(" ");
    Serial.println(count);
    count++;
    }*/

    
  /*if(count>0 && digitalRead(RF_G) + digitalRead(RF_W)==2 && oldcount != count)
    {Serial.println(count);
    oldcount = count;
    }*/

  /*if((count>=26)&&(rfid!=0))
  {
    rfid=rfid>>1;
    Serial.print("RFID Tag: ");
    Serial.println(rfid,DEC);
    count=0;
    rfid=0;
  }*/
}

/*void data0()
{
  rfid=(rfid<<1);
  count++;
}

void data1()
{
  rfid=(rfid<<1)|1;
  count++;
}*/
