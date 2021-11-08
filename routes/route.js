

const express = require('express')
const app = express()
const route = express.Router()

const home = require('../controllers/home')
const depot = require('../controllers/depot')
const agent = require('../controllers/agent')

// Teste
route.get('/teste', home.teste)
route.get('/teste2', home.teste2)
route.post('/teste2', home.postTeste2)

// Home
route.get('/', home.index)
route.post('/', home.postIndex) 

// About
route.get('/about', home.about)
route.post('/about', home.postAbout)


// depot
route.get('/MseRetire', depot.retire)
route.get('/listDemande', depot.list)
route.post('/listDemande', depot.postList)
route.get('/listDetail', depot.listDetail)
route.post('/listDetail', depot.postListDetail)
route.get('/demandeValide', depot.valide)
route.get('/demandeRejete', depot.rejete)
route.get('/addDemande', depot.add)
route.post('/addDemande', depot.postAdd)

route.get('/postPointeur', depot.postPointeur)
route.post('/postPointeur', depot.postPostPointeur)

route.get('/retraitPointeur', depot.retraitPointeur)
route.post('/retraitPointeur', depot.postRetraitPointeur)


route.get('/changeEtatDemande', depot.changeEtat)
route.post('/changeEtatDemande', depot.postChangeEtat)


// Agent
route.get('/listAgent', agent.list)
route.post('/listAgent', agent.postList)

route.get('/addAgent', agent.add)
route.post('/addAgent', agent.postAdd)

route.get('/login', agent.login)
route.post('/login', agent.postLogin)

module.exports = route
