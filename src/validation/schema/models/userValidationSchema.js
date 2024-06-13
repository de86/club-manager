module.exports = {
    createUserSchema: {
        email: {
            presence: true,
            email: true,
            type: 'string',
            length: {maximum: 255},
        },
        firstName: {
            presence: true,
            type: 'string',
            length: {maximum: 255},
        },
        surname: {
            presence: true,
            type: 'string',
            length: {maximum: 255},
        },
        password: {
            presence: true,
            type: 'string',
            length: {maximum: 255},
        },
        salt: {
            presence: true,
            type: 'string',
            length: {maximum: 255},
        },
    },
}