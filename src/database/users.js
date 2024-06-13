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

    
    return {
        getById,
        createUser,
    }
}