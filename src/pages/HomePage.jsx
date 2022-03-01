import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router'

// Services
import { studentService } from '../services/student.service';

export const HomePage = () => {
  const [students, setStudents] = useState([])
  const [pageSize, setPageSize] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    onLoadStudents()
  }, [])

  const onLoadStudents = async () => {
    const students = await studentService.query()
    setStudents(students)
  }

  return (
    <section className="home-page">
      <h1>Home</h1>
      <pre>{students && JSON.stringify(students, null, 2)}</pre>
    </section>
  );
}

