import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout.jsx'
import HomePage from '@/pages/HomePage.jsx'
import CoursesPage from '@/pages/CoursesPage.jsx'
import BlogPage from '@/pages/BlogPage.jsx'
import MaterialsPage from '@/pages/MaterialsPage.jsx'
import TestPage from '@/pages/TestPage.jsx'
import BookingPage from '@/pages/BookingPage.jsx'
import PricingPage from '@/pages/PricingPage.jsx'
import ContactPage from '@/pages/ContactPage.jsx'
import '../App.css'

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kursy" element={<CoursesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/materialy" element={<MaterialsPage />} />
          <Route path="/test-poziomu" element={<TestPage />} />
          <Route path="/rezerwacja" element={<BookingPage />} />
          <Route path="/cennik" element={<PricingPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          {/* Redirect old hash routes */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter