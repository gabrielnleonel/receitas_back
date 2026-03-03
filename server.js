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

servidor.get('/usuarios', () => {
    return 'funcionando!'
})

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body

   await sql.query('select * from usuarios')

    return resultado.rows
})


 servidor.listen({
    port: 3000
 })
