import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router'

// Cmps
import { StudentList } from '../cmps/StudentList';


// Services
import { studentService } from '../services/student.service';

export const HomePage = () => {
  const [students, setStudents] = useState([])
  const [pageSize, setPageSize] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)
  const [numOfPages, setNumOfPages] = useState(0) //4

  useEffect(() => {
    onLoadStudents()
    calcNumOfPages()
  }, [])

  const onLoadStudents = async () => {
    const students = await studentService.query()
    setStudents(students)
  }

  const calcNumOfPages = () => {
    setNumOfPages(Math.ceil(students.length / pageSize))
  }

  const StudentsToShow = () => {
    const startIdx = currentPage * pageSize
    const endIdx = startIdx + pageSize
    return students.slice(startIdx, endIdx)
  }

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage)
  }

  return (
    <>
      <Outlet />
      <section className="home-page flex column align-center">

        <StudentList
          students={StudentsToShow()}
        />

        <div className="pagination">
          {[...new Array(4).fill(0)].map((num, idx) => (
            <button
              key={idx}
              className={`primary-btn ${currentPage === idx ? "active" : ""}`}
              onClick={() => { handlePageChange(idx) }}
            >
              {idx + 1}
            </button>
          ))}
        </div>

      </section>
    </>
  );
}

