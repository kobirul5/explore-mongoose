import express, { Request, Response } from "express"
import { Note } from "../models/notes.model";

export const notesRoutes =  express.Router()

notesRoutes.post('/create-note', async (req: Request, res: Response) => {

  const body = req.body;

  // Approach 1
  // const myNote = new Note({
  //   title: "Learning Mongoose",
  // })
  // await myNote.save()

  // Approach 2

  const note = await Note.create(body)

  res.status(201).json({
    success: true,
    message: "Note Created successfully",
    note: note
  })



})

// All Nots fetch
notesRoutes.get('/', async (req: Request, res: Response) => {

  const note = await Note.find()

  res.status(201).json({
    success: true,
    message: "Note Created successfully",
    note: note
  })
})
// find  Note by id fetch
notesRoutes.get('/get-note/:noteId', async (req: Request, res: Response) => {
  const id = req.params.noteId
  const note = await Note.findById(id)

  res.status(201).json({
    success: true,
    message: "Note Created successfully",
    note: note
  })
})

// find  Note by id fetch
notesRoutes.patch('/update-note/:noteId', async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.noteId

  const note = await Note.findByIdAndUpdate(id, body, {new: true}) //best way
  // const note = await Note.findOneAndUpdate({_id: id}, body, {new: true})
  // const note = await Note.updateOne({_id: id}, body, {new: true})
 
  res.status(201).json({
    success: true,
    message: "Note Created successfully",
    note: note
  })
})

notesRoutes.delete('/delete-note/:noteId', async (req: Request, res: Response) => {
  const id = req.params.noteId

  const note = await Note.findByIdAndDelete(id) //best way
  // const note = await Note.findOneAndDelete({_id: id})
  // const note = await Note.deleteOne({_id: id})
 
  res.status(201).json({
    success: true,
    message: "Note Created successfully",
    note: note
  })
})