'use client'

import { Reorder } from "framer-motion"
import { TaskCard } from './task-card'
import { Task } from '@/app/types'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onReorder: (tasks: Task[]) => void
}

export function TaskList({ tasks, onToggle, onReorder }: TaskListProps) {
  return (
    <Reorder.Group axis="y" values={tasks} onReorder={onReorder}>
      {tasks.map((task) => (
        <TaskCard 
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
        />
      ))}
    </Reorder.Group>
  )
}
