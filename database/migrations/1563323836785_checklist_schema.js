'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChecklistSchema extends Schema {
  up () {
    this.create('checklists', (table) => {
      table.increments()
      table.string("text").notNullable()
      table.integer("category_id").notNullable().unsigned().references("id").inTable("categories").onDelete("CASCADE").onUpdate("CASCADE")
      table.boolean("checked").defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('checklists')
  }
}

module.exports = ChecklistSchema
