const { Countries } = require('../models')
const joi = require('joi')

module.exports = {
    create: async(req, res) => {
        const body = req.body
        try {
            const Schema = joi.object({
                name: joi.string().required()
            })
            const { error } = Schema.validate({...body }, { abortEarly: false })
            if (error) {
                return res.status(400).json({
                    status: "failed",
                    error: error["details"][0]["message"]
                })
            }

            const createCountry = await Countries.create({
                name: body.name
            })
            if (!createCountry) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot create country"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success create country",
                data: createCountry
            })


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    readAllCountry: async(req, res) => {
        try {
            const findCountry = await Countries.findAll()
            if (!findCountry) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot read country"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findCountry
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    updateCountry: async(req, res) => {
        const id = req.params.id
        const body = req.body
        try {
            const findCountry = await Countries.findOne({
                where: {
                    id: id
                }
            })
            if (!findCountry) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find Country"
                })
            }
            const update = await Countries.update({
                ...body
            }, {
                where: {
                    id: id
                }
            })

            return res.status(200).json({
                status: 'success',
                message: "success updated data",
                data: update
            })


        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    deleteCountry: async(req, res) => {
        const id = req.params.id
        try {
            const deleteCountry = await Countries.destroy({
                where: {
                    id: id
                }
            })

            if (!deleteCountry) {
                return res.status(400).json({
                    status: 'failed',
                    message: "cannot delete country"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success deleted country"
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}