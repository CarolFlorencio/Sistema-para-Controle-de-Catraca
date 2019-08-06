/**
 * ParticipacaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
registrar_async:async function(req, res)
{
	var valid = new Date();
	var timeplus = req.param('timeplus');
	if (timeplus == null)
		timeplus = 0;
	valid.setHours(new Date().getHours()+timeplus);
	
	if(Participacao.findOne(	{id:req.param('papel')+'_'+req.param('pessoa_id')+'_'+req.param('ativ_id')})	)
		res.end("Usuário já possúi esta participação.")

	await Participacao.create
	  	({
	  		id 			: req.param('papel')+'_'+req.param('pessoa_id')+'_'+req.param('ativ_id'),
	  		papel 		: req.param('papel'),
	  		Pessoa_id 	: req.param('pessoa_id'),
	  		Ativ_id 	: req.param('ativ_id'),
	  		validade 	: valid,
	  	});
	res.end("Pessoa agora participa de atividade com ID "+req.param('ativ_id'));
}
,
deletar_async:async function(req, res)
{
	await Participacao.destroyOne
	  	(
	  		{
	  			id : req.param('papel')+'_'+req.param('pessoa_id')+'_'+req.param('ativ_id')
	  		}
	  	);
	res.end("Participação deletada");
}
,

};

