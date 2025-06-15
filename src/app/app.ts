import express, { Application, Request, Response } from "express"
import { model, Schema } from "mongoose"

const app: Application = express()
app.use(express.json())

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal"
  },
  pinned: { type: Boolean, default: false },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" }
  }


})

const Note = model("Note", noteSchema);


app.post('/notes/create-note', async (req: Request, res: Response) => {

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
app.get('/notes/get-note', async (req: Request, res: Response) => {

  const note = await Note.find()

  res.status(201).json({
    success: true,
    message: "Note Created successfully",
    note: note
  })
})
// find  Note by id fetch
app.get('/note/get-note/:noteId', async (req: Request, res: Response) => {
  const id = req.params.noteId
  const note = await Note.findById(id)

  res.status(201).json({
    success: true,
    message: "Note Created successfully",
    note: note
  })
})

// find  Note by id fetch
app.patch('/note/update-note/:noteId', async (req: Request, res: Response) => {
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
app.delete('/note/delete-note/:noteId', async (req: Request, res: Response) => {
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

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To ToDos Apps')
})


export default app;