import { MongoClient } from "mongodb";

// preventing db to our sercver
const db = new MongoClient("mongodb://localhost:27017/").db("test_db")

// preventing collections

// users
const user = db.collection("users")

export{user , db}