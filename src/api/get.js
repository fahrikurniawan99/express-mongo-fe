import axios from "axios";

const get = (url) => {
  return new Promise((resolve, reject) => {
    axios(url)
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export default get;
