/**
 * Log_catraca.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id          : { type: 'string', columnName:'id_log', required: true },
    log_time    : { type: 'ref' , columnType: 'timestamp' , defaultsTo: +new Date()},
    id_catraca  : { type: 'string' },
    id_rfid     : { type: 'string' },
    id_card     : { type: 'string' },
    cod         : { type: 'number' , required:true },
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

    registrar: async function (id_catraca,id_rfid,id_card,cod) {
        var now = new Date();
        await Log_catraca.create
        (
            {
            id          : now+":"+id_card,
            log_time    : now,
            id_catraca  : id_catraca,
            id_rfid     : id_rfid,
            id_card     : id_card,
            cod         : cod
            }
        );
    }

};

