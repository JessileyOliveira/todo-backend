'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use("App/Models/Category");
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    const user = await User.find(auth.user.id);
    const categories = await user.category().with("checklist").fetch();

    return response.status(200).json({ error: false, message: "Categorias encontradas com sucesso!", data: categories});
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    
    const data = request.only(['text']);
    data.user_id = auth.user.id;

    const category = await Category.create(data);

    return response.status(201).json({ error: false, message: "Categoria cadastrada com sucesso!", data: category});
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ response, request }) {
    return response.status(201).json({ error: false, message: "Categoria encontrada com sucesso!", data: request.findedCategory});
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ response, request }) {
    const category = request.findedCategory;
    const data = request.only(["text"]);
    category.merge(data);

    await category.save();

    return response.status(200).json({ error: false, message: "Categoria encontrada com sucesso!", data: category});
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ request, response }) {
    await request.findedCategory.delete();
    return response.status(200).json({ error: false, message: "Categoria deletada com sucesso!", data: request.findedCategory});
  }
}

module.exports = CategoryController
