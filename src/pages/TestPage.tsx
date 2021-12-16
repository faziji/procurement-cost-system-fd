import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TestPage: React.FC<IProps> = (props: IProps) => {
  const onClick = () => {
    console.log('da');
  };
  const onChange = () => {};

  return (
    <div>
      <input onClick={onClick} onChange={onChange} />
    </div>
  );
};

export default TestPage;
