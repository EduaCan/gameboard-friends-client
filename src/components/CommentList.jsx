import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  commentListGameService,
  commentListEventService,
  commentDeleteService,
} from "../services/comment.service";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import AddComment from "./AddComment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//Muestra la lista de comments, sea del juego o del evento
function CommentList({ elementId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [comments, setComments] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModifyingComment, setIsModifyingComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [content, setContent] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData(elementId);
  }, []);

  const handleModifyComment = (elemId, content) => {
    setCommentId(elemId);
    setIsModifyingComment(true);
    handleShow();
    setContent(content);
  };

  //para eliminar un comment
  const handleDeleteComment = async (commentid) => {
    await commentDeleteService(commentid);
    getData(elementId);
  };

  const getData = async (elementId) => {
    try {
      let commentList;
      //este if nos permite reusar el componente para juegos y eventos
      if (elementId.length > 12) {
        //mayor de 12 es un evento
        commentList = await commentListEventService(elementId);
      } else {
        //sino, es un juego
        commentList = await commentListGameService(elementId);
      }
      setComments(commentList.data);
      setIsFetching(false);
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

  if (isFetching === true) {
    return (
      <div>
        <ClipLoader
          color={"grey"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      {comments.length === 0 ? (
        <h3>No comments</h3>
      ) : (
        <div>
          {comments.map((eachComment) => {
            return (
              <div key={eachComment._id}>
                <h6>{eachComment.idUser.username}</h6>
                <p>{eachComment.content}</p>
                {(eachComment.idUser.username === user.user.username ||
                  user.user.role === "admin") && (
                  <div>
                    <button
                      onClick={() =>
                        handleModifyComment(
                          eachComment._id,
                          eachComment.content
                        )
                      }
                    >
                      Modify Comment
                    </button>
                    <button
                      onClick={() => handleDeleteComment(eachComment._id)}
                    >
                      Delete Comment
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <Button variant="primary" onClick={handleShow}>
        Share a comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <AddComment
          elementId={elementId}
          getData={getData}
          oldContent={content}
          commentId={commentId}
          isModifyingComment={isModifyingComment}
          setIsModifyingComment={setIsModifyingComment}
          handleClose={handleClose}
        />
      </Modal>
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </div>
  );
}

export default CommentList;
