const fs = require('fs');

const dadosUsuario = fs.readFileSync('listaUsuarios.json');

const listaUsuarios = JSON.parse(dadosUsuario);

// saving data in a json file
function postData(novoUsuario) {
    listaUsuarios.push(novoUsuario);
   // console.log(listaUsuarios);
    const data = JSON.stringify(listaUsuarios, null, 2);
    fs.writeFileSync('listaUsuarios.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
  }

  // function put data 
  function putData(idUsuario, nomeInput, emailInput) {
    listaUsuarios.forEach((usuario) => {
      if (usuario.id === idUsuario && usuario.deleted === false) {
        usuario.nome = nomeInput;
        usuario.email = emailInput;
      }
    });
    const data = JSON.stringify(listaUsuarios, null, 2);
    fs.writeFileSync('listaUsuarios.json', data, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }

  // function delete data
  function deleteData(idUsuario) {
    console.log(idUsuario);
    listaUsuarios.forEach((usuario) => {
      console.log(usuario.id === idUsuario, usuario.deleted === false);
      if (usuario.id === idUsuario && usuario.deleted === false) {
        console.log("oiii");
        usuario.deleted = true;
      }
    });
    const data = JSON.stringify(listaUsuarios, null, 2);
    fs.writeFileSync('listaUsuarios.json', data, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  
  }

exports.putData = putData;
exports.deleteData = deleteData;
exports.postData = postData;
exports.listaUsuarios = listaUsuarios;