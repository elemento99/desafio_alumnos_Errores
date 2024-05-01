import 'dotenv/config';
import express from 'express';
import alumnosRoute from './routes/alumnos.route.js'

const app = express();

//habiliar req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middlewares-- hacemos el cambio de la ruta sólo en index, no en las rutas de route
app.use('/alumnos', alumnosRoute)







const PORT = process.env.PORT || 3030
app.listen(PORT, console.log(`Servidor funcionando en http://localhost:${PORT}`))
