import axios from 'axios';
import {storageService} from './async-storage.service.js';
import {utilService} from './util.service.js';

export const studentService = {
  query,
  //   getStudentById,
  //   updateStudent,
  //   removeStudent,
};

const STORAGE_KEY = 'studentDB';

async function query() {
  return (await storageService.query(STORAGE_KEY)) || _setStudents();
}

async function _setStudents() {
  const {data} = await axios.get('https://randomuser.me/api/?results=20');
  const students = data.results.map(student => {
    const miniStudents = {
      id: utilService.makeId(),
      fullName: `${student.name.first} ${student.name.last}`,
      email: student.email,
      gender: student.gender,
      city: student.location.city,
      isSelected: false,
      age: utilService.getRandomInt(20, 31),
      university: utilService.getRandomUniversity(),
      imgUrl: student.picture.medium,
    };
    return miniStudents;
  });
  storageService.saveToStorage(STORAGE_KEY, students);
  return students;
}
