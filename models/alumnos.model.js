import { pool } from '../database/connection.js'

const buscarTodos = async () => {
    const { rows } = await pool.query("SELECT * FROM ALUMNOS LIMIT 10")
    return rows
}
//aquí parametrizamos para que no nos inyecten info que no va
const encontrarRut = async (rut) => {
    const query = {
        text: "SELECT * FROM ALUMNOS WHERE RUT = $1",
        values: [rut]
    }
    const { rows } = await pool.query(query)
    return rows[0]

}

const ingresar = async ({rut, nombre, curso, nivel}) => {
    const query = {
        text: "INSERT INTO ALUMNOS VALUES ($1, $2, $3, $4) RETURNING * ",
        values: [rut, nombre, curso, nivel],
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const actualizar = async (alumnos) => {
    const query = {
        text: "UPDATE alumnos SET NOMBRE = $1, CURSO = $2, NIVEL = $3 WHERE rut = $4 RETURNING *",
        values: [alumnos.nombre, alumnos.curso, alumnos.nivel,alumnos.rut]
    }
    const { rows } = await pool.query(query)
    return rows
}

const eliminar = async (rut) => {

    const query = {
        text: "DELETE FROM ALUMNOS WHERE RUT =$1 RETURNING *",
        values: [rut]
    }
    const { rows } = await pool.query(query)
    return rows

}

export const alumnosModel = {
    buscarTodos,
    encontrarRut,
    ingresar,
    actualizar,
    eliminar
}