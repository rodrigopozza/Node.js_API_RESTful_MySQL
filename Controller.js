const express = require('express');
const cors = require('cors');

const { sequelize, Sequelize } = require('./models')
const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let pedido = models.Pedido;
let itempedido = models.ItemPedido;
let servico = models.Servico;
let compra = models.Compra;
let produto = models.Produto;
let itemproduto = models.ItemProduto;

app.get('/', function (req, res) {
    res.send("Olá Mundo!")
})


app.post('/clientes', async (req, res) => {
    await cliente.create(
        req.body
    ).then(function (cli) {
        return res.json({
            error: false,
            message: "cadastro cliente criado com sucesso!!",
            cli
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "foi impossivel se conectar.!"

        });
    });
})

app.post('/clientes/:id/pedidos', async (req, res) => {
    const ped = {
        dataPedido: req.body.dataPedido,
        ClienteId: req.params.id
    };
    if (! await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe!"
        });
    }
    await pedido.create(ped)
        .then(function (pedcli) {
            return res.json({
                error: false,
                message: "pedido criado com sucesso!!",
                pedcli
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "foi impossivel se conectar.!"

            });
        })
})

app.post('/servicos', async (req, res) => {
    await servico.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "serviço criado com sucesso!!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "foi impossivel se conectar.!"

        });
    });
})

app.post('/itempedidos', async (req, res) => {
    await itempedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "item criado com sucesso!!",

        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "foi impossivel se conectar.!"

        });
    });
})

app.post('/clientes/:id/compras', async (req, res) => {
    const comp = {
        data: req.body.data,
        ClienteId: req.params.id
    };
    if (! await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Cliente não existe!"
        });
    }
    await compra.create(comp)
        .then(function (compcli) {
            return res.json({
                error: false,
                message: "Compra criada com sucesso!!",
                compcli
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "foi impossivel se conectar.!"

            });
        })
})

app.post('/produtos', async (req, res) => {
    await produto.create(
        req.body
    ).then(function (prod) {
        return res.json({
            error: false,
            message: "produto criado com sucesso!!",
            prod
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "foi impossivel se conectar.!"

        });
    });
})

app.post('/itemprodutos', async (req, res) => {
    await itemproduto.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "item criado com sucesso!!",

        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "foi impossivel se conectar.!"

        });
    });
})

app.get('/listaservicos', async (req, res) => {
    await servico.findAll({

        order: [['nome', 'ASC']]
    }).then(function (servicos) {
        res.json({ servicos })
    });
});

app.get('/ofertaservicos', async (req, res) => {
    await servico.count('id').then(function (servicos) {
        res.json({ servicos });
    })
});

app.get('/servicos/:id', async (req, res) => {
    await servico.findByPk(req.params.id)
        .then(serv => {
            return res.json({
                error: false,
                serv
            }).catch(function (erro) {
                return res.status(400).json({
                    error: true,
                    message: "Erro: não foi possivel conectar!"
                });
            });
        })
})

app.get('/servicos/:id/pedidos', async (req, res) => {
    await itempedido.findAll({
        where: {ServicoId: req.params.id}})
        .then(item => {
            return res.json({
                error: false,
                item
            }).catch(function (erro) {
                return res.status(400).json({
                    error: true,
                    message: "Erro: não foi possivel conectar!"
                });
            });
        });
})

