import React, { useState } from "react";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import axios from "axios";

function NewProduct() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    detail: "",
    price: 0,
    image: "",
    stock: 0,
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("detail", newProduct.detail);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image);
    formData.append("stock", newProduct.stock);
    formData.append("price", newProduct.price);

    axios
      .post("http://localhost:5000/api/product", formData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };
  return (
    <>
      <PageTitle>Add New Product</PageTitle>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Label>
          <span>Product Title</span>
          <Input
            type="text"
            placeholder="Enter title"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
            className="mt-1"
          />
        </Label>
        <Label className="mt-4">
          <span>Categories</span>
          <Select
            placeholder="Enter title"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="mt-1"
          >
            <option>Shoes</option>
            <option>Bags</option>
            <option>Jewellery</option>
            <option>Watches</option>
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Price</span>
          <Input
            type="number"
            placeholder="Enter price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="mt-1"
          />
        </Label>
        <Label className="mt-4">
          <span>Stock</span>
          <Input
            type="number"
            placeholder="Enter Stock"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="mt-1"
          />
        </Label>
        <Label className="mt-4">
          <span>Image</span>
          <Input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handlePhoto}
            className="mt-1"
          />
        </Label>
        <Label className="mt-4">
          <span>Discription</span>
          <Textarea
            type="text"
            name="detail"
            placeholder="Enter details"
            value={newProduct.detail}
            onChange={handleChange}
            className="mt-1"
            rows="6"
          />
        </Label>
        <div className="mt-4 mb-4">
          <Button type="submit">Add New Product</Button>
        </div>
      </form>
    </>
  );
}

export default NewProduct;
