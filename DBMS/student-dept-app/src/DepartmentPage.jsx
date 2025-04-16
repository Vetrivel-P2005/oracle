import React, { useEffect, useState } from "react";
import axios from "axios";

function DepartmentPage() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/departments")
             .then(res => setDepartments(res.data));
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">🏫 Departments</h2>
            <div className="overflow-x-auto rounded shadow">
                <table className="w-full border-collapse text-center bg-white">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-3 border">Department Name</th>
                            <th className="p-3 border">Student Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept, index) => (
                            <tr key={dept.department_name} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50`}>
                                <td className="p-3 border">{dept.department_name}</td>
                                <td className="p-3 border">{dept.student_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DepartmentPage;
