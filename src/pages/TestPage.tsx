import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}
// import { createStudents } from '../services/student/api'
import { createStudent } from '@/services/ant-design-pro/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TestPage: React.FC<IProps> = (props: IProps) => {
  const onClick = () => {
    console.log('da');
  };
  const createStudentsSubmit = () => {
    console.log('createStudentsSubmit');
    let obj: any = {
      name: '11111',
      age: 111,
      gender: '11111',
      grade: '11111',
    };
    let res = createStudent(obj);
    console.log('1111111res', res);
  };
  const onChange = () => {};

  return (
    <div>
      <input onClick={onClick} onChange={onChange} />
      <button onClick={createStudentsSubmit}>点击</button>
    </div>
  );
};

export default TestPage;
