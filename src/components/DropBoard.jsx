import {Draggable} from "react-beautiful-dnd-next";
import DragItem from "@/components/DragItem";

function DropBoard({column, provided, snapshot}) {
  return (
    <ul
      {...provided.droppableProps}
      ref={provided.innerRef}
      className={`p-1 w-[250px] min-h-[500px] ${snapshot.isDraggingOver ? 'bg-cyan-300' : 'bg-cyan-400'}`}
    >
      {column.items.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
          >
            {(provided, snapshot) => {
              return (
                <DragItem provided={provided} snapshot={snapshot} item={item}/>
              );
            }}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </ul>
  )
}

export default DropBoard