import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  commentListGameService,
  commentDeleteService,
} from "../services/comment.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import AddComment from "./AddComment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"; 
//https://mdbootstrap.com/docs/standard/extended/comments/

//Muestra la lista de comments, sea del juego o del evento
function CommentListGame({ elementId }) {
  const { user, cambiarTemaButton, cambiarTemaButtonBlue,cambiarTemaButtonRed, cambiarTema, createdEdited } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [comments, setComments] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModifyingComment, setIsModifyingComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [contentCom, setContentCom] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setIsModifyingComment(false);
  };

  useEffect(() => {
    getData(elementId);
  }, []);

  const handleModifyComment = (elemId, content) => {
    setCommentId(elemId);
    handleShow();
    setIsModifyingComment(true);
    setContentCom(content);
  };

  //para eliminar un comment
  const handleDeleteComment = async (commentid) => {
    await commentDeleteService(commentid);
    getData(elementId);
  };

  const getData = async (elementId) => {
    try {
      let commentList = await commentListGameService(elementId);
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
      <div style={cambiarTema()}>
        <ClipLoader
          color={"red"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section style={cambiarTema()}>
      <div class="container my-2 py-1">
        <div class="row d-flex justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="card text-dark" style={cambiarTema()}>
      {errorMessage !== "" && <p>{errorMessage}</p>}
            <Button variant={cambiarTemaButton()} onClick={handleShow}>
        Share a comment
      </Button>

      <Modal show={show} onHide={handleClose} style={cambiarTema()}>
        <Modal.Header style={cambiarTema()} closeButton> Share your opinion </Modal.Header>
        <AddComment
          elementId={elementId}
          getData={getData}
          oldContent={contentCom}
          commentId={commentId}
          isModifyingComment={isModifyingComment}
          setIsModifyingComment={setIsModifyingComment}
          handleClose={handleClose}
        />
      </Modal>
              {comments.length === 0 ? (
                <h3>No comments yet</h3>
              ) : (
                <div>
                  {comments.slice(0).reverse().map((eachComment) => {
                    return (
                      <div key={eachComment._id} class="card-body p-3" style={cambiarTema()}>
                        <div class="d-flex flex-start">
                          <img
                            class="rounded-circle shadow-1-strong me-3"
                            src={`https://i.pravatar.cc/150?u=${eachComment.idUser._id}`}
                            alt="avatar"
                            width="60"
                            height="60"
                          />
                          <div class="container my-0 py-0">
                            <h6 class="fw-bold mb-1 game-comment-name-title">
                              {eachComment.idUser.username}
                            </h6>
                                  {(eachComment.idUser.username ===
                                    user.user.username ||
                                    user.user.role === "admin") && (
                                    <span  class="game-comment-button-span">
                                      <Button
                                      variant={cambiarTemaButtonBlue()}
                                        size="sm"
                                        onClick={() =>
                                          handleModifyComment(
                                            eachComment._id,
                                            eachComment.content
                                          )
                                        }
                                      >
                                        Modify
                                      </Button>
                                
                                      <Button
                                      variant={cambiarTemaButtonRed()}
                                      size="sm"
                                        onClick={() =>
                                          handleDeleteComment(eachComment._id)
                                        }
                                      >
                                        Delete
                                      </Button>
                                    </span>
                                  )}
                            <div class="d-flex align-items-center mb-3">
                              <p class="text-muted small mb-0">
                                {createdEdited(eachComment)}
                              </p>
                            </div>
                            <p class="mb-0">{eachComment.content}</p>
                          </div>
                        </div>
                        <hr class="my-0" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* /*
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
      <Button variant={cambiarTemaButton()} onClick={handleShow}>
        Share a comment
      </Button>

      <Modal show={show} onHide={handleClose} style={cambiarTema()}>
        <Modal.Header style={cambiarTema()} closeButton> Share your opinion </Modal.Header>
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
}</div>
*/
}

export default CommentListGame;
