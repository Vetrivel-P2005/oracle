const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    user: "system",
    password: "root",
    connectString: "localhost:1521/XE",
};

// 🔹 Get all students
app.get("/students", async (req, res) => {
    let con;
    try {
        con = await oracledb.getConnection(dbConfig);
        const result = await con.execute("SELECT * FROM stu");
        res.json(result.rows.map(row => ({
            roll_number: row[0],
            name: row[1],
            cgpa: row[2],
            department_name: row[3]
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (con) await con.close();
    }
});

// 🔹 Add student
app.post("/students", async (req, res) => {
    const { roll_number, name, cgpa, department_name } = req.body;
    let con;
    try {
        con = await oracledb.getConnection(dbConfig);
        await con.execute(
            "INSERT INTO stu (roll_number, name, cgpa, department_name) VALUES (:roll_number, :name, :cgpa, :department_name)",
            { roll_number, name, cgpa, department_name },
            { autoCommit: true }
        );
        res.json({ message: "Student added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (con) await con.close();
    }
});

// 🔹 Update student
app.put("/students/:id", async (req, res) => {
    const roll_number = req.params.id;
    const { name, cgpa, department_name } = req.body;
    let con;
    try {
        con = await oracledb.getConnection(dbConfig);
        await con.execute(
            "UPDATE stu SET name = :name, cgpa = :cgpa, department_name = :department_name WHERE roll_number = :roll_number",
            { name, cgpa, department_name, roll_number },
            { autoCommit: true }
        );
        res.json({ message: "Student updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (con) await con.close();
    }
});

// 🔹 Delete student
app.delete("/students/:id", async (req, res) => {
    const roll_number = req.params.id;
    let con;
    try {
        con = await oracledb.getConnection(dbConfig);
        await con.execute("DELETE FROM stu WHERE roll_number = :roll_number", 
                          { roll_number }, { autoCommit: true });
        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (con) await con.close();
    }
});

// 🔹 Get all departments
app.get("/departments", async (req, res) => {
    let con;
    try {
        con = await oracledb.getConnection(dbConfig);
        const result = await con.execute("SELECT * FROM dept");
        res.json(result.rows.map(row => ({
            department_name: row[0],
            student_count: row[1]
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (con) await con.close();
    }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
