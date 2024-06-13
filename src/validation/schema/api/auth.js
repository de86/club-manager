module.exports = {
    postLoginValidationSchema: {
        email: {
            presence: true,
            email: true,
            type: 'string',
            length: {maximum: 255},
        },
        password: {
            presence: true,
            type: 'string',
            length: {maximum: 16},
        },
    },
}