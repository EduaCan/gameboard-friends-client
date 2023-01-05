//custom hook to show date/time element was created or updated in a nice format
export const useUtilsHook = () => {
  //tranforms timestamp format time to dd-mm-yyyy hh:mm:ss
  const dateFormat = (time) => {
    let date = new Date(time);
    let str = "";
    let min = "";
    let sec = "";
    if (date.getMinutes() < 10) {
      min += "0" + date.getMinutes();
    } else {
      min += date.getMinutes();
    }
    if (date.getSeconds() < 10) {
      sec += "0" + date.getSeconds();
    } else {
      sec += date.getSeconds();
    }
    str =
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      min +
      ":" +
      sec;
    return str;
  };
  //adds "created on" or "updated on" before timestamp
  const createdEdited = (comment) => {
    if (comment.createdAt >= comment.updatedAt) {
      let strDate = dateFormat(comment.createdAt);
      return "created on " + strDate;
    } else {
      let strDate = dateFormat(comment.updatedAt);
      return "edited on " + strDate;
    }
  };

  return {
    dateFormat,
    createdEdited,
  };
};
