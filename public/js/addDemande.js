

let type = JSON.stringify(sessionStorage.getItem('typeUser'))

let id = document.getElementById('idUser')
id.value = sessionStorage.getItem('idUser')


$(document).ready(()=>{

    
    $.post('/addDemande',{type:type},()=>{
        // $('span#etatt').text(data)
    })
})
