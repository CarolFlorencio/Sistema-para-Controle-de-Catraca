/**
 * HorarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  registrar_async:async function(req,res){
  	await Horario.create
  		({
  			id				     : req.param('id'),
  			dia_semana		 : req.param('dia_semana'),
  			entrada_inicio : req.param('e_inicio'),
  			entrada_fim    : req.param('e_fim'),
  			saida_inicio   : req.param('s_inicio'),
  			saida_fim      : req.param('s_fim')
  		});
      res.end("Horário Registrado");
  }

};

