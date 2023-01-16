import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function List({ todoData, setTodoData }) {
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

    const handleStart = (result) => {
        console.log('start result: ', result);
    }

    const handleEnd = (result) => {
        // 매개변수 result에는 source항목 및 destination과 같은 드래그 이벤트에 대한 정보가 포함된다.
        console.log('end result: ', result);

        // destination이 없으면 함수를 종료한다.
        if(!result.destination) return;

        // Array.splice(): 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경하는 메소드
        // splice(index, 0, value) : index에 value추가
        // splice(index, count): index에 count수 만큼 삭제.
        const newTodoData = todoData;

        // 1. 변경시키는 아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 잡아준다.
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);
        console.log(`지우기: ${reorderedItem}`);

        // 원하는 자리에 reorderedItem을 넣는다.
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData); // 상태 업데이트
        

    }

    return (
        <div>
            <DragDropContext onDragStart={ handleStart} onDragEnd={ handleEnd }>
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoData.map((data, index) => (
                                <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            key={data.id}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            className={`${snapshot.isDragging ? "bg-blue-400" : "bg-gray-100"} flex item-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>

                                            <div className='items-center py-2'>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={false}
                                                    onChange={() => handleCompleteChange(data.id)}
                                                />{" "}
                                                <span
                                                    className={data.completed ? "line-through" : undefined}>
                                                    {data.title}
                                                </span>
                                            </div>
                                            <div className='items-center py-2'>
                                                <button
                                                    className=''
                                                    onClick={() => handleClick(data.id)}>x
                                                </button>
                                            </div>

                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}