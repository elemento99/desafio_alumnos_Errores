import { Router } from 'express';
import { alumnosController } from '../controllers/alumnos.controller.js';


const router = Router()



//generemos  solicitudes get, por, put y delete
//PATH/alumnos
//obtener todos los alumnos registradors en music always
router.get('/', alumnosController.todosAlumnos)
//buscar a estudiante por rut
router.get('/:rut', alumnosController.unicoAlumno)
//registrar a un nuevo estudiante
router.post('/', alumnosController.registrarAlumno)
//actualizar a estudiante
router.put('/:rut', alumnosController.actualizarAlumno)
//eliminar estudiante
router.delete('/:rut', alumnosController.eliminarAlumno)


export default router; 