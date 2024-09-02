import KanbanItem from '@/app/components/cards/KanbanItem';
import React from 'react';

const TodoColumn = ({ items }: { items: any }) => {
  return (
    <div className='card bg-base-100 space-y-5'>
      {items.map((items: { text: string; id: number; }) => (
        <KanbanItem itemText={items.text} key={items.id} itemId={items.id}>{items.text}</KanbanItem>
      ))}
    </div>
  )
}

export default TodoColumn
