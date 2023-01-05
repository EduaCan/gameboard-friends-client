import { useState, useEffect, useContext } from "react";
import {
  commentListEventService,
  commentDeleteService,
  commentAddEventService,
} from "../services/comment.service";
import { AuthContext } from "../context/auth.context";
import { DarkThemeContext } from "../context/darkTheme.context";
import { useFormHook } from "../hooks/useFormHook";
import { useUtilsHook } from "../hooks/useUtilsHook";
import AddComment from "./AddComment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//list of comments of an event
function CommentListEvent({ elementId, players }) {
  //contexts
  const { user } = useContext(AuthContext);
  const {
    changeTheme,
    changeThemeListScroll,
    changeThemeButton,
    changeThemeButtonRed,
    changeThemeButtonBlue,
  } = useContext(DarkThemeContext);
  //hooks
  const { createdEdited } = useUtilsHook();
  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook();
  //states
  const [comments, setComments] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isModifyingComment, setIsModifyingComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [contentCom, setContentCom] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  //modify comment modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData(elementId);
  }, []);

  //comment form change handlers
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleModifyComment = (elemId, content) => {
    setCommentId(elemId);
    setIsModifyingComment(true);
    handleShow();
    setContentCom(content);
  };
  //save content
  const handleComfirmContent = async (event) => {
    event.preventDefault();
    const newComment = {
      content: content,
    };
    try {
      await commentAddEventService(elementId, newComment);
      setContent("");
      getData(elementId);
    } catch (error) {
      navigateError(error);
    }
  };
  //delete comment
  const handleDeleteComment = async (commentid) => {
    await commentDeleteService(commentid);
    getData(elementId);
  };
  //get comment list of an event
  const getData = async (elementId) => {
    try {
      let commentList = await commentListEventService(elementId);
      setComments(commentList.data);
      setIsFetching(false);
    } catch (error) {
      navigateError(error);
    }
  };

  if (isFetching) {
    return fetchingLoader();
  }

  return (
    <div>
      <section style={changeTheme()}>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
              <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                Members
              </h5>
              <div className="card">
                <div className="card-body" style={changeTheme()}>
                  <ul className="list-unstyled mb-0">
                    {players.map((eachMember, index) => {
                      return (
                        <li
                          key={eachMember._id}
                          className={
                            players.length === index + 1
                              ? "p-2"
                              : "p-2 border-bottom"
                          }
                          style={changeTheme()}
                        >
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row">
                              <img
                                src={`https://i.pravatar.cc/150?u=${eachMember._id}`}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width="60"
                              />
                              <div className="pt-1">
                                <p className="fw-bold mb-0">
                                  {eachMember.username}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-7 col-xl-8">
              <ul id="list-scroll" style={changeThemeListScroll()}>
                {comments.length === 0 ? (
                  <h3>No comments yet, be the first to comment</h3>
                ) : (
                  comments
                    .slice(0)
                    .reverse()
                    .map((eachComment) => {
                      return (
                        <div>
                          {eachComment.idUser.username !== user.user.username &&
                          user.user.role !== "admin" ? (
                            <li
                              key={eachComment._id}
                              className="d-flex justify-content-between mb-4"
                            >
                              <img
                                src={`https://i.pravatar.cc/150?u=${eachComment.idUser._id}`}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                width="60"
                              />
                              <div className="card card-100">
                                <div
                                  className="card-header d-flex justify-content-between p-3"
                                  style={changeTheme()}
                                >
                                  <p className="fw-bold mb-0">
                                    {eachComment.idUser.username}
                                  </p>
                                  <p className="text-muted small mb-0">
                                    <i className="far fa-clock"></i>
                                    {createdEdited(eachComment)}
                                  </p>
                                </div>
                                <div
                                  className="card-body"
                                  style={changeTheme()}
                                >
                                  <p className="mb-0 mb-0-left">
                                    {eachComment.content}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li
                              key={eachComment._id}
                              className="d-flex justify-content-between mb-4"
                            >
                              <div className="card w-100">
                                <div
                                  className="card-header d-flex justify-content-between p-3"
                                  style={changeTheme()}
                                >
                                  <p className="text-muted small mb-0">
                                    <i className="far fa-clock"></i>
                                    {createdEdited(eachComment)}
                                  </p>
                                  <div>
                                    <Button
                                      size="sm"
                                      variant={changeThemeButtonBlue()}
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
                                      size="sm"
                                      variant={changeThemeButtonRed()}
                                      onClick={() =>
                                        handleDeleteComment(eachComment._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                  <p className="fw-bold mb-0">
                                    {eachComment.idUser.username}
                                  </p>
                                </div>
                                <div
                                  className="card-body"
                                  style={changeTheme()}
                                >
                                  <p
                                    className="mb-0 mb-0-right"
                                    style={changeTheme()}
                                  >
                                    {eachComment.content}
                                  </p>
                                </div>
                              </div>
                              <img
                                src={`https://i.pravatar.cc/150?u=${eachComment.idUser._id}`}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                width="60"
                              />
                            </li>
                          )}
                        </div>
                      );
                    })
                )}
              </ul>
              <div className="bg-white mb-3">
                <div className="form-outline">
                  <form onSubmit={handleComfirmContent} style={changeTheme()}>
                    <textarea
                      className="form-control"
                      id="textAreaExample2"
                      name="content"
                      cols="30"
                      rows="4"
                      style={changeTheme()}
                      value={content}
                      onChange={handleContentChange}
                    ></textarea>

                    <Button variant={changeThemeButton()} type="submit">
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
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
      {showErrorMessage && <p>{showErrorMessage}</p>}
    </div>
  );
}

export default CommentListEvent;
