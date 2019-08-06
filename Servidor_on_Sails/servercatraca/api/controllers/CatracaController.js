/**
 * CatracaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  liberar : async function(req, res)
  {
    var cred = await Credencial.findOne({ id:req.param('idcard') });
    var cod;
    var Agora = new Date();
    if(cred)
    {
      if(cred.validade > Agora)
      {
      //cod=req.param('idrfid'); 
      var User = await Pessoa.findOne({ id:cred.owner }).populate('Participacoes');
      if(User)
        {
        //var Participacoes = await Pessoa.findOne(User).populate('Participacoes');
        for (var i = User.Participacoes.length - 1; i >= 0; i--) 
          {
          var Horarios = await Atividade.findOne({ id: User.Participacoes[i].Ativ_id }).populate('Cronograma');
          Horarios = Horarios.Cronograma;
          for (var i = Horarios.length - 1; i >= 0; i--) 
            {
            //Fix para o Mês e Dia, pois o formato de Date precisa estar em YYYY-MM-DD, se ficar YYYY-M-D, data fica inválida
            var mes = Agora.getMonth()+1;
            if(mes < 10)
              mes = "0"+mes;

            var dia = Agora.getDate();
            if(dia < 10)
              dia = "0"+dia;

            var Agora_em_String = Agora.getFullYear()+'-'+mes+'-'+dia+"T";
            var BRT_to_UTC = "-03:00";

            entrada_inicio = new Date(Agora_em_String+"0"+Horarios[i].entrada_inicio+":00"+BRT_to_UTC);
            res.end(entrada_inicio+" cod:"+req.param('idrfid'))
            }
          }
        res.end( JSON.stringify(User.Participacoes) + " cod:"+req.param('idrfid'));
        }

      }  
      else
        cod=3;
      /*switch(req.param('idrfid'))
      {
        case '1': res.end('resposta:1');
        case '2': res.end('resposta:2');
        default : res.end("resposta:3");
      }
      var user = await Pessoa.find( {id:cred[0].owner}  );
      
      if(user.length != 0)
        res.end(  JSON.stringify(user[0])   );
      else
        res.end("Nenhum usuario tem este cartão");*/
    }
    else
      cod=3;

    Log_catraca.registrar(0,req.param('idrfid'),req.param('idcard'),cod);
    res.end("cod:"+cod);
  //sails.controllers.UsuarioController.registrar(req.param('idcard'));
  //	if(req.param('idcard')=="0")
	//	{res.writeHead(200);}
	//	else
	//	return res.end(req.param('idcard'));
  }
  

};

