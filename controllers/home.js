

var type =''
module.exports.postIndex = (req,res)=>{

    let id = req.body.id
    type = req.body.type

    res.render('pages/index',{type:type, id:id})
    console.log('Voici votre id :'+id+ ' et type :'+type)
}

module.exports.index = (req,res)=>{
    res.render('pages/index',{type:type})
}

module.exports.about = (req,res)=>{
    res.render('pages/about',{type:type})
}

module.exports.postAbout = (req,res)=>{

    let id = req.body.id
    type = req.body.type

    res.render('pages/about',{type:type, id:id})
    console.log('Voici votre id :'+id+ ' et type :'+type)
}

module.exports.config = (req,res)=>{
    res.render('config/config.js')
}



// Teste
module.exports.teste = (req,res)=>{
    res.render('pages/teste/teste')
}



var url =''
module.exports.postTeste2 = (req,res)=>{

    console.log('Posturl -> '+url)
    res.render('pages/teste/teste2')
}
module.exports.teste2 = (req,res)=>{

    url = req.query.url
    console.log('Url -> '+url)

    res.render('pages/teste/teste2')
}
