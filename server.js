import fastify from 'fastify'
import {Pool} from 'pg'

const sql = new Pool({
user: "postgres",
password: "senai",
host: "localhost",
port: 5432,
database: "receitas"
})

const servidor = fastify();

servidor.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuario')
    return resultado.rows
})

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body;

if (!body || !body.nome || !body.senha) {
    return reply.status(400).send({
        message:"nome ou senha obrigatórios!"
    })
}

    const resultado = await sql.query('INSERT INTO usuario (nome, senha) VALUES ($1, $2)', [body.nome, body.senha])
    return 'usuario cadastrado'
})

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body;
    const id = request.params.id;
    const resultado = await sql.query('UPDATE usuario SET nome = $1, senha = $2', [body.nome, body.senha])
    return 'usuario alterado!'
})

servidor.delete('/usuarios/:id', async (request, reply) => {
    const id = request.params.id;
    const resultado = await sql.query('DELETE FROM usuario where id = $1', [id])
    console.log(resultado);
    reply.status(200).send({message: 'usuario deletado!'})
})

 servidor.listen({
    port: 3000
 })
