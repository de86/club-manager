module.exports = (db) => {
    async function getById (id) {
        return await db('users')
            .select('*')
            .where({id})
            .first();
    }


    async function createUser (userData) {
        return await db('users')
            .insert(userData)
            .returning('*');
    }


    async function doesUserExistForEmail (email) {
        const [result] = await db('users')
            .select(db.raw('EXISTS (SELECT 1 FROM users WHERE email = ?) AS exists', [email]));
        
        return result.exists;
    }


    return {
        getById,
        createUser,
        doesUserExistForEmail,
    }
}