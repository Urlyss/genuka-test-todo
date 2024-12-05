'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { TaskList } from '@/components/task-list'
import { NewTaskForm } from '@/components/new-task-form'
import { format } from 'date-fns'
import { defaultTasks, Task, TaskStatus } from './types'
import { cn } from '@/lib/utils'

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeFilter, setActiveFilter] = useState<TaskStatus | 'all'>('all')
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks && storedTasks?.length > 5) {
      setTasks(JSON.parse(storedTasks))
    } else {
      setTasks(defaultTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, status: task.completed ? 'open' : 'closed' } : task
    ))
  }

  const filteredTasks = tasks.filter(task => 
    activeFilter === 'all' ? true : task.status === activeFilter
  )

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status]++
    acc.all++
    return acc
  }, { all: 0, open: 0, closed: 0, archived: 0 })

  const addNewTask = (newTask: Omit<Task, 'id' | 'completed' | 'status'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
      status: 'open',
    }
    setTasks([task, ...tasks]) // Add new task at the beginning of the list
    setIsNewTaskFormOpen(false)
  }

  const handleReorder = (reorderedTasks: Task[]) => {
    const updatedTasks = tasks.map(task => {
      const reorderedTask = reorderedTasks.find(t => t.id === task.id)
      return reorderedTask || task
    })
    const newTaskOrder = updatedTasks.sort((a, b) => 
      reorderedTasks.findIndex(t => t.id === a.id) - reorderedTasks.findIndex(t => t.id === b.id)
    )
    setTasks(newTaskOrder)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-background">
          <TabsTrigger value="messages" className="text-muted-foreground">Messages</TabsTrigger>
          <TabsTrigger value="today" className="font-semibold">Today's Task</TabsTrigger>
          <TabsTrigger value="activity" className="text-muted-foreground">Last Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6 bg-[#f9f9f9] p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Today's Task</h1>
              <p className="text-muted-foreground">{format(new Date(), 'EEEE, d MMMM')}</p>
            </div>
            <Button className="bg-blue-100 hover:bg-blue-200 text-blue-600" onClick={() => setIsNewTaskFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 border-b pb-4">
            <Button 
              variant="ghost" 
              className={activeFilter === 'all' ? "text-blue-700" : "text-muted-foreground border-muted"}
              onClick={() => setActiveFilter('all')}
            >
              All
              <span className={cn("ml-2 px-2 py-0.5 rounded-full text-sm",activeFilter === 'all' ? "text-blue-100 bg-blue-700" : "text-muted-foreground bg-muted")}>{statusCounts.all}</span>
            </Button>
            <Button 
              variant="ghost" 
              className={activeFilter === 'open' ? "text-blue-700" : "text-muted-foreground"}
              onClick={() => setActiveFilter('open')}
            >
              Open
              <span className={cn("ml-2 px-2 py-0.5 rounded-full text-sm",activeFilter === 'open' ? "text-blue-100 bg-blue-700" : "text-muted-foreground bg-muted")}>{statusCounts.open}</span>
            </Button>
            <Button 
              variant="ghost" 
              className={activeFilter === 'closed' ? "text-blue-700" : "text-muted-foreground"}
              onClick={() => setActiveFilter('closed')}
            >
              Closed
              <span className={cn("ml-2 bg-muted  px-2 py-0.5 rounded-full text-sm",activeFilter === 'closed' ? "text-blue-100 bg-blue-700" : "text-muted-foreground bg-muted")}>{statusCounts.closed}</span>
            </Button>
            <Button 
              variant="ghost" 
              className={activeFilter === 'archived' ? "text-blue-700" : "text-muted-foreground"}
              onClick={() => setActiveFilter('archived')}
            >
              Archived
              <span className={cn("ml-2 bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-sm",activeFilter === 'archived' ? "text-blue-100 bg-blue-700" : "text-muted-foreground bg-muted")}>{statusCounts.archived}</span>
            </Button>
          </div>

          <TaskList tasks={filteredTasks} onToggle={toggleTaskStatus} onReorder={handleReorder}/>
        </TabsContent>
      </Tabs>

      <NewTaskForm
        isOpen={isNewTaskFormOpen}
        onClose={() => setIsNewTaskFormOpen(false)}
        onSubmit={addNewTask}
      />
    </div>
  )
}

