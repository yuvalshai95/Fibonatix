import axios from 'axios';
import {storageService} from './async-storage.service.js';
import {utilService} from './util.service.js';

export const studentService = {
  query,
  getStudentById,
  update,
  remove,
  setStudents,
};

const STORAGE_KEY = 'studentDB';

async function query() {
  return (await storageService.query(STORAGE_KEY)) || _loadStudents();
}

async function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function update(student) {
  return storageService.put(STORAGE_KEY, student);
}

function setStudents(students) {
  storageService.saveToStorage(STORAGE_KEY, students);
}

async function getStudentById(id) {
  return await storageService.get(STORAGE_KEY, id);
}

async function _loadStudents() {
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
