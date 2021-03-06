const express = require('express');
const router = express.Router();
const taskService = require('./task.service');


router.get('/', getAll);
router.post('/', createTask);
router.delete('/:id', _delete);

module.exports = router;



function getAll(req, res, next) {
    taskService.getAll()
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function createTask(req, res, next) {
    taskService.create(req.body)
        .then(task => res.json(task))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    taskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}