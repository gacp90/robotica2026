const mongoose = require('mongoose');

const dbConection = async() => {

    try {

        await mongoose.connect(process.env.DB);
        console.log('DB Online');

    } catch (error) {

        console.log(error);
        throw new Error('Error al iniciar la BD');

    }

};

module.exports = {
    dbConection
};