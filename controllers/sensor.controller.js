const SensorData = require('../models/lectura.model'); // Tu modelo de Mongoose

const postData = async (req, res) => {
    try {
        const data = new SensorData(req.body);
        await data.save();

        // Recuperamos la instancia de IO que seteamos en el app
        const io = req.app.get('socketio');
        
        // Emitimos el evento para Angular (Frontend)
        io.emit('sensor-update', data);

        res.status(201).json({
            ok: true,
            msg: 'Lectura guardada y emitida'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al procesar sensor'
        });
    }
};

const getLatest = async (req, res) => {
    try {
        const data = await SensorData.findOne({ dispositivo: req.params.dispositivo }).sort({ timestamp: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ ok: false });
    }
};

const getHistory = async (req, res) => {
    try {
        // Traemos los últimos 20 para la gráfica
        const data = await SensorData.find({ dispositivo: req.params.dispositivo })
                                     .sort({ timestamp: -1 })
                                     .limit(20);
        res.json(data.reverse()); // Reverse para que la gráfica vaya de pasado a presente
    } catch (error) {
        res.status(500).json({ ok: false });
    }
};

module.exports = {
    postData,
    getLatest,
    getHistory
};