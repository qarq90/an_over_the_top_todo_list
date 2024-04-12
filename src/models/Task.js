import mongoose from 'mongoose'

const {Schema} = mongoose

const reviewSchema = new Schema({
    user: String,
    title: String,
    task: String,
    date: Date,
    status: String,
    archived: Boolean,
    deleted: Boolean,
})

let Task;

try {
    Task = mongoose.model('Task')
} catch (e) {
    Task = mongoose.model('Task', reviewSchema)
}

export default Task