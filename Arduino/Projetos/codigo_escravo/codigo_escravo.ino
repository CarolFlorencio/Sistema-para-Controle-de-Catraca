/*                                                                       
      RoboCore - Tutorial Comunicacao entre Arduinos: UART (Slave)      
                                                      (03/05/2015)

  Escrito por Marcelo Farias.
 
  Exemplo de como comunicar Arduinos utilizando o protocolo UART.
  
  Altera o estado do LED conectado a placa Slave quando o botao ligado 
  a placa Master for pressionado.
  
  Na placa Master foi utilizado um botao conectado ao pino 4, com o 
  resistor de pullup interno da placa acionado e realizou-se um debounce
  em software. Na placa Slave foi utilizado um LED conectado ao pino 7.
  
  Optou-se por usar um software serial para nao conflitar com a serial
  em hardware no momento da gravacao do codigo, contudo, nada impede de
  utilizar a serial em hardware para este mesmo propósito.
  
  Referencias:
  Exemplo Debounce - https://www.arduino.cc/en/Tutorial/Debounce

*/

#include "SoftwareSerial.h" // Inclui a biblioteca SoftwareSerial
#include <Wire.h>
#include <LiquidCrystal_I2C.h>


#define ledPin 13 // numero do pino onde o LED esta conectado

// Cria uma serial em software 
SoftwareSerial blackBoardMaster(2,3); // (RX, TX)
LiquidCrystal_I2C lcd(0x27 ,2,1,0,4,5,6,7,3, POSITIVE);

bool b = true;

void setup() {
  // inicia a serial em software com uma taxa de 9600 bit/s
  blackBoardMaster.begin(9600);
  lcd.begin (16,2);
  
  pinMode(ledPin, OUTPUT);  // configura o pino do LED como saida
}

void loop() {
  // verifica se existem dados para serem lidos na serial
  if (blackBoardMaster.available() > 0){
    // le o byte recebido
    char received = blackBoardMaster.read();
    
    
    digitalWrite(ledPin, b);
    b=!b;
    // se o byte recebido corresponde ao caractere '0'(48) apaga o LED
    if (received == '0'){
      exibirDisplay("Entrada Liberada", "Entre!");
    }
    
    // se o byte recebido corresponde ao caractere '1'(49) acende o LED
    if (received == '1'){
      exibirDisplay("Saida Liberada", "Saia!");
    }
  }
}
void exibirDisplay(String mensagem1, String mensagem2){
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(mensagem1);
  lcd.setCursor(0,1);
  lcd.print(mensagem2);
}
