import {validateBrandBody} from "../utils/validation.js";

import {Brand} from "../models/brand.model.js";

export const saveBrand = async (req, res,next) => {

    const {error, value} = validateBrandBody(req.body)
    if (error) {
        return res.status(400).json({error: error.message})
    }
    const brandExists = await Brand.findOne({name: value.name})
    if (brandExists) {
        return res.status(400).json({error: "This brand already exists"})
    }
    try{
        const savedBrand = await Brand.create({...value})
        return res.status(201).json({success:"Brand Added Successfully"})
    }catch (e) {
        next("cannot create brand")
    }
}

export const getAllBrands = async (req, res) => {
    const brands = await Brand.find()
    return res.status(200).json({ brands})
}

export const deleteBrand = async (req, res,next) => {
    const {id} = req.params
    try{
        await Brand.findByIdAndDelete(id)
        return res.status(200).json({success: "brand deleted"})
    }catch (e) {
        next("Brand to delete does not exists")
    }
}


export const updateBrand = async (req, res,next) => {
    const {id} = req.params
    const {error,value} = validateBrandBody(req.body)
    if(error) {
        return res.status(400).json({error: error.message})
    }
    try{
        const updatedBrand = await Brand.findByIdAndUpdate(id, {...value}, {new: true})
        return res.status(200).json({success: "brand updated successfully"})
    }catch (e) {
        next("Brand not found")
    }

}

