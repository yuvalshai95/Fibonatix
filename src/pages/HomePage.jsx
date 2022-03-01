import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router'

// Cmps
import { StudentList } from '../cmps/StudentList';


// Services
import { studentService } from '../services/student.service';
import { showUserMsg } from '../services/event-bus.service'

export const HomePage = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [pageSize, setPageSize] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)
  const [numOfPages, setNumOfPages] = useState(0)



  useEffect(() => {
    onLoadStudents()
  }, [])

  useEffect(() => {
    calcNumOfPages()
  }, [students])

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

  const onChangePage = (selectedPage) => {
    setCurrentPage(selectedPage)
  }

  const onRemoveStudent = (studentId) => {
    if (!studentId) return
    studentService.remove(studentId)
    const updatedStudents = students.filter(student => (student.id !== studentId))
    setStudents(updatedStudents)
    showUserMsg(`Student removed successfully`, 'success')
  }


  const onToggleSelect = async (student) => {
    if (!student) return
    const studentToUpdate = { ...student, isSelected: !student.isSelected }
    const updatedStudent = await studentService.update(studentToUpdate)
    const updatedStudents = students.map(student => {
      if (student.id === updatedStudent.id) return updatedStudent
      else return student
    })
    setStudents(updatedStudents)
    const txt = student.isSelected ? `Removed selection` : `${student.fullName} was selected`
    showUserMsg(txt)
  }


  const onRemoveSelected = () => {
    let selectedCounter = 0
    students.forEach(student => {
      if (student.isSelected) selectedCounter++
    })
    if (!selectedCounter) {
      showUserMsg('You must select first!', 'warning')
    } else {
      const updatedStudents = students.filter(student => !student.isSelected)
      studentService.setStudents(updatedStudents)
      setStudents(updatedStudents)
      showUserMsg(`Removed ${selectedCounter} students successfully`, 'success')
    }

  }

  const handleEditStudent = (id) => {
    navigate(`edit/${id}`)
  }

  return (
    <>
      <Outlet context={onLoadStudents} />
      <section className="home-page flex column align-center">

        <div className="remove-selected-btn flex justify-center align-center">
          <button className="primary-btn"
            onClick={onRemoveSelected}>
            Remove Selected
          </button>
        </div>

        <StudentList
          students={StudentsToShow()}
          handleRemoveStudent={onRemoveStudent}
          onToggleSelect={onToggleSelect}
          handleEditStudent={handleEditStudent}
        />

        <div className="pagination">
          {[...new Array(numOfPages).fill(0)].map((num, idx) => (
            <button
              key={idx}
              className={`primary-btn ${currentPage === idx ? "active" : ""}`}
              onClick={() => { onChangePage(idx) }}
            >
              {idx + 1}
            </button>
          ))}
        </div>

      </section>
    </>
  );
}

