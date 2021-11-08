

let type = JSON.stringify(sessionStorage.getItem('typeUser'))

// // alert('Hello, how are you ?')
// let btn = document.querySelector('#refresh')

// btn.addEventListener('click', (e)=>{
//     e.preventDefault()
//     location.reload()
// })
// alert(window.location.search)


$(document).ready(()=>{

    $.post('/listDetail',{type:type},()=>{})
    
})