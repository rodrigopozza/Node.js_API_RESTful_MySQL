const express = require('express');
const cors = require('cors');

const models= require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let pedido = models.Pedido;
let itempedido= models.ItemPedido;
let servico = models.Servico;

app.get('/', function(req, res){
    res.send("Olá Mundo!")
})


app.post('/clientes', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(function(cli){
        return res.json({
            error : false,
            message : "cadastro cliente criado com sucesso!!",
            cli
        })
    }).catch(function(erro){
        return res.status(400).json({
            error : true,
            message : "foi impossivel se conectar.!"
            
        });
    });
})
app.post('/clientes/:id/pedidos', async(req, res)=>{
   const ped= {
        dataPedido: req.body.dataPedido,
        ClienteId: req.params.id
    };
    if(! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error : true,
            message : "Cliente não existe!"
        });
    }
    await pedido.create(ped)
    .then(function(pedcli){
        return res.json({
            error : false,
            message : "pedido criado com sucesso!!",
            pedcli
        });
    }).catch(function(erro){
        return res.status(400).json({
            error : true,
            message : "foi impossivel se conectar.!"
            
        });
    })
})
app.post('/servicos', async(req, res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error : false,
            message : "serviço criado com sucesso!!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error : true,
            message : "foi impossivel se conectar.!"
            
        });
    });
})

app.post('/itempedidos', async(req, res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error : false,
            message : "item criado com sucesso!!",
            
        })
    }).catch(function(erro){
        return res.status(400).json({
            error : true,
            message : "foi impossivel se conectar.!"
            
        });
    });
})

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        //raw: true
        order:[['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});
 
app.get('/ofertaservicos', async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    })
});

app.get('/servicos/:id', async(req,res)=>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error : false,
            serv
        }).catch(function(erro){
            return res.status(400).json({
                error : true ,
                message: "Erro: não foi possivel conectar!"
            });
        });
    })
})
app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        order:[['clienteDesde', 'DESC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/ofertaclientes', async(req,res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    })
});

app.get('/listapedidos', async(req, res)=>{
    await itempedido.findAll({
        order:[['valor', 'ASC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});
app.get('/ofertapedidos', async(req,res)=>{
    await pedido.count('id').then(function(pedidos){
        res.json({pedidos});
    })
});

app.put('/atualizaservico', async (req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
       return  res.json({
            error: false,
            message: "serviço foi alterado com sucesso!"
        }).catch(function(erro){
           return  res.status(400).json({
               error: true,
               message: "erro na alteração do serviço" 
           })
        });
    })
});

let port= process.env.PORT || 3003;

app.listen(port, (req, res)=>{
    console.log('servidor ativo: http://localhost:3003')
})