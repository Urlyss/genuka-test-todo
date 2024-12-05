'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  project: z.string().min(1, { message: "Project is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  members: z.array(z.object({
    name: z.string().min(1, { message: "Member name is required" }),
    image: z.string().url({ message: "Invalid image URL" }),
  })).min(1, { message: "At least one member is required" }),
})

type FormData = z.infer<typeof formSchema>

interface NewTaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void
}

export function NewTaskForm({ isOpen, onClose, onSubmit }: NewTaskFormProps) {
  const [members, setMembers] = useState([{ name: '', image: '' }])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      project: '',
      startTime: '',
      endTime: '',
      members: [{ name: '', image: '' }],
    },
  })

  const handleSubmit = (data: FormData) => {
    onSubmit(data)
    form.reset()
    setMembers([{ name: '', image: '' }])
  }

  const addMember = () => {
    setMembers([...members, { name: '', image: '' }])
  }

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const FormContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Input placeholder="Project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4 border rounded-md p-4">
          <h3 className="font-semibold">Members</h3>
          {members.map((member, index) => (
            <div key={index}>
              <FormField
                control={form.control}
                name={`members.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Member name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`members.${index}.image`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 0 && (
                <Button type="button" variant="outline" onClick={() => removeMember(index)} className="mt-2">
                  Remove Member
                </Button>
              )}
              {index < members.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addMember}>
            Add Member
          </Button>
        </div>
        <Button type="submit">Create Task</Button>
      </form>
    </Form>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          {FormContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Task</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          {FormContent}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

