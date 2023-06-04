import express from "express"
import { getallbogs,addblogs, updateblog, blogbyid, deleteblog,getuserid} from "../controllers/blogcntroller.js"
const blogrouter=express.Router()
blogrouter.get("/" ,getallbogs)
blogrouter.post("/add",addblogs)
blogrouter.put("/update/:id",updateblog)
blogrouter.get("/:id",blogbyid)
blogrouter.delete("/:id",deleteblog)
blogrouter.get("/user/:id",getuserid)
export default blogrouter


