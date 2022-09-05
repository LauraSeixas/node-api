const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const button = document.getElementById('btn');
const tableBody = document.getElementById('tableBody');

//função para adicionar dados
function sendData() {
    let nome = nomeInput.value;
    let email = emailInput.value;
    try {
        if (nome === "" || email === "") {
            alert("Preencha todos os campos!");
        } else if (email.indexOf('@') === -1 || email.indexOf('.com') === -1 || email.indexOf(' ') !== -1 || email.length < 8) {
            alert("Email inválido!");
        } else if (nome.length < 3) {
            alert("Nome inválido!");
        } else {
        const data = {
            nome,
            email
        };
    
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch('/api', options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                location.reload();
                console.log('Dados enviados com sucesso!');
                console.log(location.reload());
            }
            )
            .catch(err => {
                console.log(err);
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    
};
//função para listar dados na tabela
async function getData() {

    try {
        let row;

        const response = await fetch('http://localhost:3000/api/');

        const data = await response.json();

        console.log(data);

        const jsonData = Object.values(data);

        console.log(jsonData);

        jsonData.forEach(elem => {

            let nome = elem.nome;
            let email = elem.email;
            let id = elem.id;

            row = "<tr>"

            row += "<td " + `class=${id}` + " id='id'>" + id + "</td>"

            row += "<td " + `class=${id}` + "  id='nome'>" + nome + "</td>"

            row += "<td " + `class=${id}` + "  id='email'>" + email + "</td>"

            row += "<td><button class='btnEdit' " + `id=${id}` + ' onclick="editInput(this.id)">' + "<img src='./image/pencil.svg' alt='Editar'></button></td>";

            row += "<td>" + "<button class='btnDelete'" + `id=${id}` + ' onclick="deleteData(this.id)">' + "<img src='./image/trash3.svg' alt='Excluir'>" + "</button>" + "</td>";

            row += "</tr>"

            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.log(error);
    }
};

getData();
//função para editar dados do input
function editInput(id) {
    let nome = document.getElementsByClassName(`${id}`).nome.innerHTML;
    let email = document.getElementsByClassName(`${id}`).email.innerHTML;
   
    nomeInput.value = nome;
    emailInput.value = email;

    button.innerHTML = "Atualizar";
    button.setAttribute('onclick', `atualizaData("${id}")`);

}   
//função para atualizar dados
async function atualizaData(elem) {
    let id = elem;
    let nome = nomeInput.value;
    let email = emailInput.value;

    const dataPut = {
        nome,
        email
    };

    const url = 'http://localhost:3000/api/' + id;

    if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
    } else if (email.indexOf('@') === -1 || email.indexOf('.com') === -1 || email.indexOf(' ') !== -1 || email.length < 8) {
        alert("Email inválido!");
    } else if (nome.length < 3) {
        alert("Nome inválido!");
    } else {

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(dataPut),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        location.reload();

    } catch (error) {
        console.log(error);
    }
    }
}
  
//função para deletar dados
async function deleteData(id) {
    const url = 'http://localhost:3000/api/' + id;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        
        alert("usuário referente ao " + id + " excluído com sucesso!");
        location.reload();

    } catch (error) {
        console.log(error);
    }
};
