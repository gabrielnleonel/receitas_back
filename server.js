import fastify from 'fastify'

const servidor = fastify();

servidor.get('/usuarios', () => {
    return 'funcionando!'
})
 servidor.listen({
    port: 3000
 })