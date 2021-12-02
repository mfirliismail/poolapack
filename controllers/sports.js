const { Sports } = require('../models')
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

            const createSport = await Sports.create({
                name: body.name
            })
            if (!createSport) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot create sport"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success create sport",
                data: createSport
            })


        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    readAllSport: async(req, res) => {
        try {
            const findSport = await Sports.findAll()
            if (!findSport) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot read sport"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findSport
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    updateSport: async(req, res) => {
        const id = req.params.id
        const body = req.body
        try {
            const findSport = await Sports.findOne({
                where: {
                    id: id
                }
            })
            if (!findSport) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find sport"
                })
            }
            const update = await Sports.update({
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
    deleteSport: async(req, res) => {
        const id = req.params.id
        try {
            const deleteSport = await Sports.destroy({
                where: {
                    id: id
                }
            })

            if (!deleteSport) {
                return res.status(400).json({
                    status: 'failed',
                    message: "cannot delete sport"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success deleted sport"
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}