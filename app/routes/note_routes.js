var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.post('/user', (req, res) => {
        const user = {
            text: req.body.nome,
            title: req.body.idade,
            ano: req.body.data
        };

        db.collection('user').insert(user, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('user').remove(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        };
        const user = {
            text: req.body.nome,
            title: req.body.idade,
            ano: req.body.ano
        };
        db.collection('user').update(details, user, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(user);
            }
        });
    });
}