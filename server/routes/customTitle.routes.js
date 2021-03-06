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
    app.get('/api/getAllCustomTitles', authenticate, csrfCheck, CustomTitles.getAllCustomTitle);

    app.get('/api/adminPagination', authenticate, csrfCheck, CustomTitles.findAll);
    // Update Custom Title
    app.put('/api/updateCustomTitle/:id', authenticate, csrfCheck, CustomTitles.updateCustomTitle);

    // Delete Custom Title
    app.delete('/api/deleteCustomTitle/:id', authenticate, csrfCheck, CustomTitles.deleteCustomTitle);

    // Search Title
    app.post('/api/searchTitle', authenticate, csrfCheck, CustomTitles.searchTitle);

    app.post('/api/titleByUserID', CustomTitles.getCustomTitleByUserId);
}