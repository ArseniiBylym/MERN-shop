const ProductCategory = require('../models/ProductCategory.model');

exports.getProductCategory = async (req, res, next) => {
    try {
        const productCategory = await ProductCategory.find().select('-_id -__v -subCategories._id').exec();
        if (!productCategory) throw new Error(`Categories not found`);
        return res.status(200).json({message: `Product categories`, productCategory});
    } catch (error) {
        next(error);
    }
};

exports.addProductCategory = async (req, res, next) => {
    const {categoryName, subCategories} = req.body;
    try {
        if (!subCategories || subCategories.length === 0) {
            const newCategory = new ProductCategory({categoryName});
            const savedCategory = await newCategory.save();
            return res.status(201).json({message: `New category was successfully added`, categoryItem: savedCategory});
        }

        const category = await ProductCategory.findOne({categoryName});
        subCategories.forEach(item => {
            category.subCategories.push(item);
        });
        const updatedCategory = await category.save();
        return res.status(200).json({message: `New subCategories was successfully added`, categoryItem: updatedCategory});
    } catch (error) {
        next(error);
    }
};
