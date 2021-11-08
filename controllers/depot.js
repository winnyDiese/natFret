

require('dotenv').config()


// MongoDb
const DBNAME = process.env.DBNAME
const DBURL = process.env.DBURL

const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const MongoClient = mongodb.MongoClient


var typeUser = ''

// UrlEtat
var url =''

module.exports.postList = (req,res)=>{

    // if(url) console.log('This is the etat Url '+url)
    // else console.log('The url they are not exist')



    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
        if(error) throw error
        const db = client.db(DBNAME)



        db.collection('depot').find({etatDemande:url}).sort({_id:-1}).toArray((err,result)=>{
            
            if(err) throw err

            // console.log(result)

            typeUser = req.body.type
            console.log('PostType -- :'+typeUser)
            res.render('pages/listDemande',{data:result, type:typeUser, url:url})
            
        })


    })


}


// Liste des commandes
module.exports.list = (req,res)=>{

    // if(url) console.log('This is the etat Url '+url)
    // else console.log('The url they are not exist --> ')


    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
        if(error) throw error

        const db = client.db(DBNAME)

        db.collection('depot').find({etatDemande:url}).sort({_id:-1}).toArray((err,result)=>{
            
            if(err) throw err

            // console.log(result)
            console.log('type -- :'+typeUser)
            res.render('pages/listDemande',{data:result, type:typeUser, url:url})
            
        })

    })


    url = req.query.url
    console.log('url ->'+url)

}



// module.exports.postList = (req,res)=>{


//     let id = req.body.id
//     let type = req.body.type

//     // Render data of listDemande page
//     MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
//         if(error) throw error

//         const db = client.db(DBNAME)


//         db.collection('depot').find().toArray((err,result)=>{
            
//             if(err) throw err

//             // console.log(result)
//             res.render('pages/listDemande',{data:result,id:id,type:type})
            
//         })

//     })


//     let check = req.body.check

//     let idProduit = req.body.idProduit
//     let etat = req.body.etat
//     // let idClient = req.query.idClient
    

//     if(check){

//         console.log('the val : '+ check)

//         // Update Eyay de la demande
//         MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
//             if(error) throw error
    
//             const db = client.db(DBNAME)
//             db.collection('depot').updateOne({_id:idProduit},{ $set : {etatDemande:etat}}).then(()=>console.log('Data updated'))
        
//         })

//     }else console.log('The val is empty')


// }



var typeOfDetail = ''

module.exports.postListDetail = (req,res)=>{

    let msg = ''

    console.log('Post TypeUser : '+ typeOfDetail)

    let idProduit = req.query.idProduit
    let idClient = req.query.idClient

    idProduit = new ObjectId(idProduit)
    idClient = new ObjectId(idClient)


    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
        if(error) throw error

        const db = client.db(DBNAME)

        // Find data from depot collection
        db.collection('depot').find({_id:idProduit}).toArray((err,depot)=>{
            if(err) throw err
            // console.log('Data envoyé :')
            // console.log(depot)

                console.log('Depot mis à jour ')

                for (let i = 0; i < depot.length; i++) {

                    const element = depot[i];
                    console.log('Depot mis à jour '+depot[i].mse)
                    
                }


                
                // Finc data from  agent collection
                db.collection('agent').find({_id:idClient}).toArray((err,agent)=>{
                    if(err) throw err
                    // console.log('The agent connected')
                    // console.log(agent)

                    // TypeUser
                    typeOfDetail = req.body.type

                    // Etat à modifier
                    let etat = req.body.etat

                    // Prix du transport
                    let prix = req.body.prix
                    console.log('Price of transport :'+prix)

                        if(etat != '' && prix != ''){

                            // if(typeOfDetail == "\"Gerant \""){ 
                                msg = 'Vous venez de modifier l\'Etat'

                                db.collection('depot').updateOne({_id:idProduit},{ $set : {etatDemande:etat, prix:prix}}).then(()=>console.log('Data updated'))
                                

                                res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})

                            // }else{
                            //     msg = "Veuillez rafrechir la page, s'il vous plait (Refresh). / Si ça ne marche toujours pas, rentrez à la page d\'accueil puis revenez. / Ou encore rafrechir l'adresse Url.."
                            //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
                            // }
                        }else{
                            msg = 'Veuillez toutes les information requises '
                            res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
                        }

                })

        })


        // let etat = req.body.etat
        // console.log('Voici votre etat')
        // console.log(etat)&


        // db.collection('depot').updateOne({_id:idProduit},{ $set : {etatDemande:etat}}).then(()=>console.log('Data updated'))
        
        // if(etat != ''){

        //     msg = 'Vous venez de modifier l\'Etat'

        //     console.log('Post TypeUser : '+ typeOfDetail)
        //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
        
        // }else{
        //     msg = 'Veuillez modifier l\'état'
        //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
        // }

    // })

    })

}


