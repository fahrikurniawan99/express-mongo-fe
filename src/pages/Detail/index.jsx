import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import get from "../../api/get";
import "./index.scss";

const Detail = () => {
  const [product, setProduct] = useState({});
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.jp/150x100.png"
  );
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const getProductById = useCallback(async () => {
    try {
      const { result } = await get(
        `${process.env.REACT_APP_BASEURL}/products/${params.id}`
      );
      setProduct(result);
      result.image_url && setImagePreview(result.image_url);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getProductById();
    return () => setIsLoading(true);
  }, [getProductById]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
      <table className="table">
        <tbody>
          {isLoading ? (
            <tr>
              <td></td>
              <td></td>
              <td>Loading...</td>
              <td></td>
            </tr>
          ) : (
            <>
              <tr>
                <td>ID</td>
                <td>{`: ${product._id}`}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{`: ${product.name}`}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{`: Rp. ${product.price}`}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>{`: ${product.stock}`}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{`: ${product.status}`}</td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <img
                    src={imagePreview}
                    alt=""
                    width={150}
                    height={100}
                    style={{
                      objectFit: "cover",
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
