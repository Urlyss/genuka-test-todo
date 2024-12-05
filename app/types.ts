export type TaskStatus = 'open' | 'closed' | 'archived'

export interface Task {
  id: string
  title: string
  project: string
  startTime: string
  endTime: string
  completed: boolean
  status: TaskStatus
  members: Array<{ image: string; name: string }>
}

export const defaultTasks: Task[] = [
  // Open tasks
  {
    id: '1',
    title: "Design new landing page",
    project: "Website Redesign",
    startTime: "09:00",
    endTime: "11:00",
    completed: false,
    status: 'open',
    members: [
      { image: "https://i.pravatar.cc/150?img=1", name: "Alice Johnson" },
      { image: "https://i.pravatar.cc/150?img=2", name: "Bob Smith" },
    ],
  },
  {
    id: '2',
    title: "Implement user authentication",
    project: "Mobile App",
    startTime: "11:30",
    endTime: "13:30",
    completed: false,
    status: 'open',
    members: [
      { image: "https://i.pravatar.cc/150?img=3", name: "Charlie Brown" },
      { image: "https://i.pravatar.cc/150?img=4", name: "Diana Prince" },
    ],
  },
  {
    id: '3',
    title: "Create API documentation",
    project: "Backend Services",
    startTime: "14:00",
    endTime: "16:00",
    completed: false,
    status: 'open',
    members: [
      { image: "https://i.pravatar.cc/150?img=5", name: "Ethan Hunt" },
      { image: "https://i.pravatar.cc/150?img=6", name: "Fiona Gallagher" },
    ],
  },
  {
    id: '4',
    title: "Prepare presentation for client meeting",
    project: "Client Pitch",
    startTime: "16:30",
    endTime: "18:00",
    completed: false,
    status: 'open',
    members: [
      { image: "https://i.pravatar.cc/150?img=7", name: "George Michael" },
      { image: "https://i.pravatar.cc/150?img=8", name: "Hermione Granger" },
    ],
  },
  {
    id: '5',
    title: "Review and update project timeline",
    project: "Project Management",
    startTime: "18:30",
    endTime: "19:30",
    completed: false,
    status: 'open',
    members: [
      { image: "https://i.pravatar.cc/150?img=9", name: "Ian Malcolm" },
      { image: "https://i.pravatar.cc/150?img=10", name: "Julia Child" },
    ],
  },
  // Closed tasks
  {
    id: '6',
    title: "Fix login page bug",
    project: "Bug Fixes",
    startTime: "09:00",
    endTime: "10:30",
    completed: true,
    status: 'closed',
    members: [
      { image: "https://i.pravatar.cc/150?img=11", name: "Katniss Everdeen" },
      { image: "https://i.pravatar.cc/150?img=12", name: "Leia Organa" },
    ],
  },
  {
    id: '7',
    title: "Update dependencies",
    project: "Maintenance",
    startTime: "10:45",
    endTime: "12:15",
    completed: true,
    status: 'closed',
    members: [
      { image: "https://i.pravatar.cc/150?img=13", name: "Marty McFly" },
      { image: "https://i.pravatar.cc/150?img=14", name: "Natasha Romanoff" },
    ],
  },
  {
    id: '8',
    title: "Implement dark mode",
    project: "UI Enhancements",
    startTime: "13:00",
    endTime: "15:00",
    completed: true,
    status: 'closed',
    members: [
      { image: "https://i.pravatar.cc/150?img=15", name: "Oscar Isaac" },
      { image: "https://i.pravatar.cc/150?img=16", name: "Peggy Carter" },
    ],
  },
  {
    id: '9',
    title: "Optimize database queries",
    project: "Performance Improvements",
    startTime: "15:30",
    endTime: "17:30",
    completed: true,
    status: 'closed',
    members: [
      { image: "https://i.pravatar.cc/150?img=17", name: "Quentin Beck" },
      { image: "https://i.pravatar.cc/150?img=18", name: "Rey Skywalker" },
    ],
  },
  {
    id: '10',
    title: "Write unit tests for new features",
    project: "Quality Assurance",
    startTime: "18:00",
    endTime: "19:30",
    completed: true,
    status: 'closed',
    members: [
      { image: "https://i.pravatar.cc/150?img=19", name: "Steve Rogers" },
      { image: "https://i.pravatar.cc/150?img=20", name: "Tony Stark" },
    ],
  },
  // Archived tasks
  {
    id: '11',
    title: "Old project kickoff meeting",
    project: "Archived Project",
    startTime: "09:00",
    endTime: "10:00",
    completed: true,
    status: 'archived',
    members: [
      { image: "https://i.pravatar.cc/150?img=21", name: "Ulysses Klaue" },
      { image: "https://i.pravatar.cc/150?img=22", name: "Vision" },
    ],
  },
  {
    id: '12',
    title: "Legacy code refactoring",
    project: "Code Maintenance",
    startTime: "10:30",
    endTime: "12:30",
    completed: true,
    status: 'archived',
    members: [
      { image: "https://i.pravatar.cc/150?img=23", name: "Wanda Maximoff" },
      { image: "https://i.pravatar.cc/150?img=24", name: "Xavier Charles" },
    ],
  },
  {
    id: '13',
    title: "Deprecated feature removal",
    project: "Codebase Cleanup",
    startTime: "13:30",
    endTime: "15:30",
    completed: true,
    status: 'archived',
    members: [
      { image: "https://i.pravatar.cc/150?img=25", name: "Yelena Belova" },
      { image: "https://i.pravatar.cc/150?img=26", name: "Zemo Helmut" },
    ],
  },
  {
    id: '14',
    title: "Old client feedback review",
    project: "Client Relations",
    startTime: "16:00",
    endTime: "17:00",
    completed: true,
    status: 'archived',
    members: [
      { image: "https://i.pravatar.cc/150?img=27", name: "Abigail Brand" },
      { image: "https://i.pravatar.cc/150?img=28", name: "Bucky Barnes" },
    ],
  },
  {
    id: '15',
    title: "Archive outdated documentation",
    project: "Documentation",
    startTime: "17:30",
    endTime: "18:30",
    completed: true,
    status: 'archived',
    members: [
      { image: "https://i.pravatar.cc/150?img=29", name: "Carol Danvers" },
      { image: "https://i.pravatar.cc/150?img=30", name: "Drax" },
    ],
  },
]