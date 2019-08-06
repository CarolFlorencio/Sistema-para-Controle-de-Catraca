/**
 * Acompanhante.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {


  attributes: {
    //owner: { model:'Pessoa' , required:true },
    id          : { type: 'string' , columnName: 'PessoaId_AlunoMat', required: true },
    //Que tal criar uma chave que, na hora de registrar, pega pessoa_id+"_"+aluno_matricula, e busca usando "pessoa_id_%"?

    tipo        : { type: 'string'},    
    validade    : { type: 'ref' , columnType: 'timestamp' , defaultsTo: +new Date()},

    //Mesmo criando uma ID que guarde os dois, bom registrar aqui embaixo, para poder utilizar as funções relacionais do sails
    Pessoa_id   : { model:'Pessoa', required:true },
    Aluno_mat   : { model: 'Aluno', required:true },

    //aluno_matricula: { type: 'number', required:true },

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

