

// document.querySelector('form').addEventListener('submit',(e)=>{
//     e.preventDefault()
    

    // id in session
    let idUser = document.getElementById('idUser').value
    let typeUser = document.getElementById('typeUser').value

    if( typeof idUser !== 'undefined'){
        sessionStorage.setItem('idUser',idUser)
        sessionStorage.setItem('typeUser',typeUser)
        window.location.href='http://localhost:3003/'
    }
    

// })

