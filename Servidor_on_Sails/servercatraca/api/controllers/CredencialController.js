/**
 * CredencialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

registrar_async:async function(req, res)
{
	var pessoa_owner = await Pessoa.findOne({	id: req.param('id_owner')	});
	if(pessoa_owner)
	{
		var permitido_criar = false;
		var valid = new Date();

		switch(req.param('papel'))
		{
			/////////////
			case 'Acompanhante':
				if(await Acompanhante.findOne({	Pessoa_id:pessoa_owner.id	}))
				{	
					valid = new Date('December 31, 2019, 23:59:59'); 
					permitido_criar = true;
				}
				else
					res.end(pessoa_owner.nome+" não é um "+req.param('papel')+".");
				break;
			/////////////
			case 'Aluno':
				if(await Aluno.findOne({	id_as_pessoa:pessoa_owner.id	}))
				{	
					valid = new Date('December 31, 2019, 23:59:59'); 
					permitido_criar = true;
				}
				else
					res.end(pessoa_owner.nome+" não é um "+req.param('papel')+".");
				break;
			/////////////
			case 'Visitante':
				/*var timeplus = req.param('timeplus');
				if (timeplus == null)
					timeplus = 0;
				valid.setHours(valid.getHours()+timeplus);*/
				//implementar criação pra caso user tiver cpf/rg
				valid = new Date(req.param('valid_day'));
				permitido_criar = true;
				break;
			/////////////	
			case 'test':
				permitido_criar = true;
				break;
			/////////////	
		}

		if(permitido_criar)
		{
		  	await Credencial.create
		  	({
		  		id:req.param('id_cred'),
		  		owner:req.param('id_owner'),
		  		papel:req.param('papel'),
		  		validade:valid,
		  	})
			res.end("Credencial registrada para : "+pessoa_owner.id+" "+pessoa_owner.nome);

		}
		else
			res.end(pessoa_owner.id+" "+pessoa_owner.nome);	
	}
  	else
  		res.end("Usuario não encontrado");
  	//res.end(JSON.stringify(found[0]));
	//res.end(found[0].id+" "+found[0].nome+"\n");

}
,
deletar_async:async function(req, res)
{
	await Credencial.destroyOne
	  	({
	  		id:req.param('id_cred'),
	  	});
	res.end("Credencial deletada");
}
,
mostrar_dono:async function(req, res)
{
	var cred = await Credencial.findOne({	id:req.param('id_cred')	});
	if(cred)
	{
		var user = await Pessoa.findOne(	{id:cred.owner}	);
		if(user)
			res.end(	JSON.stringify(user)	);
		else
			res.end("Nenhum usuario tem este cartão");
	}
	else
		res.end("Cartão não encontrado");
}

};

