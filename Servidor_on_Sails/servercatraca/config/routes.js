/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /catraca/liberar' : 'CatracaController.liberar',

  '/registrar_acompanhante' : { view: 'pages/acompanhante' },
  '/registrar_credencial'    : { view: 'pages/credencial' },
  '/registrar_pessoa'       : { view: 'pages/pessoa' },

  'GET /usuario/registrar'      : 'UsuarioController.registrar',
  'GET /usuario/mostrar'        : 'UsuarioController.mostrar',
  'GET /usuario/mostrar_async'  : 'UsuarioController.mostrar_async',
  'GET /usuario/mostrar_busca'  : 'UsuarioController.mostrar_busca',

  'GET /credencial/registrar'       : 'CredencialController.registrar_async',
  'GET /credencial/deletar'         : 'CredencialController.deletar_async',
  'GET /credencial/mostrar_dono'    : 'CredencialController.mostrar_dono',

  'GET /Pessoa/registrar'           : 'PessoaController.registrar_async',
  'GET /Pessoa/deletar'             : 'PessoaController.deletar_async',
  'GET /Pessoa/mostrar_busca'       : 'PessoaController.mostrar_busca',
  'GET /Pessoa/mostrar_credenciais' : 'PessoaController.mostrar_credenciais',

  'GET /Acompanhante/registrar'          : 'AcompanhanteController.registrar_async',
  'GET /Acompanhante/deletar'            : 'AcompanhanteController.deletar_async',
  'GET /Acompanhante/mostrartodos_async' : 'AcompanhanteController.mostrartodos_async',

  'GET /Aluno/registrar'        : 'AlunoController.registrar_async',
  'GET /Aluno/inserir_em_turma' : 'AlunoController.inserir_em_turma',

  'GET /Turma/registrar'        : 'TurmaController.registrar_async',
  
  'GET /Curso/registrar'        : 'CursoController.registrar_async',

  'GET /Atividade/registrar'      : 'AtividadeController.registrar_async',
  'GET /Atividade/inserir_horario': 'AtividadeController.inserir_horario',

  'GET /Horario/registrar'      : 'HorarioController.registrar_async',

  'GET /Participacao/registrar' : 'ParticipacaoController.registrar_async',
  'GET /Participacao/deletar'   : 'ParticipacaoController.deletar_async',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
