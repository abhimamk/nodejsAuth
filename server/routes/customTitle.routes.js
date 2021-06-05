const {check} = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate } = require('../middleware/authenticate');
const { csrfCheck } = require('../middleware/csrfCheck');

module.exports = function(app) {
    const CustomTitles = require('../controllers/customTitles/index');

    // create a new Custom Title
    app.post('/api/addCustomTitles', authenticate, csrfCheck,
    [
        check('title').not().isEmpty().withMessage('Title is required')
    ], validate, CustomTitles.addCustomTitle);

    // get all All Custom Titles
    app.get('/api/getAllCustomTitles', CustomTitles.getAllCustomTitle);

    // Update Custom Title
    app.put('/api/updateCustomTitle/:id', CustomTitles.updateCustomTitle);

    // Delete Custom Title
    app.delete('/api/deleteCustomTitle/:id', CustomTitles.deleteCustomTitle);

    // Search Title
    app.post('/api/searchTitle', CustomTitles.searchTitle);
}