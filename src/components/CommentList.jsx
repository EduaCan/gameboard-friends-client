import { useState, useEffect } from "react";
import { commentListGameService, commentListEventService } from "../services/comment.service";
import { useNavigate } from "react-router-dom"


function CommentList({ elementId }) {
  const navigate = useNavigate()

  const  [comments, setComments]  = useState(null);
  const  [isFetching, setIsFetching]  = useState(true);


  useEffect(() => {
    getData(elementId);

  }, []);

  const getData = async (elementId) => {
      try {
        let commentList
          if (elementId.length > 12){ //mayor de 10 es un evento
             commentList = await commentListEventService(elementId);
          }else { //sino, es un juego
             commentList = await commentListGameService(elementId);
          }
          setComments(commentList.data);
          setIsFetching(false);
        
    } catch (error) {
        // if (error.response && error.response.status === 400) {
        //     // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        //     setErrorMessage(error.response.data.errorMessage)
        //   } else {
        //     // si el error es otro (500) entonces si redirecciono a /error
        //     navigate("/error")
        //   }
        console.log(error)
    }
  };

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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CommentList;
