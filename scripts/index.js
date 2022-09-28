// VALIDAÇÃO DO USUARIO - SE ESTA LOGADO TIPO SE PERMANECE //
sessionStorage.getItem('session') ? window.location.replace("home.html") : 
localStorage.getItem('session') ? window.location.replace("home.html") : null

const formRegister = document.querySelector('#register')
const formLogin = document.querySelector('#login')
const inputUser = document.querySelector('#inputUser')
const inputPass = document.querySelector('#inputPass')
const cotinueLogin = document.querySelector('#cotinueLogin')
const inputRePass = document.querySelector('#inputRePass')
const inputRePass2 = document.querySelector('#asdasasda')
const spanError = document.querySelector('.gap-2')

//VALIDA PAGINA DE CADASTRO
formRegister ? formRegister.addEventListener('submit', register) : null
function register(event) {
   
    event.preventDefault()
    //VALIDA CAMPOS VAZIOS
    if(inputUser.value == '' || inputPass.value == '')
    {
        let errorMsg = `<span class="text-center erro">Não deixe os campos senha e usuário vazios.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }
    //VALIDA CONFIRMAÇÃO DE SENHA
    if(inputPass.value != inputRePass.value)
    {
        let errorMsg = `<span class="text-center erro">As senhas não correspondem.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }

    if(inputPass.value.length < 6)
    {
        let errorMsg = `<span class="text-center erro">Digite pelo menos 6 caracteres.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }
    //VALIDAR SE JA EXISTE UM ARRAY DO USUARIO
    //SE NÃO CRIA O PRIMEIRO OBJETO
    if(!localStorage.getItem('users'))
    {
        let users = [
            {
                username: inputUser.value.toLowerCase(),
                password: inputPass.value,
                messages:
                    [
                        {
                            detail: 'Seja Bem Vindo',
                            descript: 'ESTE É O PRIMEIRO RECADO GOSTOU DO SISTEMA ? POR FAVOR USAR OS BOTÕES EDITAR OU EXCLUIR PARA LIMPAR SUA LISTA.'
                        }
                    ]
            }
        ]
        localStorage.setItem('users', JSON.stringify(users))
        window.location.replace("login.html")//REDIRECIONAR PAGINA DE LOGIN
    }
    else
    {
        //FILTER PARA VALIDAR USUARIO
        let users = JSON.parse(localStorage.getItem('users'))
        let retorno = users.find((value) => {
            return value.username === inputUser.value.toLowerCase()
        });
        //SE EXISTER ELE NÃO SEGUE
        if(retorno) {
            let errorMsg = `<span class="text-center erro">Este usuário já existe escolha outro</span>
            <button class="btn btn-submit" type="submit">Cadastrar</button>`
            spanError.innerHTML = errorMsg
            return
        }
        else
        {
            //SE NÃO EXISTIR CRIAR
            let newuser =
                {
                    username: inputUser.value.toLowerCase(),
                    password: inputPass.value,
                    messages:
                    [
                        {
                            detail: 'Seja Bem Vindo',
                            descript: 'ESTE É O PRIMEIRO RECADO GOSTOU DO SISTEMA ? POR FAVOR USAR OS BOTÕES EDITAR OU EXCLUIR PARA LIMPAR SUA LISTA.'
                        }
                    ]
                }
            users.push(newuser)
            localStorage.setItem('users', JSON.stringify(users))
            window.location.replace("login.html")//VOLTAR A PAGINA DE LOGIN
        }
    }
    
}


//LOGIN//
//VALIDAR PAGIGA DE LOGIN E EVENTO SUBMIT
formLogin ? formLogin.addEventListener('submit', login) : null
function login(event) {
    //PAUSA NO SUBMIT
    event.preventDefault()
    //VALIDA CAMPOS VAZIOS
    if(inputUser.value == '' || inputPass.value == '')
    {
        let errorMsg = `<span class="text-center erro">Não deixe os campos senha e usuário vazios.</span>
        <button class="btn btn-submit" type="submit">Login</button>`
        spanError.innerHTML = errorMsg
        return
    }
    //VALIDA ARRAY
    if(!localStorage.getItem('users'))
    {
        let errorMsg = `<span class="text-center erro">Usuario ou senha incorretos.</span>
        <button class="btn btn-submit" type="submit">Login</button>`
        spanError.innerHTML = errorMsg
        return
    }
    else
    {
        //FILTER PARA VALIDAR USUARIO
        let users = JSON.parse(localStorage.getItem('users'))
        let retorno = users.find((value) => {
            return value.username === inputUser.value.toLowerCase()
        });
        //SE EXISTIR
        if(retorno) {
            if(inputPass.value === retorno.password) {
                //VALIDAR SEÇÃO E USUARIO LOGADO
                let sessionObjectUser = {
                    username: retorno.username,
                    password: retorno.password
                }
                //CRIAR SEÇÃO DO USUARIO LOGADO E CARREGAR SEUS RECADOS
                if(cotinueLogin.checked) localStorage.setItem('session', JSON.stringify(sessionObjectUser))
                sessionStorage.setItem('session', JSON.stringify(sessionObjectUser))
                window.location.replace("home.html")//REDIRECIONAR A PAGINA DE RECADOS
            }
            else
            {
                let errorMsg = `<span class="text-center erro">Usuario ou senha incorretos.</span>
                <button class="btn btn-submit" type="submit">Login</button>`
                spanError.innerHTML = errorMsg
                return
            }
        }
        else
        {
            let errorMsg = `<span class="text-center erro">Usuario ou senha incorretos.</span>
            <button class="btn btn-submit" type="submit">Login</button>`
            spanError.innerHTML = errorMsg
            return
        }
    }
}
