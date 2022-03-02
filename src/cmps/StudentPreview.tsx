// Icons
import { BsGenderFemale } from 'react-icons/bs';
import { BsGenderMale } from 'react-icons/bs'

// Model
import {Student} from '../models/student.model'

type Props ={
    student:Student,
    handleRemoveStudent:any,
    onToggleSelect:any,
    handleEditStudent:any
}

export const StudentPreview = ({ student, handleRemoveStudent, onToggleSelect, handleEditStudent }:Props) => {

    const { age, country, email, fullName, gender, id, imgUrl, isSelected, university } = student

    const onRemoveStudent = () => {
        handleRemoveStudent(id)
    }

    return (
        <div className="student-preview-container flex column align-center">
            {gender === 'male' ? <BsGenderMale className="gender male" />
                : <BsGenderFemale className="gender female" />}

            <div className="preview-info flex column align-center">
                <img className="student-img" src={imgUrl} alt="student-img" />
                <p className="student-name">{`${fullName}, ${age}`}</p>
                <p className="student-university">{university}</p>
                <p className="student-country">{country}</p>
                <p className="student-email">{email}</p>
            </div>

            <div className="btns-container flex align-center">
                <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => { onToggleSelect(student) }}
                    checked={isSelected}
                />

                <button
                    className="primary-btn edit-btn"
                    onClick={() => { handleEditStudent(id) }}>
                    Edit
                </button>

                <button
                    className="delete-btn remove-btn"
                    onClick={onRemoveStudent}>
                    Remove
                </button>
            </div>
        </div>
    )
}
