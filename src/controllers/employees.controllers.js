import { pool } from '../db.js'

//obtener empledo
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM  employee')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

//obtener empleado por id
export const getEmployee = async (req, res) => {
  try {
    // throw new Error('error inesperado')
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
      message: 'Employeee not found'
    })
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

//crear empleado
export const postEmployees = async (req, res) => {
  const { name, salary } = req.body
  try {
    const [rows] = await pool.query('INSERT INTO employee(name, salary) VALUES (?, ?)', [name, salary])
    res.send({
      id: rows.insertId,
      name,
      salary,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

// eliminar empleado
export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
    if (result.affectedRows <= 0) return res.status(404).json({
      message: 'Employeee not found'
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

// actualizar empleado
export const putEmployees = async (req, res) => {
  const { id } = req.params
  const { name, salary } = req.body
  try {
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])

    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Employee not found'
    })

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])

    console.log(result)
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}


