/**
 * CursoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
registrar_async:async function(req, res)
{
	await Curso.create
	  	(
	  		{
	  		    id 			: req.param('id_curso'),
	  		    nome		: req.param('nome'),
	  		    descricao 	: req.param('descricao')
	  		}
	  	);
	res.end("Turma registrada");
}

};

