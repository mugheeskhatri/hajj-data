import React, { useState } from "react";
import { Input, Label } from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import { useEffect } from "react";
import { A4Paper } from "../../components/printCard";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { inputs } from "../../data/data";
import { decodedField, encodedField } from "../../actions/functions";
import {
  addDataToFirebase,
  fetchDataFromFirebase,
} from "../../actions/firebaseFunctions";
import axios from "axios";
import { CLOUDINARY_API } from "../../config/api";

function DataForm() {
  const [data, setData] = useState({});
  const [previewCard, setPreviewCard] = useState(false);

  useEffect(() => {
    formDataSet();
  }, []);

  const formDataSet = () => {
    const formData = {};
    inputs.map((v) => {
      formData[v.value] = v.defaultVale ? v.defaultVale : "";
    });
    setData(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const encodedNomineeNic = encodedField(data.nomineeNic);
      const encodedNIC = encodedField(data.NIC);
      const encodedPassport =
        data.passport.slice(0, 2) +
        encodedField(Number(data.passport.slice(2, data.passport.length)));
      const already = await fetchDataFromFirebase(encodedNIC);
      if (!already) {
        // const decodedNIC = (Number(NIC) - 20) / 1845;
        // const collectionRef = collection(fireStoreDB, "form-data");
        // await addDoc(collectionRef, data);
        const response = await addDataToFirebase({
          ...data,
          nomineeNic: encodedNomineeNic,
          NIC: encodedNIC,
          passport: encodedPassport,
        });
        return "done";
      } else {
        alert("اس شناختی کارڈ کا ڈیٹا پہلے سے موجود ہے");
        return "already";
      }
    } catch (e) {
      console.error("Error adding document: ", e);
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
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setData((prev) => ({ ...prev, image: reader.result }));
        let data = {
          file: reader.result,
          upload_preset: "haji-image",
        };
        axios
          .post(CLOUDINARY_API, data)
          .then((res) =>
            setData((prev) => ({ ...prev, image: res.data.secure_url }))
          );
      }
    };
    reader.readAsDataURL(file.target.files[0]);
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
              src={
                data.image
                  ? data.image
                  : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              }
            />
            <input
              type="file"
              id="file-input"
              onChange={imageUpload}
              style={{ display: "none" }}
            />
            <label
              htmlFor="file-input"
              style={{ fontSize: 10, padding: 10 }}
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
                  {v.type !== "dropdown" ? (
                    <Label>
                      <span>{v.name}</span>
                      <Input
                        maxlength={
                          v.value === "NIC"
                            ? "13"
                            : v.value === "passport"
                            ? "9"
                            : v.value === "mobile"
                            ? "11"
                            : v.value === "nomineePhone"
                            ? "11"
                            : v.value === "passportIssueDate" && "8"
                        }
                        min="1900-01-01"
                        max="2099-12-31"
                        onChange={handleChange}
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
                          onChange={handleChange}
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
                      onChange={handleChange}
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
          <A4Paper reference={componentRef} data={data} />
        )}
        <div className="my-5 px-3 w-full flex gap-2">
          <Button
            onClick={async () => {
              const response = await handleSubmit();
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
              const response = await handleSubmit();
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
