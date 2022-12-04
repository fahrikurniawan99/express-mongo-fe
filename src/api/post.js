import axios from "axios";

const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export default post;
