// Inject DB into all models. This allows models to be imported in other files
// without needing to pass DB every time.
module.exports = (db) => ({
    User: require('./User').inject(db),
});
