'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

    checklist(){
        return this.hasMany('App/Models/Checklist')
    }

}

module.exports = Category
