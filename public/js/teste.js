


    let p = document.querySelector('p')
    // p.innerHTML = Date.now()

    // let date = new Date()
    
    let date = new Date()
    let dateLocal = date.toLocaleString('fr-FR',{
        
        weekday: 'long',
        year : 'numeric',
        month: 'long',
        day: 'numeric',

        hour:'numeric',
        minute:'numeric',
        second:'numeric'

    })


    p.innerHTML = dateLocal

    $(document).ready(()=>{

        $.post('/teste2',()=>{ })
        
    })