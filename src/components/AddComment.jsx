import { useEffect, useState } from "react";
import {
  commentAddGameService,
  commentAddEventService,
} from "../services/comment.service";
import { useNavigate } from "react-router-dom";
import { commentModifyService } from "../services/comment.service";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { DarkThemeContext } from "../context/darkTheme.context";
import {useFormHook} from "../hooks/useFormHook.js"

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
  } = useContext(DarkThemeContext);

  const {showErrorMessage, changeErrorMessage} = useFormHook()

  const [contentUpdate, setContentUpdate] = useState(oldContent);

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleContentChange = (event) => {
    setContent(event.target.value);
    setContentUpdate(event.target.value);
  };

  useEffect(() => {
    setContentUpdate(oldContent);
  }, [oldContent]);

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
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
      }
    }
 

  const handleComfirmContent = async (event) => {
    event.preventDefault();

    const newComment = {
      content: content,
    };

    try {
     (elementId.length > 12) ?
        await commentAddEventService(elementId, newComment):
        await commentAddGameService(elementId, newComment)
      setContent("");
      getData(elementId);
      handleClose();
    } catch (error) {
      (error.response && error.response.status === 400) ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error")
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

      {showErrorMessage && <p>{showErrorMessage}</p>}
    </div>
  );
}

export default AddComment;
