function DragItem({provided, snapshot, item}) {
  return (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`select-none p-2 mb-2 min-h-32 text-white ${snapshot.isDragging ? 'bg-cyan-600' : 'bg-cyan-700'}`}
    >
      {item.content}
    </li>
  )
}

export default DragItem