app.get('/listaclientes', async (req, res) => {
    await cliente.findAll({
        order: [['nome', 'ASC']]
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

app.get('/ofertaclientes', async (req, res) => {
    await cliente.count('id').then(function (clientes) {
        res.json({ clientes });
    })
});

app.get('/listaItempedidos', async (req, res) => {
    await itempedido.findAll({
        order: [['valor', 'ASC']]
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

app.get('/listapedidos', async (req, res) => {
    await pedido.findAll({
        order: [['dataPedido', 'ASC']]
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

app.get('/ofertapedidos', async (req, res) => {
    await pedido.count('id').then(function (pedidos) {
        res.json({ pedidos });
    })
});

app.get('/listaitemproduto', async (req, res) => {
    await itemproduto.findAll({
        order: [['valor', 'ASC']]
    }).then(function (compras) {
        res.json({ compras })
    });
});

app.get('/listacompra', async (req, res) => {
    await compra.findAll({
        order: [['data', 'ASC']]
    }).then(function (compras) {
        res.json({ compras })
    });
});

app.get('/ofertacompras', async (req, res) => {
    await compra.count('id').then(function (compras) {
        res.json({ compras });
    })
});

app.get('/listaprodutos', async (req, res) => {
    await produto.findAll({
        order: [['nome', 'ASC']]
    }).then(function (produtos) {
        res.json({ produtos })
    });
});

app.get('/ofertaproduto', async (req, res) => {
    await produto.count('id').then(function (produtos) {
        res.json({ produtos });
    })
});

app.put('/atualizaservico', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "serviço foi alterado com sucesso!"
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "erro na alteração do serviço"
            });
        });
    })
});

app.put('/atualizaproduto', async (req, res) => {
    await produto.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Produto foi alterado com sucesso!"
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "erro na alteração do produto"
            });
        });
    })
});

app.put('/atualizacliente', async (req, res) => {
    await cliente.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso!"
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "erro na alteração do cliente"
            });
        });
    })
});

app.put('/atualizacompra', async (req, res) => {
    await compra.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "compra foi alterada com sucesso!"
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "erro na alteração do compra"
            });
        });
    })
});

app.put('/atualizapedidos', async (req, res) => {
    await pedido.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "pedidos foi alterada com sucesso!"
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "erro na alteração do  pedido"
            });
        });
    })
});

app.get('/pedidos/:id', async (req, res) => {
    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        });
})

app.put('/pedidos/:id/editaritem', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    }
    if (! await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado!"
        })
    }
    if (! await servico.findByPk(req.body.ServicoId)) {
        return res.status(400).json({
            error: true,
            message: "Serviço nao foi encontrado!"
        })
    }
    await itempedido.update(item, {
        where: Sequelize.and({ ServicoId: req.body.ServicoId },
            { PedidoId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: " Pedido foi alterado com sucesso!",
            itens
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel alterar!"
        })
    })
})

app.put('/compras/:id/editaritem', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    }
    if (! await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Compra não foi encontrado!"
        })
    }
    if (! await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: "Produto nao foi encontrado!"
        })
    }
    await itemproduto.update(item, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { CompraId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: " Compra foi alterada com sucesso!",
            itens
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel alterar!"
        })
    })
})

app.get('/excluirCliente/:id', async (req, res) => {
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente excluido com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir cliente!"
        })
    })
})

app.get('/excluirServico/:id', async (req, res) => {
    await servico.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço excluido com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir serviço!"
        })
    })
})

app.get('/excluirProduto/:id', async (req, res) => {
    await produto.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Produto excluido com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir produto!"
        })
    })
})

app.get('/excluirCompra/:id', async (req, res) => {
    await compra.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "compra excluido com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir compra!"
        })
    })
})

app.get('/excluirPedido/:id', async (req, res) => {
    await pedido.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido excluido com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir pedido!"
        })
    })
})

app.get('/compras/:id/excluirItem', async (req, res) => {

    if (! await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Compra não foi encontrado!"
        })
    }
    if (! await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: "Produto nao foi encontrado!"
        })
    }
    await itemproduto.destroy({
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { CompraId: req.params.id })
    }).then(function () {
        return res.json({
            error: false,
            message: " Item foi excluido com sucesso!",

        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel excluir!"
        })
    })
})

app.put('/pedidos/:id/excluirItem', async (req, res) => {
    if (! await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado!"
        })
    }
    if (! await servico.findByPk(req.body.ServicoId)) {
        return res.status(400).json({
            error: true,
            message: "Serviço nao foi encontrado!"
        })
    }
    await itempedido.destroy({
        where: Sequelize.and({ ServicoId: req.body.ServicoId },
            { PedidoId: req.params.id })
    }).then(function () {
        return res.json({
            error: false,
            message: " item Pedido foi alterado com sucesso!",

        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel excluir!"
        })
    })
})

let port = process.env.PORT || 3003;

app.listen(port, (req, res) => {
    console.log('servidor ativo: http://localhost:3003')
})