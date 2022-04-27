// const authorModel = require("../models/authorModel")
const AuthorModel = require("../models/authorModel")

const valid = function (value) {

    if (typeof value !== "string" || value.trim().length == 0) { return false }
    return true
}

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        if (!author.title) { return res.status(400).send({ status: false, message: "title is required" }) }

        if (!author.firstName) { return res.status(400).send({ status: false, message: "author first name is required" }) }

        if (!author.lastName) { return res.status(400).send({ status: false, message: "author last name is required" }) }

        if (!author.email) { return res.status(400).send({ status: false, message: "email is required" }) }

        if (!author.password) { return res.status(400).send({ status: false, message: "password is required" }) }

        if (!valid(author.title)) { return res.status(400).send({ status: false, message: "title must be in string" }) }

        if (!["Mr", "Mrs", "Miss"].indexOf(author.title) !== -1) { return res.status(400).send({ status: false, message: "title should be Mr,Miss,Mrs" }) }

        if (!valid(author.firstName)) { return res.status(400).send({ status: false, message: "author first name must be in string" }) }

        if (!valid(author.lastName)) { return res.status(400).send({ status: false, message: "author last name must be in string" }) }

        if (!valid(author.password)) { return res.status(400).send({ status: false, message: "password name must be in string" }) }


        let pattern = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/

        if (!pattern.test(author.email)) { return res.status(400).send({ status: false, message: "email is not valid" }) }

        else {
            let authorCreated = await AuthorModel.create(author)
            res.status(201).send({ data: authorCreated })
        }
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}






module.exports.createAuthor = createAuthor



