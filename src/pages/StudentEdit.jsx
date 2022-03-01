import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router';
import { useOutletContext } from "react-router-dom";

// Services
import { studentService } from '../services/student.service';

// Icons
import { MdOutlineClose } from 'react-icons/md'

export const StudentEdit = () => {
  const { studentId } = useParams();
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onLoadStudents = useOutletContext()


  useEffect(() => {
    onLoadStudent()
    return () => { setStudent(null) }
  }, [])

  const onLoadStudent = async () => {
    const student = await studentService.getStudentById(studentId)
    setStudent(student)

  }

  const onSubmit = async ({ fullName, university, city, email, age }) => {
    const studentToUpdate = {
      id: student.id,
      fullName,
      university,
      city,
      email,
      age: +age,
      imgUrl: student.imgUrl,
      isSelected: student.isSelected,
      gender: student.gender
    }
    await studentService.update(studentToUpdate)
    onLoadStudents()
    handleGoBack()
  }

  const handleGoBack = () => {
    navigate('/');
  };

  if (!student) return <></>
  return (
    <div className="student-edit-screen-overlay">
      <div className="student-edit-container">
        <button className="close-btn" onClick={handleGoBack} >
          <MdOutlineClose className='close-icon' />
        </button>

        <h1>Edit Profile</h1>
        <form
          className="edit-form flex column align-center justify-center"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content">
            <div className="input-wrapper">
              <label>*Name:
                  <input type="text"
                  defaultValue={student.fullName}
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: "This field is required",
                    minLength: { value: 3, message: "minimum length is 3" },
                    maxLength: { value: 25, message: "maximun length is 25" }
                  })}
                />
              </label>
              <p>{errors.fullName?.message}</p>
            </div>

            <div className="input-wrapper">
              <label>*University:
                  <input type="text"
                  defaultValue={student.university}
                  placeholder="University"
                  {...register("university", {
                    required: "This field is required",
                    minLength: { value: 3, message: "minimum length is 3" },
                    maxLength: { value: 25, message: "maximun length is 25" }
                  })}
                />
              </label>
              <p>{errors.university?.message}</p>
            </div>

            <div className="input-wrapper">
              <label>*City:
                  <input type="text"
                  defaultValue={student.city}
                  placeholder="City"
                  {...register("city", {
                    required: "This field is required",
                    minLength: { value: 3, message: "minimum length is 3" },
                    maxLength: { value: 25, message: "maximun length is 25" }
                  })}
                />
              </label>
              <p>{errors.city?.message}</p>
            </div>

            <div className="input-wrapper">
              <label>*Email:
                  <input type="email"
                  defaultValue={student.email}
                  placeholder="Email"
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
              </label>
              <p>{errors.email?.message}</p>
            </div>

            <div className="input-wrapper">
              <label>*Age:
                  <input type="text"
                  defaultValue={student.age}
                  placeholder="Age"
                  {...register("age", {
                    required: "This field is required",
                    minLength: { value: 1, message: "minimum length is 1" },
                    maxLength: { value: 3, message: "maximun length is 3" }
                  })}
                />
              </label>
              <p>{errors.age?.message}</p>
            </div>

            <div className="form-btns">
              <button className="primary-btn" type="submit">Save</button>
              <button className="delete-btn" onClick={handleGoBack}>Close</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
