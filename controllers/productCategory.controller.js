const ProductCategory = require('../models/ProductCategory.model');

exports.getProductCategory = async (req, res, next) => {
    try {
        const productCategory = await ProductCategory.find();
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

exports.deleteProductCategory = async (req, res, next) => {
    const {categoryId, subCategoryName} = req.query;
    try {
        if (!subCategoryName) {
            await ProductCategory.findByIdAndRemove(categoryId);
            res.status(200).json({message: `Category was successfully deleted`, categoryId});
        }
        const category = await ProductCategory.findById(categoryId);
        category.subCategories = category.subCategories.filter(item => {
            return item.toString() !== subCategoryName.toString();
        });
        await category.save();
        return res.status(200).json({message: `SubCategory was successfully deleted`, subCategoryName});
    } catch (error) {
        next(error);
    }
};
