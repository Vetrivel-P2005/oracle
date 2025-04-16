import React, { useState } from "react";
import StudentPage from "./StudentPage";
import DepartmentPage from "./DepartmentPage";

function App() {
    const [menu, setMenu] = useState("students");

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 font-sans">
            <nav className="flex justify-center gap-4 p-4 bg-indigo-600 shadow-lg text-white text-lg font-semibold">
                <button
                    className={`px-6 py-2 rounded-full hover:bg-indigo-800 transition ${
                        menu === "students" ? "bg-indigo-900" : ""
                    }`}
                    onClick={() => setMenu("students")}
                >
                    Students
                </button>
                <button
                    className={`px-6 py-2 rounded-full hover:bg-indigo-800 transition ${
                        menu === "departments" ? "bg-indigo-900" : ""
                    }`}
                    onClick={() => setMenu("departments")}
                >
                    Departments
                </button>
            </nav>
            <div className="p-6">
                {menu === "students" ? <StudentPage /> : <DepartmentPage />}
            </div>
        </div>
    );
}

export default App;
