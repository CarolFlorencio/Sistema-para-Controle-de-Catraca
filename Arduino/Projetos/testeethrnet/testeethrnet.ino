#include "etherShield.h"
#include "ETHER_28J60.h"

static uint8_t mac[6] = {0x54, 0x55, 0x58, 0x10, 0x00, 0x24};
static uint8_t ip[4] = {192, 168, 26, 50};

static uint16_t port =  80;

ETHER_28J60 e;


void setup() {
  // put your setup code here, to run once:
  e.setup(mac, ip, port);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (e.serviceRequest())
  {
    e.print("<H1>FILIPEFLOP - Teste ENC28J60</H1><br/>");
    e.print("<H3>OLA MUNDO</H3>");
    e.respond();
  }
}
