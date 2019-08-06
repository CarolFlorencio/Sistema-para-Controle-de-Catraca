/**
 * AtividadeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  registrar_async:async function(req,res){
  	await Atividade.create
  		({
  			id			: req.param('id'),
  			tipo		: req.param('tipo'),
  			descricao	: req.param('desc')
  		});
  	res.end("Atividade criada");
  },
  inserir_horario:async function(req,res){
  	found_ativ = await Atividade.findOne({	id:req.param('Ativ_id') 	});
  	if(found_ativ)
	{
		found_horario = await Horario.findOne({	id:req.param('Horario_id')	});
		if(found_horario)
		{
			await Atividade.addToCollection(	found_ativ.id,'Cronograma',found_horario.id	);
  			res.end("A Atividade agora possúi um horário novo a mais.");
  		}
  		else
  			res.end("Nenhum horário com tal ID foi encontrado.");
  	}
  	else
  		res.end("Não foi encontrado uma Atividade com tal ID.");
  }

};

