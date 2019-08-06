#include <SPI.h>
#include <Ethernet.h>


byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};

IPAddress ip(192,168,26,50);
IPAddress gateway(192,168,26,1);
EthernetClient client;

//char server[] = "www.google.com";
char server[] = "192.168.26.110";
//Meio alternativo para pegar o servidor/site: 
//IPAddress server(192,168,26,110);

void setup() {
  // put your setup code here, to run once:
    Serial.begin(9600);
    while (!Serial) {;}
    if (Ethernet.begin(mac) == 0) 
    {
        Serial.println("Falha ao configurar Ethernet usando o DHCP");
        Ethernet.begin(mac, ip);
    }
    delay(1000);
    Serial.println("Conectando...");

    if (client.connect(server, 80)) 
    {
        Serial.println("Conectado!");
        client.println("GET /search?q=arduino HTTP/1.1");
        client.println("Host: www.google.com");
        client.println("Connection: close");
        client.println();
    } 
    else {Serial.println("Falha ao conectar.");}
}

void loop() {
    if (client.available()) {
        char c = client.read();
        Serial.print(c);
    }
    if (!client.connected()) {
        Serial.println();
        Serial.println("Desconectando.");
        client.stop();

        while(true);
    }
}
