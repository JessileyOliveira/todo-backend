'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string("text").notNullable()
      table.integer("user_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
