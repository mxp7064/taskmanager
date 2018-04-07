var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {

    app.get('/tasks', (req, res) => {
        const query = {};
        db.collection("tasks").find(query).toArray(function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result);
            }
        });
    });

    app.get('/task/:id', (req, res) => {
        const id = req.params.id;
        const query = { '_id': new ObjectID(id) };
        db.collection('tasks').findOne(query, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/task', (req, res) => {
        const task = { name: req.body.name, description: req.body.description, date: req.body.date, checked: req.body.checked };
        db.collection('tasks').insert(task, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.put('/task/:id', (req, res) => {
        const id = req.params.id;
        const query = { '_id': new ObjectID(id) };
        const task = { name: req.body.name, description: req.body.description, date: req.body.date, checked: req.body.checked };
        db.collection('tasks').update(query, task, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(task);
            }
        });
    });

    app.delete('/task/:id', (req, res) => {
        const id = req.params.id;
        const query = { '_id': new ObjectID(id) };
        db.collection('tasks').remove(query, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Task ' + id + ' deleted!');
            }
        });
    });
};