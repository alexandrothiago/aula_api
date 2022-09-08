const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const conn = require('./config/bd')



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function (req, res) {//buscando valores
  conn.query('SELECT * FROM tbContato', 
        function (err, results, fields) {
            
            res.status(200).json(results)
        })
    conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
  
})

app.post('/', function (req, res) {//inserindo valores
  const { nome, sobrenome, fone, email } = req.body;
  
  conn.query('INSERT INTO tbcontato (nome,sobrenome,fone,email) values (?,?,?,?)', [nome,sobrenome,fone,email], function (error, results) {
    if (error) throw error;
    res.status(200).json(results)
  });
  conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
  
})
app.put('/', function (req, res) {//alterando valores
  const { id, nome, sobrenome, fone, email } = req.body;
  conn.query('UPDATE tbcontato set nome = ? ,sobrenome = ?,fone = ?,email = ? where id = ?', [nome,sobrenome,fone,email, id], function (error, results) {
    if (error) throw error;
    res.status(200).json(results)
  });
  conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });

})
app.delete('/', function (req, res) {//excluindo valores 
  
  const { id } = req.body;
  conn.query('DELETE FROM tbcontato WHERE id=?', [id], function (error, results) {
    if (error) throw error;
    res.status(200).json(results)
  });
  conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });

})



app.listen(5000, function () {
  console.log('Api contato esta rodando na porta 5000!')
})