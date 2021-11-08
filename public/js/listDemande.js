

 let id = sessionStorage.getItem('idUser')
 let type = JSON.stringify(sessionStorage.getItem('typeUser'))


// Ajout du paramettre idClient dans le lien
let link = document.querySelectorAll('.link')
for(let k in link) link[k].href+= '&idClient=' + sessionStorage.getItem('idUser')


$(document).ready(()=>{

    // 
    $.post('/listDemande',{id:id, type:type},()=>{

    })
})