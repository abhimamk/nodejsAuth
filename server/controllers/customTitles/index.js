const { response } = require('express');
const CustomTitles = require('../../models/customTitle');
module.exports = {
  // add customTitle
  addCustomTitle: (req, res) => {
    let newCustomTitles = new CustomTitles(req.body);
    newCustomTitles
      .save()
      .then((response) => {
        return res.status(200).send({ message: 'Added Successfully' });
      })
      .catch((error) => {
        if (error.message.indexOf('duplicate key error') !== -1)
          res.status(400).send({ message: 'Already exists !' });
        else
          res
            .status(400)
            .send({ message: 'failed to create new CustomTitles' });
      });
  },

  // Get All Custom Title
  getAllCustomTitle: function (req, res) {
    CustomTitles.find(function (err, customTitles) {
      if (err) {
        res.status(500).send({
          message: 'Some error occurred while retrieving Custom Title.',
        });
      } else {
        res.send(customTitles);
      }
    });
  },

  findAll: function (req, res) {
    const { title } = req.query;

    var condition = title[0]
      ? { title: { $regex: new RegExp(title[0]), $options: 'i' } }
      : {};
    const page = parseInt(req.query.page[0]);
    const limit = parseInt(req.query.limit[0]);
    CustomTitles.paginate(condition, { page, limit })
      .then((data) => {
        res.send({
          response: data.docs,
          page: data.page,
          NumberOfTitle: data.total,
          displayedTitle: data.limit,
          pages: data.pages,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving tutorials.',
        });
      });
  },

  // Update Custom Title
  updateCustomTitle: async (req, res) => {
    req.responseDate = await CustomTitles.findById(req.params.id).lean();
    CustomTitles.findByIdAndUpdate(req.params.id, req.body)
      .then((response) => {
        console.log(response);
        return res.status(200).send({ message: 'Update Successfully' });
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ message: 'Some error occurred while Update.' });
      });
  },

  // Delete Custom Title
  deleteCustomTitle: async (req, res) => {
    req.responseDate = await CustomTitles.findById(req.params.id).lean();
    CustomTitles.findByIdAndRemove(req.params.id, {
      new: true,
      useFindAndModify: false,
    })
      .lean()
      .then((response) => {
        return res.status(200).send({ message: 'Deleted Successfully' });
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ message: 'Some error occurred while Delete.' });
      });
  },

  // Search Custom Title
  searchTitle: async (req, res) => {
    try {
      let response = await CustomTitles.find().lean();
      let newResponse = response.filter((data) => {
        let search = req.body.search.toLowerCase();
        let temp1 = data.title.toLowerCase();
        if (temp1.includes(search)) {
          return data;
        }
      });
      console.log('search Done');
      return res
        .status(200)
        .send({ message: 'Search Successfully', newResponse });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Some error occurred while Search.' });
    }
  },
};
