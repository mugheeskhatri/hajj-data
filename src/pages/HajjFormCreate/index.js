import React, { useState } from "react";
import { Input, Label } from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import { useEffect } from "react";
import { A4Paper } from "../../components/printCard";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { inputs } from "../../data/data";
import {
  handleSubmitForm,
  uploadImageAndGetURL,
} from "../../actions/functions";
import CustomDateInput from "../../components/inputs/CustomDateInput";
import { DUMMY_IMAGE } from "../../config/api";

function DataForm() {
  const [data, setData] = useState({});
  const [previewCard, setPreviewCard] = useState(false);

  const [image, setImage] = useState();

  useEffect(() => {
    formDataSet();
  }, []);

  const formDataSet = () => {
    const formData = {};
    inputs.map((v) => {
      formData[v.value] = v.defaultVale ? v.defaultVale : "";
    });
    setData(formData);
    setImage(null);
  };

  const handleChange = (e, maxLength) => {
    const { name, value } = e.target;
    if (maxLength) {
      if (value.length == maxLength) return false;
      else {
        setData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  let componentRef = useRef();

  const previewSet = () => {
    setPreviewCard(true);
  };

  const print = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "hajj form data",
    onAfterPrint: () => console.log("Printed Successfully"),
  });

  const imageUpload = (file) => {
    uploadImageAndGetURL(file, setImage, setData);
  };
  return (
    <>
      <div className="flex">
        <div className="w-7/12">
          <PageTitle>ڈیٹا جمع کریں</PageTitle>
        </div>
        <div className="w-5/12 flex justify-end px-4 items-center">
          <div>
            <Button onClick={() => setPreviewCard((prev) => !prev)}>
              {previewCard ? "فارم پر کریں" : "فارم دیکھیں"}
            </Button>
          </div>
          <div>
            <img
              className="imageInForm mt-3 mr-6 border"
              src={image ? image : DUMMY_IMAGE}
            />
            <input
              type="file"
              id="file-input"
              onChange={imageUpload}
              style={{ display: "none" }}
            />
            <label
              htmlFor="file-input"
              style={{ fontSize: 10, padding: 6,width:80 }}
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple px-1 py-2 mr-6"
            >
              تصویر اپلوڈ کریں
            </label>
          </div>
        </div>
      </div>
      <div>
        {!previewCard ? (
          <div className="flex flex-wrap">
            {inputs.slice(0, inputs.length - 6).map((v, i) => {
              return (
                <div key={i} className={`w-full md:w-6/12 md:px-3 mt-5`}>
                  {v.type === "date" ? (
                    <CustomDateInput
                      data={data}
                      handleChange={handleChange}
                      v={v}
                      key={i}
                    />
                  ) : v.type !== "dropdown" ? (
                    <Label>
                      <span>{v.name}</span>
                      <Input
                        maxLength={v.maxLength}
                        min="1900-01-01"
                        max="2099-12-31"
                        onChange={(e) => handleChange(e, v.maxLength)}
                        name={v.value}
                        className="mt-2"
                        placeholder={v.name}
                        type={v.type}
                        id="start"
                        value={data[v.value]}
                      />
                    </Label>
                  ) : (
                    <Label>
                      <div>{v.name}</div>
                      <select
                        defaultValue={data[v.value]}
                        onChange={handleChange}
                        name={v.value}
                        className="block w-full focus:outline-none dark:text-gray-300 border rounded leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                        data-te-select-init
                      >
                        {v.options.map((value, index) => {
                          return (
                            <option value={value} key={index}>
                              {value}
                            </option>
                          );
                        })}
                      </select>
                    </Label>
                  )}
                </div>
              );
            })}
            {data.gender === "عورت" &&
              inputs.slice(inputs.length - 6, inputs.length - 4).map((v, i) => {
                return (
                  <div key={i} className={`w-full md:w-6/12 md:px-3 mt-5`}>
                    {v.type !== "dropdown" ? (
                      <Label>
                        <span>{v.name}</span>
                        <Input
                          maxLength={v.maxLength}
                          onChange={(e) => handleChange(e, v.maxLength)}
                          name={v.value}
                          className="mt-2"
                          placeholder={v.name}
                          type={v.type}
                          id="start"
                          value={data[v.value]}
                        />
                      </Label>
                    ) : (
                      <Label>
                        <div>{v.name}</div>
                        <select
                          defaultValue={data[v.value]}
                          onChange={handleChange}
                          name={v.value}
                          className="block w-full focus:outline-none dark:text-gray-300 border rounded leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                          data-te-select-init
                        >
                          {v.options.map((value, index) => {
                            return (
                              <option value={value} key={index}>
                                {value}
                              </option>
                            );
                          })}
                        </select>
                      </Label>
                    )}
                  </div>
                );
              })}
            <div className="w-full text-center">
              <PageTitle className="w-full mx-5 my-10 text-center text-lg font-bold">
                نامزد فرد کی تفصیل
              </PageTitle>
            </div>
            {inputs.slice(inputs.length - 4, inputs.length).map((v, i) => {
              return (
                <div key={i} className={`w-full md:w-6/12 md:px-3 mt-5`}>
                  <Label>
                    <span>{v.name}</span>
                    <Input
                      maxLength={v.maxLength}
                      onChange={(e) => handleChange(e, v.maxLength)}
                      name={v.value}
                      className="mt-2"
                      placeholder={v.name}
                      type={v.type}
                      value={data[v.value]}
                    />
                  </Label>
                </div>
              );
            })}
          </div>
        ) : (
          <A4Paper image={image} reference={componentRef} data={data} />
        )}
        <div className="my-5 px-3 w-full flex gap-2">
          <Button
            onClick={async () => {
              const response = await handleSubmitForm(data);
              if (response === "done") {
                formDataSet();
                alert("فارم جمعہ ہو چکا ہے");
              }
            }}
          >
            جمع کریں
          </Button>
          <Button
            onClick={async () => {
              const response = await handleSubmitForm(data);
              if (response === "done") {
                await previewSet();
                await print();
                formDataSet();
              }
            }}
          >
            جمع اور پرنٹ کریں
          </Button>
          <Button
            onClick={async () => {
              await previewSet();
              await print();
              formDataSet();
            }}
          >
            پرنٹ کریں
          </Button>
        </div>
      </div>
    </>
  );
}

export default DataForm;
