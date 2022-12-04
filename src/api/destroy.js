import axios from "axios";

const destroy = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export default destroy;
