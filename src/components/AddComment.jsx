import { useState } from "react";
import {
  commentAddGameService,
  commentAddEventService,
} from "../services/comment.service";
import { useNavigate } from "react-router-dom";


//Formulario para añadir un comment
function AddComment({ elementId, getData }) {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("")


  const navigate = useNavigate();

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
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
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
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddComment;
