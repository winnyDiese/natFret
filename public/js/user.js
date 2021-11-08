

// let id = document.getElementById('idUser')
// id.value = sessionStorage.getItem('idUser')

let type = JSON.stringify(sessionStorage.getItem('typeUser'))


$(document).ready(()=>{

    $.post('/listAgent',{type:type},()=>{ })
})



// alert('Hello')