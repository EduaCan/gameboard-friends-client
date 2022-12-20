import { useEffect, useState } from "react";
import {
  commentAddGameService,
  commentAddEventService,
} from "../services/comment.service";
import { useNavigate } from "react-router-dom";
import { commentModifyService } from "../services/comment.service";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Button from "react-bootstrap/Button";

//Formulario para añadir un comment
function AddComment({
  elementId,
  getData,
  setIsModifyingComment,
  isModifyingComment,
  commentId,
  oldContent,
  handleClose,
}) {
  const {
    cambiarTema,
    cambiarTemaButton
  } = useContext(AuthContext);

  const [contentUpdate, setContentUpdate] = useState(oldContent);

  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleContentChange = (event) => {
    setContent(event.target.value);
    setContentUpdate(event.target.value);
  };

  useEffect(() => {
    setContentUpdate(oldContent);
  }, [oldContent]);

  //funcion para modificar comments, que se invoca desde los childs
  const handleModifyComment = async (event) => {
    event.preventDefault();

    const updateComment = {
      content: content,
    };

    try {
      await commentModifyService(commentId, updateComment);
      setContent("");
      getData(elementId);
      setIsModifyingComment(false);
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
    }
  };

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
      setContent("");
      getData(elementId);
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
    }
  };

  return (
    <div style={cambiarTema()}>
      {isModifyingComment === true ? (
        <div className="form-outline mb-3" >
          <form onSubmit={handleModifyComment} >
            <textarea
              className="form-control"
              id="textAreaExample2"
              name="content"
              cols="30"
              rows="10"
              value={contentUpdate}
              style={cambiarTema()}
              onChange={handleContentChange}
            ></textarea>
            <Button variant={cambiarTemaButton()} type="submit">
              Modify Comment
            </Button>
          </form>
        </div>
      ) : (
        <div className="form-outline mb-3" >
        <form onSubmit={handleComfirmContent} >
          <textarea
          className="form-control"
              id="textAreaExample2"
            name="content"
            cols="30"
            rows="10"
            value={content}
            style={cambiarTema()}
            onChange={handleContentChange}
          ></textarea>
          <Button variant={cambiarTemaButton()} type="submit">
            Send
          </Button>
        </form>
        </div>
      )}

      {errorMessage !== "" && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddComment;
