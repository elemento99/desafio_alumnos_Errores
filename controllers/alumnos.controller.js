//cobtrolador gestiona

import { alumnosModel } from "../models/alumnos.model.js"



const todosAlumnos = async (req, res ) => {
try{

const alumnos = await alumnosModel.buscarTodos()
return res.json(alumnos)

}catch (error){
    console.log(error)
    return res.status(500).json( {ok:false})
}

}

const unicoAlumno = async (req, res) => {
    try {
        const { rut } = req.params
        const alumno = await alumnosModel.encontrarRut(rut)
        if(!alumno) return res.status(404).json( {ok: false, msg: "no se encontró alumno"})
        return res.json(alumno)

    }catch(error){
        console.log(error)
        return res.status(500).json({ ok:false})
    }
    
}

const registrarAlumno = async (req, res ) => {
    try {
        const { rut, nombre , curso, nivel } = req.body
        //validaciones rut, nombre, curso y nivel
        const nuevoAlumno = { rut, nombre , curso, nivel }
        const alumnoLista = await alumnosModel.ingresar(nuevoAlumno)
        return res.status(201).json(alumnoLista)
    }catch (error) {
        console.log(error)
        if (error.code === '23505') {
            return res.status(400).json({ ok: false, msg: "El rut ya está registrado" })
        }
        if (error.code === '23502') {
            return res.status(400).json({ ok: false, msg: "Debe ingresar el rut" })
        }

        return res.status(500).json( { ok: false})
    }
}

const actualizarAlumno = async (req, res) => {
    try {
        const { nombre, curso, nivel } = req.body
        const {rut} = req.params
        const actualizarAlumno = { nombre, curso, nivel,rut}
        const alumnoActualizado = await alumnosModel.actualizar(actualizarAlumno)
        return res.json(alumnoActualizado)

    }catch (error){
        return res.status(500).json( {ok: true})

}
}

const eliminarAlumno = async (req, res) => {
    try{
        const { rut } = req.params
        const alumnoEliminado = await alumnosModel.eliminar(rut)
        return res.json(alumnoEliminado)

    }catch (error) {
        return res.status(500).json( {ok: false})

    }

}






export const alumnosController = {
    todosAlumnos,
    unicoAlumno,
    registrarAlumno,
    actualizarAlumno,
    eliminarAlumno
    
}