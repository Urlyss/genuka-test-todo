'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Reorder, useDragControls } from "framer-motion"

interface Task {
  id: string
  title: string
  project: string
  startTime: string
  endTime: string
  completed: boolean
  status: 'open' | 'closed' | 'archived'
  members: Array<{ image: string; name: string }>
}

interface TaskCardProps {
  task: Task
  onToggle: () => void
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const controls = useDragControls()

  return (
    <Reorder.Item value={task} id={task.id} dragControls={controls}>
      <Card className="relative mb-4 cursor-grab active:cursor-grabbing select-none">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              <p className="text-muted-foreground">{task.project}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
              className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                task.completed ? 'bg-blue-600' : 'border-2 border-muted'
              }`}
            >
              {task.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-muted-foreground">Today {task.startTime} - {task.endTime}</p>
            <div className="flex -space-x-2">
              {task.members.map((member, i) => (
                <Avatar key={i} className="border-2 border-background h-8 w-8">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Reorder.Item>
  )
}

