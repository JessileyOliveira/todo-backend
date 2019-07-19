'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class VerifyChecklist {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params }, next) {
    // call next to advance the request

    let findedChecklist = await request.findedCategory.checklist().where({ id: params.id }).fetch();
    
    if(findedChecklist.rows.length > 0){
      request.findedChecklist = findedChecklist.rows[0];
    }else{
      return response.status(404).json({ error: true, message: "Item de checklist náo encontrado!"});
    }

    await next()
  }
}

module.exports = VerifyChecklist
