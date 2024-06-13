const bcrypt = require('bcrypt');

module.exports = {
    generateHash,
    verifyPassword,
}

/**
 * @type {hashPasswordResult}
 * @param {string} hash - The resulting hash
 * @param {string} salt - The salt used while hashing the password
 */

/**
 * Hash the given password string with the given salt and returns the password and salt
 * @param {string} password - The plaintext password 
 * @param {string} opt_salt - Optional - salt used for hashing password. If not provided a salt will be generated  
 * @returns {hashPasswordResult}
 */
async function generateHash (password, salt) {
    if (typeof password !== 'string') {
        throw new Error('password must be of type string');
    }

    if (!salt || typeof salt !== 'string') {
        const saltRounds = 10;
        salt = await bcrypt.genSalt(saltRounds);
    }

    const hash = await bcrypt.hash(password, salt);

    return {
        salt,
        hash,
    }
}


/**
 * Compares the given plain text password string to the given hash and returns the result as a boolean
 * @param {string} passwordString - The plain text password string
 * @param {string} passwordHash - The password hash to compare to
 */
async function verifyPassword (passwordString, passwordHash) {
    return await bcrypt.compare(passwordString, passwordHash)
}

