import { useState, useEffect } from "react";
import {
  commentListGameService,
  commentListEventService,
  commentModifyService,
  commentDeleteService
} from "../services/comment.service";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import AddComment from "./AddComment";

//Muestra la lista de comments, sea del juego o del evento
function CommentList({ elementId }) {
  const navigate = useNavigate();

  const [comments, setComments] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")


  const { user } = useContext(AuthContext);

  useEffect(() => {
    getData(elementId);
  }, []);


  

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
          setErrorMessage(error.response.data.errorMessage)
        } else {
          // si el error es otro (500) entonces si redirecciono a /error
          navigate("/error")
        }
    }
  };

  //para eliminar un comment
  const handleDeleteComment = async (commentid) => {
    await commentDeleteService(commentid)
  };

  //  //!hay que hacer algo con esto
  // //funcion para modificar comments, que se invoca desde los childs
  // const handleModifyComment = async (commentid, updateContent) => {
  //   await commentModifyService(commentid, updateContent)
  // };

  if (isFetching === true) {
    return <h3>...LoAdiNg</h3>;
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
                {(eachComment.idUser.username === user.user.username || user.user.role === "admin") && (
                  <div>
                    
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
      <AddComment elementId={elementId} getData={getData} />
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </div>
  );
}

export default CommentList;
