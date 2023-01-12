import React from 'react';

export default function List({ todoData, setTodoData }) {
    const getStyle = (isCompleted) => { // 스타일 함수(동적으로 사용 가능)
        return {
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: isCompleted ? 'line-through' : 'none'
        }
    }

    const btnStyle = { // 스타일(정적으로 지정하여 사용 가능)
        color: "#fff",
        border: "none",
        padding: "5px 9px",
        borderRadius: "50%",
        cursor: "pointer",
        float: "right"
    }

    const handleClick = (id) => {
        // 삭제버튼 누른 요소를 제외한 나머지 제외
        let newTodoData = todoData.filter(data => data.id !== id)

        // this.setState({todoData : newTodoData}); // 데이터 변경
        setTodoData(newTodoData);
    };

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        })
        // this.setState({ todoData : newTodoData });
        setTodoData(newTodoData);
    }

    return (
        <div>
            {todoData.map((data) => (
                <div style={getStyle(data.completed)} key={data.id}>
                    <input type="checkbox" defaultChecked={false} onChange={() => handleCompleteChange(data.id)} />
                    {data.title}
                    <button style={btnStyle} onClick={() => handleClick(data.id)}>x</button>
                </div>
            ))}
        </div>
    )
}