module.exports.listDetail = (req,res)=>{

    let msg = "Vous pouvez modifier l'etat" 

    let idProduit = req.query.idProduit
    let idClient = req.query.idClient

    idProduit = new ObjectId(idProduit)
    idClient = new ObjectId(idClient)

    // console.log('TypeUser : '+ typeOfDetail)

    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
        if(error) throw error

        const db = client.db(DBNAME)

        // Find data from depot collection
        db.collection('depot').find({_id:idProduit}).toArray((err,depot)=>{
            if(err) throw err
            // console.log('Data envoyé :')
            // console.log('TypeUser : '+ typeOfDetail)
            // console.log(depot)

                
                // Finc data from  agent collection
                db.collection('agent').find({_id:idClient}).toArray((err,agent)=>{
                    if(err) throw err
                    // console.log('The agent connected')
                    // console.log(agent)

                    console.log('TypeUser : '+ typeOfDetail)
                    res.render('pages/listDetail',{depot:depot,agent:agent, type:typeOfDetail, msg:msg})
                })

        })


        // To obtent  the data of many collection
        // with $lookup function


        // db.collection('depot').aggregate([
        //     {
        //         $lookup : {
        //             from : "agent",
        //             localField: "idClient",
        //             foreignField:"_id",
        //             as : "agent"
        //         }
        //     }
        // ]).toArray((err,result)=>{
        //     if(err) throw err

        //     console.log(result)
        //     res.render('pages/listDetail',{:result})

        // })


        if(idProduit) console.log('Votre idProduit :' + idProduit)
        else console.log('The idProduct is not exist')

    })

}



// Change Etat Demande
module.exports.changeEtat = (req,res)=>{
    res.render('pages/changeEtatDemande')
}

module.exports.postChangeEtat = (req,res)=>{
    res.render('pages/changeEtatDemande')
}

module.exports.valide = (req,res)=>{
    res.render('pages/demandeValide')
}

module.exports.rejete = (req,res)=>{
    res.render('pages/demandeRejete')
}

module.exports.retire = (req,res)=>{
    res.render('pages/mseRetire')
}

var type = ''

// Post
module.exports.postAdd = (req,res)=>{

    type = req.body.type

    let msg = ''
    let date = new Date()

    let mse = req.body.mse
    let nbre = req.body.nbre
    let provenance = req.body.provenance
    let destination = req.body.destination
    let idClient = req.body.idUser
    let dateDemande = date.toLocaleString('fr-FR',{
        
        weekday: 'long',
        year : 'numeric',
        month: 'long',
        day: 'numeric',

        hour:'numeric',
        minute:'numeric',
        second:'numeric'

    })
    let etatDemande = "En attente"



    if( mse != null || nbre != null || provenance != null || destination != null){

        if( mse != '' || nbre != '' || provenance != '' || destination != ''){
            
            // if(typeof type != 'undefined'){

                let depot = {
                    mse:mse,
                    nbre:nbre,
                    provenance:provenance,
                    destination:destination,
                    idClient:idClient,
                    dateDemande:dateDemande,
                    etatDemande:etatDemande
                }

                // console.log(depot)
                // let destination = req.body.destination


                // BDD
                MongoClient.connect(DBURL, {useNewUrlParser:true}, (error,client)=>{
                    
                    if(error) console.Console(error)

                    const db = client.db(DBNAME)
                    db.collection('depot').insertOne(depot)
                    
                    console.log('Post type :'+type)
                    console.log('The data is added')
                })

                msg = 'Une demande de déppot a été ajouté'

                res.render('pages/addDemande', {type:type, msg:msg})
                console.log('Type is :'+type)

            // }else{

            //     msg = 'Veuillez rafrechir la page, puis ressayez'
            //     res.render('pages/addDemande', {type:type, msg:msg})
        
            // }


        }else{

            msg = 'Veuillez remplir tous les champs'
            res.render('pages/addDemande', {type:type, msg:msg})
    
        }


    }else{

        msg = 'Veuillez remplir tous les champs'
        res.render('pages/addDemande', {type:type, msg:msg})

    }

    

    

    
}

