/**
 * AcompanhanteController
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
	
	await Acompanhante.create
	  	({
	  		id 			: req.param('pessoa_id')+'_'+req.param('aluno_mat'),
	  		Pessoa_id 	: req.param('pessoa_id'),
	  		Aluno_mat 	: req.param('aluno_mat'),
	  		validade 	: valid,
	  	});
	res.end("Relação pessoa/aluno registrada");
}
,
deletar_async:async function(req, res)
{
	await Acompanhante.destroyOne
	  	(
	  		{
	  			id : req.param('pessoa_id')+'_'+req.param('aluno_mat'),
	  		}
	  	);
	res.end("Relação pessoa/aluno deletada");
}
,
mostrartodos_async:async function(req, res)
{
	var acomp = await Acompanhante.find();
	if(acomp.length != 0)
	{
		var acomp_stringfyd = "";
		//for(var a in acomp)
		//	acomp_stringfyd+=a.validade+"\n";
  		for (var i = 0; i < acomp.length; i++) 
  			acomp_stringfyd+=acomp[i].id+" "+acomp[i].validade+'\n';
		res.end(acomp_stringfyd);
	}
	else
		res.end("Nenhum acompanhante registrado");
}
};

