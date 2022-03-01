import React from 'react';
import { Routes, Route } from 'react-router-dom';


// Cmps
import { HomePage } from './pages/HomePage'
import { StudentEdit } from './pages/StudentEdit'
import { AppHeader } from './cmps/AppHeader';
import { UserMsg } from './cmps/UserMsg';

function RootCmp() {

  return (
    <div className='root-cmp'>
      <AppHeader />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} >
            <Route path='edit/:studentId' element={<StudentEdit />} />
          </Route>
        </Routes>
      </main>
      <UserMsg />
    </div>
  );
}

export default RootCmp;
