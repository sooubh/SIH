import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home/Home";
import StudentOnboarding from "./components/Student/StudentOnboarding";
import StudentDashboard from "./components/Student/StudentDashboard";
import CareerRecommendations from "./components/Student/CareerRecommendations";

// Mock data for student components
const mockStudent = {
  name: "Student",
  email: "student@example.com",
  class: "12" as const,
  subjects: [],
  marks: { overall: 85 },
  interests: [],
  personalityTraits: [],
  goals: {},
  profileComplete: false,
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Home />} />

        {/* Student Onboarding */}
        <Route
          path="/student-onboarding"
          element={<StudentOnboarding onComplete={() => {}} />}
        />

        {/* Career Recommendations */}
        <Route
          path="/career-recommendations"
          element={<CareerRecommendations />}
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <StudentDashboard
              student={mockStudent}
              onUpdateStudent={() => {}}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
