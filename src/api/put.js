import axios from "axios";

const put = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export default put;
