/**
 * Aluno.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {


  attributes: {
    id              : { type: 'number', columnName:'matricula', autoIncrement: true },
    //id: { type: 'string' , columnName: 'matricula', required: true },
    tipo_saida      : { type: 'string' , isIn: ['Vermelho','Verde']},
    tipo_ensino     : { type: 'string'},
    
    id_as_pessoa    : { model:'Pessoa' , unique:true , required:true },

    Acompanhantes   : {
        collection: 'Acompanhante',
        via: 'Aluno_mat'
    },
    //Ao invés da Aluno_turma, isso: https://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many
    Turmas          : {
        collection: 'Turma',
        via: 'Alunos'
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

