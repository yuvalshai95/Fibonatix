export const StudentPreview = ({ student, handleRemoveStudent, onToggleSelect, handleEditStudent }) => {

    const { age, city, email, fullName, gender, id, imgUrl, isSelected, university } = student
    /* 
        age: 23
        city: "Nice"
        email: "lorenzo.lefevre@example.com"
        fullName: "Lorenzo Lefevre"
        gender: "male"
        id: "1Dt5CJ"
        imgUrl: "https://randomuser.me/api/portraits/med/men/68.jpg"
        isSelected: false
        university: "University of Oxford"
    */

    const onRemoveStudent = () => {
        handleRemoveStudent(id)
    }




    return (
        <div className="student-preview-container flex column align-center">
            <div className="preview-info flex column align-center">
                <img className="student-img" src={imgUrl} alt="student-img" />
                <p className="student-name">{`${fullName}, ${age}`}</p>
                <p className="student-university">{university}</p>
                <p className="student-city">{city}</p>
                <p className="student-email">{email}</p>
            </div>

            <div className="btns-container flex align-center">

                <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => { onToggleSelect(student) }}
                    checked={isSelected ? 'checked' : ''}
                />

                <button
                    className="primary-btn edit-btn"
                    onClick={() => { handleEditStudent(id) }}
                >
                    Edit
                </button>

                <button
                    className="delete-btn remove-btn"
                    onClick={onRemoveStudent}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}
