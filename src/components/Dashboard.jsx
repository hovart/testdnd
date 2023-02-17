"use client"

import {DragDropContext, Droppable} from "react-beautiful-dnd-next";
import uuid from "uuid/v4";
import {useState} from "react";
import DropBoard from "@/components/DropBoard";


const columnsFromBackend = {
  [uuid()]: {
    name: "board 1",
    items: [
      {id: uuid(), content: "item 1"},
      {id: uuid(), content: "item 2"},
      {id: uuid(), content: "item 3"},
      {id: uuid(), content: "item 4"},
      {id: uuid(), content: "item 5"}
    ]
  },
  [uuid()]: {
    name: "board 2",
    items: []
  },
  [uuid()]: {
    name: "board 3",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const {source, destination} = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function Dashboard() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="flex justify-center h-full">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className={`flex flex-col items-center ${index ? '' : 'mr-auto'}`}
                 key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{margin: 8}}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <DropBoard provided={provided} snapshot={snapshot} column={column} />
                    )
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
);
}

export default Dashboard;