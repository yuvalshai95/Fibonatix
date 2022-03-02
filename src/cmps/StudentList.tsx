// Cmps
import { StudentPreview } from "./StudentPreview";

// Model
import {Student} from '../models/student.model'

type Props ={
    students:Student[],
    handleRemoveStudent:any,
    onToggleSelect:any,
    handleEditStudent:any
}

export const StudentList = ({ students, handleRemoveStudent, onToggleSelect, handleEditStudent }:Props) => {
    if (!students.length)
        return (
            <p className="students-list-empty  main-layout flex justify-center">
                No students available
            </p>
        );

    return (
        <section className="student-list-container main-layout flex">
            <div className="student-list flex justify-center">
                {students.map((student) => (
                    <StudentPreview
                        key={student.id}
                        student={student}
                        handleRemoveStudent={handleRemoveStudent}
                        onToggleSelect={onToggleSelect}
                        handleEditStudent={handleEditStudent}
                    />
                ))}
            </div>
        </section>
    );
}
