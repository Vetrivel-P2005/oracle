import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentPage() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ roll_number: "", name: "", cgpa: "", department_name: "" });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await axios.get("http://localhost:3000/students");
        setStudents(res.data);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        if (form.roll_number) {
            await axios.post("http://localhost:3000/students", form);
            setForm({ roll_number: "", name: "", cgpa: "", department_name: "" });
            fetchStudents();
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/students/${id}`);
        fetchStudents();
    };

    const handleUpdate = async () => {
        await axios.put(`http://localhost:3000/students/${form.roll_number}`, form);
        setForm({ roll_number: "", name: "", cgpa: "", department_name: "" });
        fetchStudents();
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-indigo-800 text-center">🎓 Student Management</h2>
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <input className="border p-2 rounded w-44 shadow" name="roll_number" placeholder="Roll No" value={form.roll_number} onChange={handleChange} />
                <input className="border p-2 rounded w-44 shadow" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input className="border p-2 rounded w-44 shadow" name="cgpa" placeholder="CGPA" value={form.cgpa} onChange={handleChange} />
                <input className="border p-2 rounded w-44 shadow" name="department_name" placeholder="Department" value={form.department_name} onChange={handleChange} />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow" onClick={handleSubmit}>Add</button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow" onClick={handleUpdate}>Update</button>
            </div>

            <div className="overflow-x-auto rounded shadow">
                <table className="w-full border-collapse text-center bg-white">
                    <thead className="bg-indigo-700 text-white">
                        <tr>
                            <th className="p-3 border">Roll No</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">CGPA</th>
                            <th className="p-3 border">Department</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((stu, index) => (
                            <tr key={stu.roll_number} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50`}>
                                <td className="p-3 border">{stu.roll_number}</td>
                                <td className="p-3 border">{stu.name}</td>
                                <td className="p-3 border">{stu.cgpa}</td>
                                <td className="p-3 border">{stu.department_name}</td>
                                <td className="p-3 border space-x-2">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setForm(stu)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(stu.roll_number)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentPage;
