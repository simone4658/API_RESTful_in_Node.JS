//All'inizio del codice, inseriamo le seguenti dichiarazioni
const express = require('express');
const app = express();

//poi includiamo anche la porta
const port = 3000;

//Ora, si può creare un endpoint "GET", e Quando l'utente toccherà l'endpoint,
//potrà visualizzare il messaggio "Hello World, from express"
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

//Se volendo, vogliamo far scattare questo endpoint nella homepage,
//basterà inserire il carattere "/", come valore nella parentesi di "app.get"

//A questo punto, inizializzamo i client
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

//In primis, otterremo un output di conferma all'interno del terminale, che sarà "Hello world app listening on port 3000!"
