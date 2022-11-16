import { useState } from "react";
import {
  commentAddGameService,
  commentAddEventService,
} from "../services/comment.service";

//Formulario para añadir un comment
function AddComment({ elementId, getData }) {
  const [content, setContent] = useState("");

  const handleContentChange = (event) => setContent(event.target.value);

  const handleComfirmContent = async (event) => {
    event.preventDefault();
    

    const newComment = {
      content: content,
    };

    try {
        //este if permite discriminar entre game y evento y asi reusar el componente
      if (elementId.length > 12) {
        //mayor de 10 es un evento
        await commentAddEventService(elementId, newComment);
      } else {
        //sino, es un juego
        await commentAddGameService(elementId, newComment);
      }
      getData(elementId)
      setContent("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleComfirmContent}>
        <label>Type your comment</label>
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <button type="submit">Send Your Comment</button>
      </form>
    </div>
  );
}

export default AddComment;
