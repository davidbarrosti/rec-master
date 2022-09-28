// VALIDAÇÃO DO USUARIO - SE ESTA LOGADO TIPO SE PERMANECE //
if(!sessionStorage.getItem('session')){
    !localStorage.getItem('session') ? window.location.replace("login.html") : null
}

const newMessage = document.querySelector('#new-message')
const editSaveBtn = document.querySelector('#editSaveBtn')
const inputDescript = document.querySelector('#inputDescript')
const inputDetail = document.querySelector('#inputDetail')
const titleModalEdit = document.querySelector('#messageTitle')
const editDescript = document.querySelector('#editDescript')
const editDetail = document.querySelector('#editDetail')
const userButton = document.querySelector('.dropdown-toggle')
const buttonLogout = document.querySelector('#logout')
const goTop = document.querySelector('#goTop')

// EVENTO NOVO OU SALVAR
newMessage.addEventListener('submit', addNewMessage)

//CARREGA LISTA DE USUARIOS
let users = JSON.parse(localStorage.getItem('users'))

// VALIDAR USUARIO ATUAL LOGADO
let logedUserSession = JSON.parse(sessionStorage.getItem('session'))
let logedUserLocalS = JSON.parse(localStorage.getItem('session'))

// VALIDAR A LISTA DO USUARIO LOGADO
let returUser = users.find((value) => {
  //VALIDAR SEÇÃO 
    if(logedUserSession) {
        return value.username === logedUserSession.username
    }
    else
    {
        return value.username === logedUserLocalS.username
    }
});

// SAIR
buttonLogout.addEventListener('click', logout = () => {
    localStorage.getItem('session') ? localStorage.removeItem("session") : null
    sessionStorage.getItem('session') ? sessionStorage.removeItem("session") : null
    window.location.replace("login.html")
})

userButton.innerText = returUser.username

//VALIDAÇÃO DO INDEXOF
let indexUser = users.findIndex((value) => {
    return value.username == returUser.username
});


//GUARDAR INFORMAÇÕES NO LOCAL STORAGE ///////////
function listarRecados()
{
    let messagesHTML = ''
    for(let index in users[indexUser].messages) {

        messagesHTML +=`
        <tr>
        <th scope="row" class="scope">${index}</th>
        <td class="col-sm-2">${users[indexUser].messages[index].detail}</td>
        <td>${users[indexUser].messages[index].descript}</td>
        <td class="col-sm-2">
            <div class="d-grid gap-2 d-md-block center">
                <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editMessage(${index})">Editar</button>
                <button class="btn btn-danger" type="button" onclick="delMessage(${index})">Excluir</button>
            </div>
        </td>
        </tr>
        `
    }
    document.querySelector('tbody').innerHTML = messagesHTML
}
listarRecados()


function addNewMessage(event) {
    event.preventDefault()
//VALIDAR SE OS CAMPOS ESTÃO VAZIOS
    if(inputDescript.value == '' || inputDetail.value == '')
    {
        alert('Não deixe nenhum campo vazio.')
        return
    }

    //NOVO 
    let newMessage =
        {
            detail: inputDescript.value,
            descript: inputDetail.value
        }
    users[indexUser].messages.unshift(newMessage)//ADICIONAR O ATUAL NO TOPO
    saveData()//salva 
    listarRecados()
    event.target.reset()
    inputDescript.focus()
}

//EDITAR  O ARRAY
function editToMessage(indexOf)
{
    users[indexUser].messages[indexOf].detail = editDetail.value
    users[indexUser].messages[indexOf].descript = editDescript.value
    users[indexUser].messages[indexOf]
    saveData()
    listarRecados()
}

function editMessage(indexOf) {
    editSaveBtn.setAttribute('onclick', `editToMessage(${indexOf})`)
    titleModalEdit.innerText = `ID: ${indexOf} | ${users[indexUser].messages[indexOf].detail}`
    editDescript.value = users[indexUser].messages[indexOf].descript
    editDetail.value = users[indexUser].messages[indexOf].detail
    users[indexUser].messages[indexOf]
}

//REMOVER
function delMessage(indexOf) {
    users[indexUser].messages.splice(indexOf, 1)
    saveData()////salva a array
    listarRecados()
}

//GUARDAR ARRAY
function saveData()
{
    localStorage.setItem('users', JSON.stringify(users))//NOVO ARRAY
}

goTop.addEventListener('click', goForTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})