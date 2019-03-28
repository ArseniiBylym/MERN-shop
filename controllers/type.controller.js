const Type = require('../models/Type.model');

exports.getTypes = async (req, res, next) => {
    const {group} = req.params;
    try {
        const types = await Type.find({group: group}).select('name value -_id').exec();
        res.status(200).json(types)
    } catch(error) {
        next(error);
    }
};

exports.postTypes = async (req, res, next) => {
    const {types} = req.body;
    try {
        const result = await Type.insertMany(types);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}