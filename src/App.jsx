
import './App.css'

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import StudyPlanner from "./pages/StudyPlanner";
import TaskList from "./pages/TaskList";


export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/StudyPlanner" element={<StudyPlanner />} />
                <Route path="/TaskList" element={<TaskList />} />
            </Routes>
            <div className="pt-16">{/* Adjust pt-16 based on your navbar height */}
                {/* Your page content */}
            </div>

        </>
    );
}