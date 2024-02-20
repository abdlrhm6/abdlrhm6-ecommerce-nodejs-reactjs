import Joi from "joi";

export const validateRegisterBody = (body) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .strict()
            .messages({
                'any.only': 'Passwords must match'
            })

    })

    return schema.validate(body, {abortEarly: false})
}

export const validateLoginBody = (body) => {
    const schema = Joi.object({

        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    })

    return schema.validate(body, {abortEarly: false})
}

export const validateCategoryBody = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6)
    })
    return schema.validate(body)
}
export const validateBrandBody = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6)
    })
    return schema.validate(body)
}

export const validateProductBody = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6),
        description: Joi.string().required().min(20),
        price: Joi.number().required().positive(),
        category: Joi.string().required(),
        brand: Joi.string().required(),
        quantity: Joi.number().required().positive(),
        image: Joi.string().required()
    })
    return schema.validate(body , {abortEarly: false})
}