const User = use("App/Models/User")

class UserController {

   /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async index () {
      const users = await User.all()

      return users
    }

    /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {

    const data = request.only(['username', 'password', 'email']);

    const user = await User.create(data);

    return user;

  }

  async insertPost ({ auth, request }) {

    const data = request.only(['content']);

    const user = await User.find(auth.user.id)

    const post = user.post().create(data)

    return post;

  }

  async authenticate ({ request, auth }) {
      const { email, password } = request.all()

      const token = auth.attempt(email, password);

      return token;
  }

  async destroy ({ params }) {
    const user = await User.find(params.id);
    await user.delete();
  }
}


module.exports = UserController
