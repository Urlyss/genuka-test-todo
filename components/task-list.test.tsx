import React from 'react'
import { render, screen } from '@testing-library/react'
import { TaskList } from './task-list'
import { Task } from '@/app/types'

const mockTasks:Task[] = [
  {
    id: '1',
    title: 'Test Task 1',
    project: 'Test Project',
    startTime: '09:00',
    endTime: '10:00',
    completed: false,
    status: 'open',
    members: [{ image: 'test.jpg', name: 'Test User' }],
  },
  {
    id: '2',
    title: 'Test Task 2',
    project: 'Test Project',
    startTime: '10:00',
    endTime: '11:00',
    completed: true,
    status: 'closed',
    members: [{ image: 'test.jpg', name: 'Test User' }],
  },
]

describe('TaskList', () => {
  it('renders all tasks', () => {
    render(<TaskList tasks={mockTasks} onToggle={() => {}} onReorder={()=>{}}/>)
    
    expect(screen.getByText('Test Task 1')).toBeInTheDocument()
    expect(screen.getByText('Test Task 2')).toBeInTheDocument()
  })
})

