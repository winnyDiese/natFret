


    // let id = sessionStorage.getItem('idUser')
    let id = JSON.stringify(sessionStorage.getItem('idUser'))
    let type = JSON.stringify(sessionStorage.getItem('typeUser'))
    

$(document).ready(()=>{

    $.post('/about',{id:id,type:type},()=>{ })


})


