const controller = require('../controllers/StudentsController')

const init = (expressInstance, basePath) => {
    // STUDENTS' ROUTES
    expressInstance.get(`${basePath}/students`, controller.getAll);
    expressInstance.get(`${basePath}/students/:id`, controller.getById);
    expressInstance.post(`${basePath}/students`, controller.create);
    expressInstance.put(`${basePath}/students/:id`, controller.update);
    expressInstance.delete(`${basePath}/students/:id`, controller.remove);
}

module.exports = {
    init
};