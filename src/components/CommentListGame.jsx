import { useState, useEffect } from "react";
import {
  commentListGameService,
  commentDeleteService,
} from "../services/comment.service";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import AddComment from "./AddComment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DarkThemeContext } from "../context/darkTheme.context";
import { useFormHook } from "../hooks/useFormHook";
import { useUtilsHook } from "../hooks/useUtilsHook";

//https://mdbootstrap.com/docs/standard/extended/comments/

//Muestra la lista de comments, sea del juego o del evento
function CommentListGame({ elementId }) {
  const { user } = useContext(AuthContext);
  const { createdEdited } = useUtilsHook()

  const {
    changeThemeButton,
    changeThemeButtonBlue,
    changeThemeButtonRed,
    changeTheme,
  } = useContext(DarkThemeContext);


  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook();

  const [comments, setComments] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
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
      navigateError(error)
    }
  };

  if (isFetching) {
    return (
      fetchingLoader()
    );
  }

  return (
    <section style={changeTheme()}>
      <div className="container my-2 py-1">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="card text-dark" style={changeTheme()}>
              {showErrorMessage && <p>{showErrorMessage()}</p>}
              <Button variant={changeThemeButton()} onClick={handleShow}>
                Share a comment
              </Button>

              <Modal show={show} onHide={handleClose} style={changeTheme()}>
                <Modal.Header style={changeTheme()} closeButton>
                  {" "}
                  Share your opinion{" "}
                </Modal.Header>
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
                  {comments
                    .slice(0)
                    .reverse()
                    .map((eachComment) => {
                      return (
                        <div
                          key={eachComment._id}
                          className="card-body p-3"
                          style={changeTheme()}
                        >
                          <div className="d-flex flex-start">
                            <img
                              className="rounded-circle shadow-1-strong me-3"
                              src={`https://i.pravatar.cc/150?u=${eachComment.idUser._id}`}
                              alt="avatar"
                              width="60"
                              height="60"
                            />
                            <div className="container my-0 py-0">
                              <h6 className="fw-bold mb-1 game-comment-name-title">
                                {eachComment.idUser.username}
                              </h6>
                              {(eachComment.idUser.username ===
                                user.user.username ||
                                user.user.role === "admin") && (
                                <span className="game-comment-button-span">
                                  <Button
                                    variant={changeThemeButtonBlue()}
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
                                    variant={changeThemeButtonRed()}
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteComment(eachComment._id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </span>
                              )}
                              <div className="d-flex align-items-center mb-3">
                                <p className="text-muted small mb-0">
                                  {createdEdited(eachComment)}
                                </p>
                              </div>
                              <p className="mb-0">{eachComment.content}</p>
                            </div>
                          </div>
                          <hr className="my-0" />
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

export default CommentListGame;
