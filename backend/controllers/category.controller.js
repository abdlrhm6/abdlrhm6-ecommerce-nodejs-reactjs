import { validateCategoryBody } from "../utils/validation.js";
import { Category } from "../models/category.model.js";

export const saveCategory = async (req, res, next) => {

    const { error, value } = validateCategoryBody(req.body)
    if (error) {
        return res.status(400).json({ error: error.message })
    }
    const categoryExists = await Category.findOne({ name: value.name })
    if (categoryExists) {
        return res.status(400).json({ error: "This category already exists" })
    }
    try {
        const savedCategory = await Category.create({ ...value })
        return res.status(201).json({ success: "Category added successfully" })
    } catch (e) {
        next("cannot create category")
    }
}

export const getAllCategories = async (req, res) => {
    const categories = await Category.find()
    return res.status(200).json({ categories })
}

export const deleteCategory = async (req, res, next) => {
    const { id } = req.params
    try {
        await Category.findByIdAndDelete(id)
        return res.status(200).json({ success: "category deleted" })
    } catch (e) {
        next("Category to delete does not exists")
    }
}

export const updateCategory = async (req, res, next) => {
    const { id } = req.params
    const { error, value } = validateCategoryBody(req.body)
    if (error) {
        return res.status(400).json({ error: error.message })
    }
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { ...value }, { new: true })
        return res.status(200).json({ success: "Category Updated Successfully" })
    } catch (e) {
        next("Category not found")
    }

}