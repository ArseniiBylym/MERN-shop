const Service = require('../models/Service');

exports.getService = async (req, res, next) => {
    try {
        const service = await Service.find();
        if (!service) throw new Error('No services');
        res.status(200).json({msg: `Service list`, service});
    } catch (error) {
        next(error);
    }
};

exports.postService = async (req, res, next) => {
    const {category, serviceName, servicePrice} = req.body;
    const existedCategory = await Service.findOne({category});
    if (existedCategory) {
        existedCategory.serviceList.push({serviceName, servicePrice});
        const service = await existedCategory.save();
        return res.status(200).json({msg: `Service was successfully added`, service});
    }
    const newService = new Service({category, serviceList: [{serviceName, servicePrice}]});
    try {
        const service = await newService.save();
        return res.status(201).json({msg: `New service category was successfully created`, service});
    } catch (error) {
        error.message(`Service creation failed`);
        next(error);
    }
};

exports.deleteService = async (req, res, next) => {
    const {serviceId, serviceItemId} = req.query;
    if (serviceItemId) {
        try {
            const service = await Service.findById(serviceId);
            service.serviceList = service.serviceList.filter(item => {
                return item.id.toString() !== serviceItemId;
            });
            const updatedService = await service.save();
            return res.status(200).json({msg: `Service was successfully deleted`, id: serviceItemId});
        } catch (error) {
            error.message = `Service deteting failed`;
            next(error);
        }
    }
    try {
        const service = await Service.findByIdAndDelete(serviceId);
        return res.status(200).json({msg: `Service was successfully deleted`, id: serviceId});
    } catch (error) {
        error.message = `Service deleting failed`;
        next(error);
    }
};
