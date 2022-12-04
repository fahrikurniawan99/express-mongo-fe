import { useState } from "react";
import { useHistory } from "react-router-dom";
import post from "../../api/post";
import Input from "../../components/Input";
import "./index.scss";

const Tambah = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: 0,
    status: false,
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.jp/150x100.png"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const formData = new FormData();
  const history = useHistory();

  const createProduct = async () => {
    try {
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("status", product.status);
      product.image !== "" && formData.append("image", product.image);

      const url = `${process.env.REACT_APP_BASEURL}/products`;
      await post(url, formData);
      alert("Berhasil membuat product.");
      const isRepeat = window.confirm("Buat product lagi ?");
      const resetForm = () => {
        setProduct({
          name: "",
          price: "",
          stock: 0,
          status: false,
          image: "",
        });
        setImagePreview("https://placehold.jp/150x100.png");
      };
      isRepeat ? resetForm() : history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (product.name && product.price) {
      if (errorMessage) {
        alert("Data belum benar.");
      } else {
        createProduct();
      }
    } else {
      alert("Data belum benar.");
    }
  };

  const nameValidation = (name, value) =>
    name === "name" && (value.length < 3 || value.length === 0);
  const priceValidation = (name, value) =>
    name === "price" && (value < 1000 || value > 100000000);

  const handleOnChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (nameValidation(name, value)) {
      setErrorMessage({ ...errorMessage, name: ["nama produk belum valid."] });
    } else if (priceValidation(name, value)) {
      setErrorMessage({
        ...errorMessage,
        price: ["harga produk belum valid."],
      });
    } else {
      setErrorMessage("");
    }
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={product.name}
            onChange={handleOnChange}
            error={errorMessage.name}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={product.price}
            onChange={handleOnChange}
            error={errorMessage.price}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={product.stock}
            onChange={handleOnChange}
          />
          <img
            src={imagePreview}
            alt=""
            width={150}
            height={100}
            style={{ objectFit: "cover", marginTop: 20, marginBottom: 10 }}
          />
          <Input
            name="image"
            type="file"
            label="Image"
            files={product.image}
            onChange={(event) => {
              setImagePreview(URL.createObjectURL(event.target.files[0]));
              setProduct({ ...product, image: event.target.files[0] });
            }}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={product.status}
            onChange={(event) => {
              setProduct({
                ...product,
                status: event.target.checked,
              });
            }}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
