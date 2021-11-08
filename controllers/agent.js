
require('dotenv').config()


// Post
const DBNAME = process.env.DBNAME
const DBURL = process.env.DBURL

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient



var type =''
var url =''

module.exports.postList = (req,res)=>{

    type = req.body.type
    
    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        if(error) throw error

        const db = client.db(DBNAME)

        console.log('Post url '+url)

        // Finc data from  agent collection
        db.collection('agent').find({type:url}).toArray((err,agent)=>{
            if(err) throw err
            // console.log(agent)

            res.render('pages/user',{type:type,agent:agent, url:url})
        })

    
    })
}

module.exports.list = (req,res)=>{

    url = req.query.url

    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        if(error) throw error

        const db = client.db(DBNAME)

        console.log('url '+url)

        // Finc data from  agent collection
        db.collection('agent').find({type:url}).toArray((err,agent)=>{
            if(err) throw err
            // console.log(agent)

            res.render('pages/user',{type:type,agent:agent, url:url})
        })

    
    })

}



let msg =''
module.exports.add = (req,res)=>{

    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{

        if(error) throw error

        const db = client.db(DBNAME)

        // Afficher les types avant l'enregistrement
        db.collection('type').find().toArray((err,result)=>{

            if(err) throw err

            msg = 'Inscrivez vous'
            res.render('pages/addAgent',{type:result, msg:msg})
            
        })
    })
}


module.exports.postAdd = (req,res)=>{

    // BDD
    MongoClient.connect(DBURL, {useNewUrlParser:true}, (error,client)=>{
        
        if(error) console.Console(error)

        const db = client.db(DBNAME)

        // Affichage des types (Pour le selecteurs)
        db.collection('type').find().toArray((err,result)=>{

            if(err) throw err
                
            // PREPARATION DE L'INSERTION
            
            let nom = req.body.nom
            let prenom = req.body.prenom
            let postnom = req.body.postnom
            let email = req.body.email
            let numTel = req.body.numTel
            let passworld = req.body.passworld
            let type = req.body.type

            let agent = {
                nom : nom,
                prenom : prenom,
                postnom : postnom,
                email : email,
                numTel : numTel,
                passworld : passworld,
                type : type
            }

            
            if( nom != null || prenom != null || postnom != null || email != null || numTel != null || passworld != null || type != null){
                if( nom != '' || prenom != '' || postnom != '' || email != '' || numTel != '' || passworld != '' || type != ''){

                    // Insertion des agents
                    db.collection('agent').insertOne(agent)
                    console.log('The agent added')

                    msg = 'Inscription fait avec succée. Allez maintenant vous connecter'
                    res.render('pages/addAgent',{type:result, msg:msg})
    

                }else{

                    msg = 'Rassurez vous d\'avoir remplis tous les champs'
                    res.render('pages/addAgent',{type:result, msg:msg})
    
                }

            }else{

                msg = 'Rassurez vous d\'avoir remplis tous les champs'
                res.render('pages/addAgent',{type:result, msg:msg})

            }

            // res.render('pages/addAgent',{type:result})
            
        })

    })

}

//  LOGIN
module.exports.login = (req,res)=>{

    // console.log(login)
    let rep = "Connectez vous"

    res.render('pages/login',{rep:rep})
}


module.exports.postLogin = (req,res)=>{


    let msg = ""

    let email = req.body.email
    let password = req.body.password

    if(email != "" && password != ""){

        let login = {
            email:email,
            password:password
        }

        MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
            if(error) throw error
            const db = client.db(DBNAME)
    
            let findUser = {
                email : login.email, 
                passworld : login.password
            }
    
            db.collection('agent').find(findUser).toArray((err,result)=>{
                
                if(err) throw err
    
                if(result.length == 0){
                    console.log('This compte is not existe')
                    msg = 'Email ou mot de passe '
                }else{ 
                    console.log('Voici le result :')
                    msg = 'Vous etes bel et bien connecté'
                    console.log(result)
                }
    
                res.render('pages/login', {userFind:result, rep:msg})
    
            })
    
        })

    }else{
        let msg = "Veuillez remplir tous les champs"
        res.render('pages/login',{rep:msg})
    }

    

    // console.log(login)

   
    
}


