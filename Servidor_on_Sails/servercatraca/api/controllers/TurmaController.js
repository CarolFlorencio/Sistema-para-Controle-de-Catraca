/**
 * TurmaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
registrar_async:async function(req, res)
{
	await Turma.create
	  	(
	  		{
	  		    id 			: req.param('id_turma'),
	  		    turno 		: req.param('turno'),
	  		    curso_id 	: req.param('curso_id')
	  		}
	  	);
	res.end("Turma registrada");
}

};

