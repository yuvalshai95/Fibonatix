import axios from 'axios';
import {storageService} from './async-storage.service';
import {utilService} from './util.service';
import {Student} from '../models/student.model';

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

async function remove(id:string) {
  return storageService.remove(STORAGE_KEY, id);
}

function update(student:Student) {
  return storageService.put(STORAGE_KEY, student);
}

function setStudents(students:Array<Student>) {
  storageService.saveToStorage(STORAGE_KEY, students);
}

async function getStudentById(id:string) {
  return await storageService.get(STORAGE_KEY, id);
}

async function _loadStudents() {
  const {data} = await axios.get('https://randomuser.me/api/?results=20');
  const students = data.results.map((student:any) => {
    const miniStudents = {
      id: utilService.makeId(),
      fullName: `${student.name.first} ${student.name.last}`,
      email: student.email,
      gender: student.gender,
      country: student.location.country,
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
