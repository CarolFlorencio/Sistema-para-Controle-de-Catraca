/**
 * PessoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
registrar_async:async function(req, res)
{
	await Pessoa.create
	  	({
	  		nome 	: req.param('nome'),
	  		rg 		: req.param('rg'),
	  		cpf 	: req.param('cpf'),
	  		email 	: req.param('email')
	  		
	  	});
	res.end("Pessoa registrada");
}
,
deletar_async:async function(req, res)
{
	await Aluno.destroyOne		( 	{id_as_pessoa 	: req.param('id')} 	);
	await Acompanhante.destroy 	(	{Pessoa_id 		: req.param('id')}	);
	await Pessoa.destroyOne 	( 	{id 			: req.param('id')} 	);
	res.end("Pessoa deletada");
}
,
mostrar_busca:async function(req, res)
{
  	var found = await Pessoa.find
  	(
  		{
  			nome: { 'contains' : req.param('nome')}
  		}
  	);
  	
  	//res.end(JSON.stringify(found[0]));
  	
  	/*
	old_method
  	var users = "";	
  		for (var i = 0; i < found.length; i++) 
  			users+=found[i].id+" "+found[i].nome+'\n';

	res.end(users);*/
	req.session.pessoas_found = found;
	res.cookie('pessoas_found', found);
	//return res.json(found);
	res.end(JSON.stringify(req.cookies.pessoas_found));
}

,

mostrar_credenciais:async function(req, res)
{
	var user = await Pessoa.find({id:parseInt(req.param('id_owner'))}).populate('Credenciais');
	res.end(	JSON.stringify(user)	);
}

};

