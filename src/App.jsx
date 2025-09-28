import './App.css'

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import StudyPlanner from "./pages/StudyPlanner";
import TaskList from "./pages/TaskList";

export default function App() {
    return (
        <>
            <Navbar />
            <div className="pt-16 min-h-screen w-full bg-background">
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" replace />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/StudyPlanner" element={<StudyPlanner />} />
                    <Route path="/TaskList" element={<TaskList />} />
                </Routes>
            </div>
        </>
    );
}
