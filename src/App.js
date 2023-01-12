// import React, {Component} from "react"; // "react"라이브러리에서 React와 Component 클래스를 가져온다.
import React, { useState } from 'react';
import "./App.css";
import Form from './components/Form';
import List from './components/List';

export default function App() {
  // state = {
  //   todoData : [],
  //   value : ""
  // };
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

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
    setValue("");
  };

  // functional component는 render()가 필요없음
  // 함수를 정의할 때 const를 붙여주고 사용하는 부분에서 this. 을 더이상 붙일 필요 없음
  return (
    <div className="container">
      <div className="todoBlock">
        <div class="title">
          <h1 className="text-3xl font-bold">할 일 목록</h1> 
        </div>
        <h1 className="text-3xl font-bold underline">Hello World!</h1> 
        <List todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}