module.exports.add = (req,res)=>{

    let msg = 'Ajouter votre demande'

    res.render('pages/addDemande',{type:type, msg:msg})
    console.log('Type is -> :'+type)
}





// 
module.exports.postPostPointeur = (req,res)=>{

    let msg = ''

    console.log('Post TypeUser : '+ typeOfDetail)

    let idProduit = req.query.idProduit
    let idClient = req.query.idClient

    idProduit = new ObjectId(idProduit)
    idClient = new ObjectId(idClient)

    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
        if(error) throw error

        const db = client.db(DBNAME)

        // Find data from depot collection
        db.collection('depot').find({_id:idProduit}).toArray((err,depot)=>{
            if(err) throw err
            // console.log('Data envoyé :')
            // console.log(depot)

                
                // Finc data from  agent collection
                db.collection('agent').find({_id:idClient}).toArray((err,agent)=>{
                    if(err) throw err
                    // console.log('The agent connected')
                    // console.log(agent)

                    // TypeUser
                    typeOfDetail = req.body.type

                    // Etat à modifier
                    let etat = req.body.etat

                    // Prix du transport
                    let cargaison = req.body.cargaison
                    console.log('Price of transport :'+cargaison)

                        if(etat != '' && cargaison != ''){

                            // if(typeOfDetail == "\"Gerant \""){ 
                                msg = 'Vous venez de modifier l\'Etat'

                                db.collection('depot').updateOne({_id:idProduit},{ $set : {etatDemande:etat, cargaison:cargaison}}).then(()=>console.log('Data updated'))

                                res.render('pages/postPointeur',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})

                            // }else{
                            //     msg = "Veuillez rafrechir la page, s'il vous plait (Refresh). / Si ça ne marche toujours pas, rentrez à la page d\'accueil puis revenez. / Ou encore rafrechir l'adresse Url.."
                            //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
                            // }
                        }else{
                            msg = 'Veuillez toutes les information requises '
                            res.render('pages/postPointeur',{depot:depot, agent:agent, type:typeOfDetail, msg:msg})
                        }

                })

        })


        // let etat = req.body.etat
        // console.log('Voici votre etat')
        // console.log(etat)&


        // db.collection('depot').updateOne({_id:idProduit},{ $set : {etatDemande:etat}}).then(()=>console.log('Data updated'))
        
        // if(etat != ''){

        //     msg = 'Vous venez de modifier l\'Etat'

        //     console.log('Post TypeUser : '+ typeOfDetail)
        //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
        
        // }else{
        //     msg = 'Veuillez modifier l\'état'
        //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
        // }

    // })

    })

}

module.exports.postPointeur = (req,res)=>{

    let msg = "Vous pouvez stocker la marchandise" 

    let idProduit = req.query.idProduit
    let idClient = req.query.idClient

    idProduit = new ObjectId(idProduit)
    idClient = new ObjectId(idClient)

    // console.log('TypeUser : '+ typeOfDetail)


    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        if(error) throw error

        const db = client.db(DBNAME)

        // Find data from depot collection
        db.collection('depot').find({_id:idProduit}).toArray((err,depot)=>{
            if(err) throw err
            // console.log('Data envoyé :')
            // console.log('TypeUser : '+ typeOfDetail)
            // console.log(depot)

                
                // Finc data from  agent collection
                db.collection('agent').find({_id:idClient}).toArray((err,agent)=>{
                    
                    if(err) throw err
                    // console.log('The agent connected')
                    // console.log(agent)

                    console.log('TypeUser : '+ typeOfDetail)
                    res.render('pages/postPointeur',{depot:depot,agent:agent, type:typeOfDetail, msg:msg})
                
                })

        })


        // To obtent  the data of many collection
        // with $lookup function


        // db.collection('depot').aggregate([
        //     {
        //         $lookup : {
        //             from : "agent",
        //             localField: "idClient",
        //             foreignField:"_id",
        //             as : "agent"
        //         }
        //     }
        // ]).toArray((err,result)=>{
        //     if(err) throw err

        //     console.log(result)
        //     res.render('pages/listDetail',{:result})

        // })


        if(idProduit) console.log('Votre idProduit :' + idProduit)
        else console.log('The idProduct is not exist')

    })

}


