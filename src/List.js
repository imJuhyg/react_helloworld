import React from 'react';

export default function List(
    {
        id, title, completed, todoData, setTodoData, provided, snapshot
    }) {
    const handleClick = (id) => {
        // 삭제버튼 누른 요소를 제외한 나머지 제외
        let newTodoData = todoData.filter(data => data.id !== id)

        // this.setState({todoData : newTodoData}); // 데이터 변경
        setTodoData(newTodoData);
    };

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !completed;
            }
            return data;
        })
        // this.setState({ todoData : newTodoData });
        setTodoData(newTodoData);
    }

    return (
        <div
            key={id}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "bg-blue-400" : "bg-gray-100"} flex item-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>

            <div className='items-center py-2'>
                <input
                    type="checkbox"
                    defaultChecked={false}
                    onChange={() => handleCompleteChange(id)}
                />{" "}
                <span
                    className={completed ? "line-through" : undefined}>
                    {title}
                </span>
            </div>
            <div className='items-center py-2'>
                <button
                    className=''
                    onClick={() => handleClick(id)}>x
                </button>
            </div>

        </div>
    )
}