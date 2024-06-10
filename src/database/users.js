module.exports = (db) => {
    async function getById (id) {
        const queryResult = await db('users')
            .select('*')
            .where({id})
            .first();
        
        return queryResult;
    }

    return {
        getById,
    }
}