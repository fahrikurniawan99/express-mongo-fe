import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import destroy from "../../api/destroy";
import get from "../../api/get";
import "./index.scss";

const truncationText = (text, from, to) => text.slice(from, to);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { result } = await get(`${process.env.REACT_APP_BASEURL}/products`);
      setProducts(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchProductByName = async (keyword) => {
    try {
      setIsLoading(true);
      if (keyword.length > 0) {
        const { result } = await get(
          `${process.env.REACT_APP_BASEURL}/products?search=${keyword}`
        );
        setProducts(result);
      } else {
        getAllProducts();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setIsLoading(true);
      await destroy(`${process.env.REACT_APP_BASEURL}/products/${id}`);
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    return () => {
      setProducts([]);
    };
  }, [getAllProducts]);

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          onChange={(event) => searchProductByName(event.target.value)}
          placeholder="Masukan kata kunci..."
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading === true ? (
            <tr>
              <td></td>
              <td></td>
              <td>Loading...</td>
              <td></td>
            </tr>
          ) : products.length > 0 ? (
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{`${truncationText(product._id, 0, 10)}...`}</td>
                  <td>{product.name}</td>
                  <td className="text-right">{`RP. ${product.price}`}</td>
                  <td className="text-center">
                    <Link
                      to={`/detail/${product._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/edit/${product._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td>Tidak ada product</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
