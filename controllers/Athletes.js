const { Athletes, Countries, Sports } = require('../models')
const joi = require('joi')
const { Op } = require('sequelize')
const { eq, ne, lte, lt, gt, gte } = require('sequelize/dist/lib/operators')

module.exports = {
    create: async(req, res) => {
        const body = req.body
        try {
            const Schema = joi.object({
                name: joi.string().required(),
                countryId: joi.number().required(),
                year: joi.number().required(),
                date: joi.date().required(),
                sportId: joi.number().required(),
                gold: joi.number().required(),
                silver: joi.number().required(),
                bronze: joi.number().required()
            })
            const { error } = Schema.validate({...body }, { abortEarly: false })
            if (error) {
                return res.status(400).json({
                    status: "failed",
                    error: error["details"][0]["message"]
                })
            }

            const createAthlete = await Athletes.create({
                name: body.name,
                countryId: body.countryId,
                year: body.year,
                date: body.date,
                sportId: body.sportId,
                gold: body.gold,
                silver: body.silver,
                bronze: body.bronze
            })
            if (!createAthlete) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot create country"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success create country",
                data: createAthlete
            })


        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    readAllAthletes: async(req, res) => {
        const field = req.query.field
        const sort = req.query.sort
        try {
            if (field != null && sort == "asc") {
                const findAll = await Athletes.findAll({
                    include: [{
                        model: Countries,
                        as: "countries"
                    }, {
                        model: Sports,
                        as: "sports"
                    }],
                    order: [
                        [field, "ASC"]
                    ]
                })
                if (!findAll) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find athletes"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findAll
                })
            } else if (field != null && sort == "desc") {
                const findAll = await Athletes.findAll({
                    include: [{
                        model: Countries,
                        as: "countries"
                    }, {
                        model: Sports,
                        as: "sports"
                    }],
                    order: [
                        [field, "DESC"]
                    ]
                })
                if (!findAll) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find athletes"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findAll
                })
            } else if (field == "countryId" && sort == "asc") {
                const findAll = await Athletes.findAll({
                    include: [{
                        model: Countries,
                        as: "countries",
                        order: [
                            ["name", "ASC"]
                        ]
                    }, {
                        model: Sports,
                        as: "sports"
                    }],

                })
                if (!findAll) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find athletes"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findAll
                })
            } else if (field == "sportId" && sort == "asc") {
                const findAll = await Athletes.findAll({
                    include: [{
                        model: Countries,
                        as: "countries"
                    }, {
                        model: Sports,
                        as: "sports",
                        order: [
                            ["name", "ASC"]
                        ]

                    }],

                })
                if (!findAll) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find athletes"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findAll
                })
            } else if (field == "countryId" && sort == "desc") {
                const findAll = await Athletes.findAll({
                    include: [{
                        model: Countries,
                        as: "countries",
                        order: [
                            ["name", "desc"]
                        ]
                    }, {
                        model: Sports,
                        as: "sports"
                    }],

                })
                if (!findAll) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find athletes"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findAll
                })
            } else if (field == "sportId" && sort == "desc") {
                const findAll = await Athletes.findAll({
                    include: [{
                        model: Countries,
                        as: "countries"
                    }, {
                        model: Sports,
                        as: "sports",
                        order: [
                            ["name", "desc"]
                        ]
                    }],

                })
                if (!findAll) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find athletes"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findAll
                })
            } else {
                const findAll = await Athletes.findAll({
                    include: [{
                        model: Countries,
                        as: "countries"
                    }, {
                        model: Sports,
                        as: "sports"
                    }],
                })
                if (!findAll) {
                    return res.status(400).json({
                        status: "failed",
                        message: "cannot find athletes"
                    })
                }

                return res.status(200).json({
                    status: "success",
                    message: "success retrieved data",
                    data: findAll
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    filterYearAthletes: async(req, res) => {
        const country = req.params.country
        const yearField1 = req.query.yearField1
        const yearField2 = req.query.yearField2
        const value1 = req.query.value1
        const value2 = req.query.value2

        const sortYear = {
            "equal": eq,
            "notequal": ne,
            "lessthan": lt,
            "lessthanequal": lte,
            "greaterthan": gt,
            "greaterthanequal": gte
        }
        try {
            if (country == "australia") {
                if (yearField1 != null || yearField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            year: {
                                [sortYear[yearField1]]: value1,
                                [sortYear[yearField2 ? yearField2 : yearField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 3
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 3
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }


            } else if (country == "china") {
                if (yearField1 != null || yearField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            year: {
                                [sortYear[yearField1]]: value1,
                                [sortYear[yearField2 ? yearField2 : yearField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 4
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 4
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }

            } else if (country == "sweden") {
                if (yearField1 != null || yearField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            year: {
                                [sortYear[yearField1]]: value1,
                                [sortYear[yearField2 ? yearField2 : yearField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 5
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 5
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }

            } else {
                if (yearField1 != null || yearField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            year: {
                                [sortYear[yearField1]]: value1,
                                [sortYear[yearField2 ? yearField2 : yearField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries"
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries"
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }

            }

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    filterDateAthletes: async(req, res) => {
        const country = req.params.country
        const dateField1 = req.query.dateField1
        const dateField2 = req.query.dateField2
        const value1 = req.query.value1
        const value2 = req.query.value2

        const sortYear = {
            "equal": eq,
            "notequal": ne,
            "lessthan": lt,
            "lessthanequal": lte,
            "greaterthan": gt,
            "greaterthanequal": gte
        }
        try {
            if (country == "australia") {
                if (dateField1 != null || dateField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            date: {
                                [sortYear[dateField1]]: value1,
                                [sortYear[dateField2 ? dateField2 : dateField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 3
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 3
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }


            } else if (country == "china") {
                if (dateField1 != null || dateField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            date: {
                                [sortYear[dateField1]]: value1,
                                [sortYear[dateField2 ? dateField2 : dateField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 4
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 4
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }

            } else if (country == "sweden") {
                if (dateField1 != null || dateField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            date: {
                                [sortYear[dateField1]]: value1,
                                [sortYear[dateField2 ? dateField2 : dateField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 5
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries",
                            where: {
                                id: 5
                            }
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }

            } else {
                if (dateField1 != null || dateField2 != null) {
                    const findAll = await Athletes.findAll({
                        where: {
                            date: {
                                [sortYear[dateField1]]: value1,
                                [sortYear[dateField2 ? dateField2 : dateField1]]: value2 ? value2 : value1
                            }
                        },
                        include: [{
                            model: Countries,
                            as: "countries"
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                } else {
                    const findAll = await Athletes.findAll({
                        include: [{
                            model: Countries,
                            as: "countries"
                        }, {
                            model: Sports,
                            as: "sports"
                        }],
                    })
                    if (!findAll) {
                        return res.status(400).json({
                            status: "failed",
                            message: "cannot find athletes"
                        })
                    }

                    return res.status(200).json({
                        status: "success",
                        message: "success retrieved data",
                        data: findAll
                    })
                }

            }

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    filterSports: async(req, res) => {
        const sport = req.query.sport
        try {
            const filter = await Athletes.findAll({
                include: [{
                        model: Countries,
                        as: "countries"
                    },
                    {
                        model: Sports,
                        as: "sports",
                        where: {
                            name: {
                                [Op.iLike]: '%' + sport + '%'
                            }
                        }
                    }
                ]
            })
            if (!filter) {
                return res.status(400).json({
                    status: "failed",
                    message: "sport not found"
                })
            }
            return res.status(200).json({
                status: 'success',
                message: "success retrieved data",
                data: filter
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    updateAthletes: async(req, res) => {
        const id = req.params.id
        const body = req.body
        try {
            const findAthlete = await Athletes.findOne({
                where: {
                    id: id
                }
            })
            if (!findAthlete) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find Country"
                })
            }
            const update = await Athletes.update({
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
    deleteAthletes: async(req, res) => {
        const id = req.params.id
        try {
            const deleteAthlete = await Athletes.destroy({
                where: {
                    id: id
                }
            })

            if (!deleteAthlete) {
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