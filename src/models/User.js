import mongoose from 'mongoose'

const {Schema} = mongoose

const reviewSchema = new Schema({
    email_id: String,
    password: String,
    phone_number: String,
    user_name: String,
})

let Users;

try {
    Users = mongoose.model('Users')
} catch (e) {
    Users = mongoose.model('Users', reviewSchema)
}

export default Users