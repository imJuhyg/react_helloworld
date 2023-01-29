import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
    console.log("Lists.js");
    const handleStart = (result) => {
    }

    const handleEnd = (result) => {
        // 매개변수 result에는 source항목 및 destination과 같은 드래그 이벤트에 대한 정보가 포함된다.

        // destination이 없으면 함수를 종료한다.
        if(!result.destination) return;

        // Array.splice(): 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경하는 메소드
        // splice(index, 0, value) : index에 value추가
        // splice(index, count): index에 count수 만큼 삭제.
        const newTodoData = todoData;

        // 1. 변경시키는 아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 잡아준다.
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);

        // 원하는 자리에 reorderedItem을 넣는다.
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData); // 상태 업데이트
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
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
                                        <List
                                            handleClick={handleClick}
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
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
})
export default Lists;