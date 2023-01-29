// import React, {Component} from "react"; // "react"라이브러리에서 React와 Component 클래스를 가져온다.
import React, { useState, useCallback } from 'react';
import "./App.css";
import Form from './components/Form';
import Lists from './components/Lists';

const initialTodoData = 
    localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : []

export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleClick = useCallback((id) => {
    // 삭제버튼 누른 요소를 제외한 나머지 제외
    let newTodoData = todoData.filter(data => data.id !== id)

    // this.setState({todoData : newTodoData}); // 데이터 변경
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }, [todoData]);

  const handleSubmit = (e) => {
    e.preventDefault(); // 원래 submit은 페이지가 리로드된다. 이 것을 막아준다.

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    // todoData에 새로운 할 일 추가하기
    setTodoData((prev) => [...prev, newTodo]); // setter에서 이전 state를 가져오기 위해서는 인수에 함수를 이용해서 가져올 수 있다.
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");
  };

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }

  // functional component는 render()가 필요없음
  // 함수를 정의할 때 const를 붙여주고 사용하는 부분에서 this. 을 더이상 붙일 필요 없음
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-blue-100'>
      <div className='w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg'>
        <div className='flex justify-between mb-3'>
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}