'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User")

class VerifyCategory {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */

  async handle ({ response, request, auth, params }, next) {
    // call next to advance the request
    const user = await User.find(auth.user.id);
    let category_id = request.body.category_id ? request.body.category_id : params.id;
    const findedCategory = await user.category().with("checklist").where({id: category_id}).fetch();
    if(findedCategory.rows.length > 0){
      request.findedCategory = findedCategory.rows[0];
    }else{
      return response.status(404).json({ message: "Categoria não encontrada!", error: true })
    }
    
    await next()
  }
}

module.exports = VerifyCategory
