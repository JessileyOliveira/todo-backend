'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Checklist = use("App/Models/Checklist");

/**
 * Resourceful controller for interacting with checklists
 */
class ChecklistController {

  /**
   * Create/save a new checklist.
   * POST checklists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([ 'text' ]);

    const checklist = await request.findedCategory.checklist().create(data);

    return response.status(201).json({ error: false, message: "Item de checklist cadastrado com sucesso!", data: checklist});
  }

  /**
   * Update checklist details.
   * PUT or PATCH checklists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, response }) {
    const checklist = request.findedChecklist;
    const data = request.only([ 'text' ]);
    checklist.merge(data);
    await checklist.save();
    return response.status(200).json({ error: false, message: "Item de checklist removido com sucesso!", data: checklist});
  }

  /**
   * Delete a checklist with id.
   * DELETE checklists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ request, response }) {

    const checklist = request.findedChecklist;

    await checklist.delete();

    return response.status(200).json({ error: false, message: "Item de checklist removido com sucesso!", data: checklist});
  }

  /**
   * check a item of checklist with id.
   * Patch checklists/checkItem/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async checkItem ({ params, request, response }) {
    const checklist = request.findedChecklist

    checklist.checked = checklist.checked ? false : true;
    await checklist.save();

    return response.status(200).json({ error: false, message: "Item de checklist 'checado' com sucesso!", data: checklist});
  }

}

module.exports = ChecklistController
