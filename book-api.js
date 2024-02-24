/*
Ecco alcuni passaggi e punti del codice su cui fare attenzione:
  - body-parser viene importato e passato al metodo app.use per essere abilitato come middleware della istanza di app Express;
  - l'array books viene utilizzato per salvare la tua collezione di libri. Al suo posto, si sarebbe potuto trovare un database;
  - ci sono diversi tipi di corpo nelle richieste HTTP. Per esempio, application/x-www-form-urlencoded è il corpo di default per i form,
    mentre application/json è qualcosa che useresti per richiedere una risorsa tramite jQuery o tramite un client backend REST;
  - il middleware body-parser raccoglierà il corpo dell'HTTP, decodificherà le informazioni e le passerà a req.body.
    Da li, potrai riprendere le informazioni sul form (del libro in oggetto, in questo caso).
Adesso, sarà sufficiente creare il form in HTML, richiedendo come campi di input i principali dati dei libri.
*/

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;


    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

//endpoint per prendere tutti i libri dell'API-->
app.get('/books', (req, res) => {
    res.json(books);
});

//endpoint associato all'ISBN-->
app.get('/book/:isbn', (req, res) => {

    const isbn = req.params.isbn;


    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }


    res.status(404).send('Book not found');

});

//Usando il filtro per ISBN definito prima, potrai implementare un metodo
//per cancellare i dati all'interno del server tramite la richiesta HTTP DELETE-->
app.delete('/book/:isbn', (req, res) => {

    const isbn = req.params.isbn;


    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });

    res.send('Book is deleted');
});

//Successivamente, si utilizzerà una richiesta di POST o PUT per inviare le nuove informazioni
app.post('/book/:isbn', (req, res) => {

    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
