/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//Query info: https://sailsjs.com/documentation/concepts/models-and-orm/query-language
module.exports = {
  
registrar:function(nome)
{
  	Usuario.create({nome:req.param('nome')}).exec
  	(
  		function(err,createdUser)
  		{
  			if(err)res.end(err);
  			res.end(createdUser);
  		}
  	);
}

,

registrar:function(req, res)
{
  	Usuario.create({nome:req.param('nome')}).exec
  	(
  		function(err,createdUser)
  		{
  			if(err)res.end(err);
  			res.end(createdUser);
  		}
  	);
  	
  	res.end('usuario registrado');
}

,

mostrar:function(req, res)
{
  	Usuario.find
  	(
  		{
  			nome: req.param('nome')
  		}
  	).exec
  	(
  		function(err,foundUser)
  		{if(err)
  			{
  			console.log(err);
  			res.end('nenhum resultado ou algum erro inesperado, veja o console');
  			}
  		if(foundUser.length == 0)
  			res.end('array de resultado retornou, com 0 de tamanho.');
  		else		
  			res.end('array de usuário retornou, com 1 ou mais de tamanho:\n'+foundUser[0].id+" "+foundUser[0].nome);
  		}
  	);
}

,

mostrar_busca:function(req, res)
{
  	Usuario.find
  	(
  		{
  			nome: { 'contains' : req.param('nome')}
  		}
  	).exec
  	(
  		function(err,foundUser)
  		{if(err)
  			{
  			console.log(err);
  			res.end('nenhum resultado ou algum erro inesperado, veja o console');
  			}
  		if(foundUser.length == 0)
  			res.end('array de resultado retornou, com 0 de tamanho.');
  		else
  			{		
  			var users = "";	
  			for (var i = 0; i < foundUser.length; i++) 
  				users+=foundUser[i].id+" "+foundUser[i].nome+'\n';

  			res.end('array de usuário retornou, com 1 ou mais de tamanho:\n'+users);
  			}
  		}
  	);
}

,

mostrar_async:async function(req, res)
{
  	var found = await Usuario.find
  	(
  		{
  			nome: req.param('nome')
  		}
  	);
  	//res.end(JSON.stringify(found[0]));
	res.end(found[0].id+" "+found[0].nome+"\n");

}

};