// 
module.exports.postRetraitPointeur = (req,res)=>{

    let msg = ''

    console.log('Post TypeUser : '+ typeOfDetail)

    let idProduit = req.query.idProduit
    let idClient = req.query.idClient

    idProduit = new ObjectId(idProduit)
    idClient = new ObjectId(idClient)

    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        
        if(error) throw error

        const db = client.db(DBNAME)

        // Find data from depot collection
        db.collection('depot').find({_id:idProduit}).toArray((err,depot)=>{
            if(err) throw err
            // console.log('Data envoyé :')
            // console.log(depot)

                
                // Finc data from  agent collection
                db.collection('agent').find({_id:idClient}).toArray((err,agent)=>{
                    if(err) throw err
                    // console.log('The agent connected')
                    // console.log(agent)

                    // TypeUser
                    typeOfDetail = req.body.type

                    // Etat à modifier
                    let etat = req.body.etat

                    // Prix du transport
                    let cargaison = req.body.cargaison
                    console.log('Price of transport :'+cargaison)

                        if(etat != ''){

                            // if(typeOfDetail == "\"Gerant \""){ 
                                msg = 'Vous venez de modifier l\'Etat'

                                db.collection('depot').updateOne({_id:idProduit},{ $set : {etatDemande:etat}}).then(()=>console.log('Data updated'))

                                res.render('pages/postRetraitPointeur',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})

                            // }else{
                            //     msg = "Veuillez rafrechir la page, s'il vous plait (Refresh). / Si ça ne marche toujours pas, rentrez à la page d\'accueil puis revenez. / Ou encore rafrechir l'adresse Url.."
                            //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
                            // }
                        }else{
                            msg = 'Veuillez toutes les information requises '
                            res.render('pages/postRetraitPointeur',{depot:depot, agent:agent, type:typeOfDetail, msg:msg})
                        }

                })

        })


        // let etat = req.body.etat
        // console.log('Voici votre etat')
        // console.log(etat)&


        // db.collection('depot').updateOne({_id:idProduit},{ $set : {etatDemande:etat}}).then(()=>console.log('Data updated'))
        
        // if(etat != ''){

        //     msg = 'Vous venez de modifier l\'Etat'

        //     console.log('Post TypeUser : '+ typeOfDetail)
        //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
        
        // }else{
        //     msg = 'Veuillez modifier l\'état'
        //     res.render('pages/listDetail',{depot:depot,agent:agent,type:typeOfDetail, msg:msg})
        // }

    // })

    })

}


module.exports.retraitPointeur = (req,res)=>{

    let msg = "Vous pouvez retirer la marchandise" 

    let idProduit = req.query.idProduit
    let idClient = req.query.idClient

    idProduit = new ObjectId(idProduit)
    idClient = new ObjectId(idClient)

    // console.log('TypeUser : '+ typeOfDetail)


    MongoClient.connect(DBURL,{useNewUrlParser:true},(error,client)=>{
        if(error) throw error

        const db = client.db(DBNAME)

        // Find data from depot collection
        db.collection('depot').find({_id:idProduit}).toArray((err,depot)=>{
            if(err) throw err
            // console.log('Data envoyé :')
            // console.log('TypeUser : '+ typeOfDetail)
            // console.log(depot)

                
                // Finc data from  agent collection
                db.collection('agent').find({_id:idClient}).toArray((err,agent)=>{
                    if(err) throw err
                    // console.log('The agent connected')
                    // console.log(agent)

                    console.log('TypeUser : '+ typeOfDetail)
                    res.render('pages/postRetraitPointeur',{depot:depot,agent:agent, type:typeOfDetail, msg:msg})
                })

        })


        // To obtent  the data of many collection
        // with $lookup function


        // db.collection('depot').aggregate([
        //     {
        //         $lookup : {
        //             from : "agent",
        //             localField: "idClient",
        //             foreignField:"_id",
        //             as : "agent"
        //         }
        //     }
        // ]).toArray((err,result)=>{
        //     if(err) throw err

        //     console.log(result)
        //     res.render('pages/listDetail',{:result})

        // })


        if(idProduit) console.log('Votre idProduit :' + idProduit)
        else console.log('The idProduct is not exist')

    })

}



