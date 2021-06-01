//MAR: - modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const urlDb = 'mongodb+srv://Jeytery:a1B9c7D3@cluster0.2im5r.mongodb.net/usersDB?retryWrites=true&w=majority';
const ObjectId = require("mongodb").ObjectId;

MongoClient.connect(urlDb, (err, client) => {
    if (err) console.log(err);
    console.log("Подключились к БД");
    app.listen(port, () => console.log(`Слушаем порт: '${port}`));
    const collection = client.db('usersDB').collection('users');
    app.locals.collection = collection;

    process.on('SIGINT', () => {
        console.log("Отключились от БД");
        client.close();
        process.exit();
    });
});

//MARK: - оброботчик юзеров
app.use((request, responce, next) => {
    fs.readFile(path.join(__dirname, "db.json"), (error, data) => {
        if (error) console.log(error);
        const db = data; 
        responce.locals.db = JSON.parse(db.toString());
        next();
    });
});

app.use(bodyParser.json());

app.route('/users')
    .get((request, responce) => {
        app.locals.collection.find({}, {fields: {"name": 1, "address": 1, "roles": 1}}).toArray((err, data) => {
            responce.status(200).json(data);
        });
    })
    .post((request, responce) => {
        app.locals.collection.insertOne(request.body, (err, data) => {
            responce.send(`Пользователь с id: '${data.ops[0]._id}' создан`).end();
        });
    });

app.route('/users/:id')
    .get((request, responce) => {
        app.locals.collection.findOne({ _id: ObjectId(request.params.id) }, (err, data) => {
            responce.status(200).json(data);
        });
    })
    .delete((request, responce) => {
        app.locals.collection.findOneAndDelete({ _id: ObjectId(request.params.id) }, (err, data) => {
            responce.send(`Пользователь был удалён`).end();
        });
    })
    .put((request, responce) => {
        app.locals.collection.findOneAndUpdate(
            { _id: ObjectId(request.params.id) },
            { $set: request.body },
            { returnNewDocument: false },
            (err, data) => {
                console.log(data);
                responce.send(`Пользователь с id: '${data.value._id}' был обновлён`).end();
            });
    }
);

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.get('/', (request, responce) => {
    responce.render('index', {name: "Vasia", age: 22});
});
