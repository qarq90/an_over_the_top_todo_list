import mongoose from 'mongoose'

export default async function connect() {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        await mongoose.connect("mongodb+srv://admin:FV08jMOzSNBz1eVf@cluster0.vrpea8c.mongodb.net/over_the_top_todo_list?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        console.log("Failed to connect to MongoDB");
        throw error;
    }
    console.log("MongoDB connection process completed");
}