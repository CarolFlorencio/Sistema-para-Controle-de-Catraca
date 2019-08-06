/**
 * Horario.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //id seria algo como seg_manha ou terca_integrado_tarde
    id              : { type: 'string' , columnName: 'horario_cod' , required: true },
    //falta decidir como vamos fazer, pegar algo tipo data ou uma string? por enquanto string.
    //https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
    //https://stackoverflow.com/questions/1181219/determine-if-a-date-is-a-saturday-or-a-sunday-using-javascript
    dia_semana      : { type: 'string' },
    //mesma coisa para horário
    entrada_inicio  : { type: 'string' },
    entrada_fim     : { type: 'string' },

    saida_inicio    : { type: 'string' },
    saida_fim       : { type: 'string' },
    //Ideia: usar as strings para gerar um novo Date na hora da comparação
    Atividade_owner : { model:'Atividade' }
    //Realmente precisa de um owner pra horário? resposta é: sim, o Sails reclama de uma relação sem retorno
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

