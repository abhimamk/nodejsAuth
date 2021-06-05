const { response } = require('express');
const CustomTitles = require('../../models/customTitle');
// const { Handler: { successResponseHandler, errorResponseHandler } } = require('../../../utils/handlers.util');
module.exports = {
    // add customTitle

    addCustomTitle: (req, res) => {
        let newCustomTitles = new CustomTitles(req.body);
        newCustomTitles.save()
            .then((response) => {
                return res.status(200).send({ message: "Added Successfully" },);
            }).catch((error) => {
                if (error.message.indexOf('duplicate key error') !== -1)
                    res.status(400).send({ message: "Already exists !" });
                else
                    res.status(400).send({ message: "failed to create new CustomTitles" });
            });
    },

    // Get All Custom Title
    getAllCustomTitle: function (req, res) {
        // Retrieve and return all notes from the database.
        CustomTitles.find(function (err, customTitles) {
            if (err) {
                res.status(500).send({ message: "Some error occurred while retrieving Custom Title." });
            } else {
                res.send(customTitles);
            }
        });
    },

    // Update Custom Title
    updateCustomTitle: async (req, res) => {
        req.responseDate = await CustomTitles.findById(req.params.id).lean();
        CustomTitles.findOneAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false }).lean()
            .then((response) => {
                return res.status(200).send({ message: "Update Successfully" },);

            }).catch((error) => {
                return res.status(500).send({ message: "Some error occurred while Update." });
            });
    },

    // Delete Custom Title
    deleteCustomTitle: async (req, res) => {
        req.responseDate = await CustomTitles.findById(req.params.id).lean();
        CustomTitles.findByIdAndRemove(req.params.id, { new: true, useFindAndModify: false }).lean()
            .then((response) => {
                return res.status(200).send({ message: "Deleted Successfully" },);

            }).catch((error) => {
                return res.status(500).send({ message: "Some error occurred while Delete." });

            });
    },

    // Search Custom Title
    searchTitle: async (req, res) => {
        try {
            let response = await CustomTitles.find().lean();
            let newResponse = response.filter(data => {
                let search = req.body.search.toLowerCase();
                let temp1 = data.title.toLowerCase();
                if (temp1.includes(search)) {
                    return data;
                } 
            });
            console.log('search Done');
            return res.status(200).send({ message: "Search Successfully",  newResponse });
        } catch (error) {
            return res.status(500).send({ message: "Some error occurred while Search." });
        }
    }
}