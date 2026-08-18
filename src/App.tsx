import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import Dashboard from './pages/admin/Dashboard'
import Schools from './pages/admin/Schools'
import Employees from './pages/admin/Employees'
import Transfers from './pages/admin/Transfers'

import Layout from './shared/layout/AdminLayout'
import SchoolEmployees from './components/admin/Employees/SchoolEmployees'
import ManagerDashboard from './pages/manager/Dashboard'
import Grades from './pages/manager/Grades'
import Subjects from './pages/manager/Subjects'
import Teachers from './pages/manager/Teachers'

import ManagerLayout from './shared/layout/ManagerLayout'

import GradeDetail from './components/manager/Grades/detail/GradeDetail'
import SectionDetail from './components/manager/Grades/detail/SectionDetail'
import EmployeesManager from './pages/manager/Employees'
import Management from './pages/manager/managment'
import Login from './pages/Auth/Login'
import ProtectedRoute from './components/route/ProtectedRoute'
import PromoteStudents from './pages/manager/Promote'
import SecretaryDashboard from './pages/secretary/Dashboard'
import Announcements from './pages/secretary/Announcements'
import Students from './pages/secretary/Students'
import SecretaryLayout from './shared/layout/SecretaryLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="schools" element={<Schools />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/school/:schoolId" element={<SchoolEmployees />} />
          <Route path="transfers" element={<Transfers />} />
        </Route>

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={['Principal']}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerDashboard />} />
          <Route path="grades" element={<Grades />} />
          <Route path="grades/:id" element={<GradeDetail />} />
          <Route path="grades/:gradeId/section/:sectionId" element={<SectionDetail />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="employees" element={<EmployeesManager />} />
          <Route path="management" element={<Management />} />
          <Route path="promote" element={<PromoteStudents />} />
        </Route>

        <Route
          path="/secretary"
          element={
            <ProtectedRoute allowedRoles={['Secretary']}>
              <SecretaryLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SecretaryDashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="students" element={<Students />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App