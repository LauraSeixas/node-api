const express = require('express');
const { postData, listaUsuarios, putData, deleteData } = require('../routes/data.js');
const { v4: uuidv4 } = require('uuid');
const routes = express.Router();
const id = uuidv4();
const novoUsuario = {
  "id": "",
  "nome": "",
  "email": "",
  "deleted": false
}

//adicionar dados
routes.post('/api', (req, res) => {
  const nomeInput = req.body;
  const emailInput = req.body;
  
  novoUsuario.id = id;
  novoUsuario.nome = nomeInput.nome;
  novoUsuario.email = emailInput.email;
  
    if (novoUsuario.nome === "" || novoUsuario.email === "") {
      res.status(400).json({ error: "Preencha todos os campos!" });
    } else if (novoUsuario.email.indexOf('@') === -1 || novoUsuario.email.indexOf('.com') === -1 || novoUsuario.email.indexOf(' ') !== -1 || novoUsuario.email.length < 8) {
      res.status(400).json({ error: "Email inválido!" });
    } else if (novoUsuario.nome.length < 3) {
      res.status(400).json({ error: "Nome inválido!" });
    } else {
  postData(novoUsuario);
    }
  return res.status(200).json(novoUsuario);
})

//alterar dados
routes.put('/api/:id', (req, res) => {
  const idUsuario = req.params.id;
  const nomeInput = req.body;
  const emailInput = req.body;

  novoUsuario.id = idUsuario;
  novoUsuario.nome = nomeInput.nome;
  novoUsuario.email = emailInput.email;

  if (novoUsuario.nome === "" || novoUsuario.email === "") {
    res.status(400).json({ error: "Preencha todos os campos!" });
  } else if (novoUsuario.email.indexOf('@') === -1 || novoUsuario.email.indexOf('.com') === -1 || novoUsuario.email.indexOf(' ') !== -1 || novoUsuario.email.length < 8) {
    res.status(400).json({ error: "Email inválido!" });
  } else if (novoUsuario.nome.length < 3) {
    res.status(400).json({ error: "Nome inválido!" });
  } else {
  putData(idUsuario, nomeInput.nome, emailInput.email);
  }
  return res.status(200).json(novoUsuario);
});

//deletar dados
routes.delete('/api/:id', (req, res) => {
  const idUsuario = req.params.id;
  console.log("rota delete");

  if (idUsuario === undefined || idUsuario === null || novoUsuario.id === true) {
    res.status(400).json({ error: "Id inválido!" });
  } else {
  deleteData(idUsuario);
  }
  return res.status(200).json({ message: 'Dados deletados com sucesso!' });
});

//retorna usuários
routes.get('/api', (req, res) => {
  if (listaUsuarios.length === 0) {
    res.status(400).json({ error: "Nenhum usuário cadastrado!" });
  } else {
  const usuarioAtivos = listaUsuarios.filter(elem => elem.deleted === false);
  console.log(usuarioAtivos);
  return res.status(200).json(usuarioAtivos);
  }
});

module.exports = routes;
