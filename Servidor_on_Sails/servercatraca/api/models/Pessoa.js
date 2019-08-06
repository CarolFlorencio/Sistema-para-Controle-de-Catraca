/**
 * Pessoa.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

cascadeOnDestroy: true,

attributes: {
    id              : { type: 'number' , autoIncrement: true },
    nome            : { type: 'string' },
    rg              : { type: 'string' },
    cpf             : { type: 'string' },
    email           : { type: 'string' , unique:true },
    sexo            : { type: 'string' },
    //datanasc        : { type: 'ref' , columnType: 'timestamp' , defaultsTo: +new Date() , required:false},
    
    id_as_aluno     : {
        //id_as_aluno é a chave relacional que indica os atributos de aluno que uma pessoa tem, se ela for aluno(a).
        //model:'Pessoa' , unique:true 
        //Em teoria, deveria ser algo como uma relação 1x1, mas através do collection, posso pegar vvvvvvv
        //relações através de Aluno que tenham "id_as_pessoas" igual ao ID as pessoas. bem mais fácil. 
        collection: 'Aluno',
        via: 'id_as_pessoa'
    },

    Credenciais     : {
        //Credenciais são os meios de autenticação para a entrada e saida de uma pessoa
        collection: 'Credencial',
        via: 'owner'
    },

    Acompanhamentos : {
        //Acompanhamento é a relação de acompanhante responsável-aluno de uma pessoa. Apenas responsáveis possúem.
        collection: 'Acompanhante',
        via: 'Pessoa_id'
    },

    Carros          : {
        collection: 'Carro',
        via: 'owner'
    },    

    Participacoes   : {
        //Participações são as atividades que a pessoa possúi
        collection: 'Participacao',
        via: 'Pessoa_id'
    }
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

