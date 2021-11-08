


let session = sessionStorage.getItem('idUser')
let urlPage = window.location.href

if(urlPage != 'http://localhost:3003/login'){

    if(session) console.log(session)
    else window.location.href='http://localhost:3003/login'

}else{
    sessionStorage.clear()
}


