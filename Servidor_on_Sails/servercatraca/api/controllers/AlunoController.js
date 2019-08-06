/**
 * AlunoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

registrar_async:async function(req, res)
{
	await Aluno.create
	  	(
	  		{
	  			id_as_pessoa: req.param('pessoa_id'),
	  			tipo_saida	: req.param('tipo_saida')
	  		}
	  	);
		res.end("Aluno registrado");
}
,
inserir_em_turma:async function(req, res)
{
	found_aluno = await Aluno.findOne({	id:req.param('aluno_mat')	});
	if(found_aluno)
	{
		found_turma = await Turma.findOne({	id:req.param('turma_id')	});
		if(found_turma)
		{
			await Aluno.addToCollection(	found_aluno.id,'Turmas',found_turma.id	);
			//Aluno_turma.registrar(req.param('aluno_mat') , req.param('turma_id') );
			res.end("Registrado aluno na turma "+req.param('turma_id'));	
		}
		else
			res.end("Turma não encontrada");
		//to achando que nem precisa dos else's mesmo
	}
	else
		res.end("Aluno não encontrado");
}


};

