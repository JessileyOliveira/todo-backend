'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post("user", "UserController.store");
Route.delete("user/:id", "UserController.destroy");
Route.post("authenticate", "UserController.authenticate");

Route.group(() => {
  Route.get("category/:id", "CategoryController.show");
  Route.put("category/:id", "CategoryController.update");
  Route.delete("category/:id", "CategoryController.destroy");
  Route.post("checklist", "ChecklistController.store");
}).middleware(["auth", "VerifyCategory"]);

Route.group(() => {
  Route.delete("checklist/:id", "ChecklistController.destroy");
  Route.patch("checklist/checkItem/:id", "ChecklistController.checkItem");
  Route.patch("checklist/:id", "ChecklistController.update");
}).middleware(["auth", "VerifyCategory", "VerifyChecklist"]);

Route.group(() => {
  Route.get("category", "CategoryController.index");
  Route.post("category", "CategoryController.store");
}).middleware(["auth"]);