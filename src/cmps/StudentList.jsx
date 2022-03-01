// Cmps
import { StudentPreview } from "./StudentPreview";

export const StudentList = ({ students }) => {
    if (!students.length) return <p className="students-list-empty  main-layout">No students available</p>;
    return (
        <section className="student-list-container main-layout flex">
            <div className="student-list flex justify-center">
                {students.map(student => (
                    <StudentPreview
                        key={student.id}
                        student={student}
                    // handleEditUser={handleEditUser} 
                    // handleRemoveUser={handleRemoveUser} 
                    />
                ))}
            </div>
        </section>
    );
}