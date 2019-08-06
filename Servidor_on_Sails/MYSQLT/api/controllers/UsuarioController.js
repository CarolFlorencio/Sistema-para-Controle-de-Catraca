/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  registrar:function(req, res){
  	Usuario.create({nome:req.param('nome')}).exec(
  		function(err,createdUser)
  		{if(err)res.end(err);res.end(createdUser);}
  	);
  	
  	res.end('usuario registrado');
	}
  ,
  mostrar:function(req, res){
  	Usuario.find({nome:req.param('nome')}).exec(
  		function(err,foundUser)
  		{if(err){
  			console.log(err);
  			res.end('nenhum resultado ou algum erro inesperado, veja o console');
  		}
  		if(foundUser.length == 0)
  			res.end('array de resultado retornou, com 0 de tamanho.');
  		else		
  			res.end('array de usuário retornou, com 1 ou mais de tamanho:\n'+foundUser[0].id+" "+foundUser[0].nome);}
  	);

  	/*Usuario.findOne({nome:'engra'}).exec(
  		function(err,foundUser)
  		{if(err)res.end(err);res.end('olha aqui, os cara :'+foundUser);}
  	);*/
  	
	}
  

};

