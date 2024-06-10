let _db;


class User {
    /**
     * Constructor - Creates a new User model.
     * @param {*} id - User ID
     */
    constructor () {
        if (!_db) {
            throw new Error('Unable to retrieve database conection');
        }

        return this;
    }


    /**
     * Hydrates this user object with the users data and returns self
     * @param {*} id - User ID
     */
    async get (id) {
        if (!id) {
            throw new Error('User ID is required to fetch user data');
        }

        const userData = await _db.users.getById(id);
        if (!userData) {
            throw new Error(`User with id ${id} not found`);
        }

        this.data = userData;

        return this;
    }
}


module.exports = {
    // Inject database
    inject: (db) => {if (!_db) _db = db},
    User,
};
