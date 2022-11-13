import { useState } from "react";
import { commentAddService } from "../services/comment.service";

function AddComment({gameid}) {
    const [content, setContent]  = useState("")

    const handleContentChange = (event) => setContent(event.target.value);
    
    const handleComfirmContent = async (event) => {
        event.preventDefault()

        const newComment = {
            content: content
        }

        try {
            await commentAddService(gameid, newComment)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handleComfirmContent}>
            <label >Type your comment</label>
            <textarea name="content"  cols="30" rows="10" value={content} onChange={handleContentChange}></textarea>
            <button type="submit">Send Your Comment</button>
        </form>
    </div>
  )
}

export default AddComment