import React, { useState } from "react";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import axios from "axios";
import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { fireStoreDB } from "../../config/firebase";
import { A4Paper } from "../../components/printCard";
import { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";

function DataForm() {
  const [data, setData] = useState({});
  const [previewCard, setPreviewCard] = useState(false);

  const inputs = [
    {
      name: "شناختی کارڈ",
      value: "NIC",
      type: "text",
    },
    {
      name: "تاریخ پیدائش",
      value: "DOB",
      type: "date",
    },
    {
      name: "عمر",
      value: "age",
      type: "number",
    },
    {
      name: "پاسپورٹ نمبر",
      value: "passport",
      type: "number",
    },
    {
      name: "تاریخ اجراء",
      value: "passportIssueDate",
      type: "date",
    },
    {
      name: "تاریخ تنسیخ",
      value: "passportExpireDate",
      type: "date",
    },
    {
      name: "نام",
      value: "name",
      type: "text",
    },
    {
      name: "والد / شوہر کا نام",
      value: "fatherOrHusbandName",
      type: "text",
    },
    {
      name: "مکمّل پتا",
      value: "address",
      type: "text",
    },
    {
      name: "مادری زبان",
      value: "language",
      type: "text",
    },
    {
      name: "موبائل نمبر",
      value: "mobile",
      type: "number",
    },
    {
      name: "ٹیلی فون نمبرگھر",
      value: "telephoneHome",
      type: "number",
    },
    {
      name: "ٹیلی فون نمبردفتر",
      value: "telephoneOffice",
      type: "number",
    },
    {
      name: "جنس",
      type: "dropdown",
      options: ["Male", "Female"],
      value: "gender",
    },
    {
      name: "شادی شدہ",
      type: "dropdown",
      options: ["Maried", "Unmaried"],
      value: "maritalStatus",
    },
    {
      name: "بلڈ گروپ",
      value: "bloogGroup",
      type: "text",
    },
    {
      name: "پہلے حج کیا ہوا ہے؟",
      type: "dropdown",
      options: ["Yes", "No"],
      value: "performHajjBefore",
    },
    {
      name: "ساتھ خاتون نے پہلے حج کیا ہوا ہے؟",
      type: "dropdown",
      options: ["Yes", "No"],
      value: "partnerLadyPerfomed",
    },
    {
      name: "محرم کے ساتھ رشتہ",
      type: "dropdown",
      value: "relationWithMahram",
      options: [
        "Husband",
        "Father",
        "Brother",
        "Son",
        "Grand Father",
        "Grand Father From Mother",
        "Father in law",
        "Uncle from father",
        "Uncle from mother",
        "Nephew from sister",
        "Nephew from brother",
        "grandson",
        "grandsonFromDaughter",
        "Son in law",
      ],
    },
    {
      name: "نامزد کا نام",
      value: "Nomineename",
      type: "text",
    },
    {
      name: "نامزد کا شناختی کارڈ نمبر",
      value: "nomineeNic",
      type: "number",
    },
    {
      name: "نامزد کا فون  نمبر",
      value: "nomineePhone",
      type: "number",
    },
    {
      name: "نامزد کے ساتھ رشتہ",
      value: "relationWithNominee",
      type: "text",
    },
    {
      name: "ای میل",
      value: "emailAddress",
      type: "email",
    },
  ];

  useEffect(() => {
    const formData = {};
    inputs.map((v) => {
      formData[v.value] = "";
    });
    setData(formData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      const docRef = await addDoc(collection(fireStoreDB, "form-data"), data);
      console.log("Document written with ID: ", docRef.id);
      await previewSet();
      print();
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

  return (
    <>
      <div className="flex">
        <div className="w-9/12">
          <PageTitle>Add New Data</PageTitle>
        </div>
        <div className="w-3/12">
          <Button onClick={() => setPreviewCard((prev) => !prev)}>
            Preview Form
          </Button>
        </div>
      </div>
      <div>
        {!previewCard ? (
          <div className="flex flex-wrap">
            {inputs.map((v, i) => {
              return (
                <div className="w-full md:w-6/12 md:px-3 mt-5">
                  {v.type !== "dropdown" ? (
                    <Label>
                      <span>{v.name}</span>
                      <Input
                        onChange={handleChange}
                        name={v.value}
                        className="mt-1"
                        placeholder={v.name}
                        type={v.type}
                      />
                    </Label>
                  ) : (
                    <Label>
                      <span>{v.name}</span>
                      <Select
                        onChange={handleChange}
                        name={v.value}
                        className="mt-1"
                      >
                        {v.options.map((value, index) => {
                          return (
                            <option value={value} key={index}>
                              {value}
                            </option>
                          );
                        })}
                      </Select>
                    </Label>
                  )}
                </div>
              );
            })}
            <div className="my-5 px-3 w-full flex gap-2">
              <Button onClick={handleSubmit}>Submit</Button>
              <Button>Submit and Print</Button>
              <Button>Print</Button>
            </div>
          </div>
        ) : (
          <A4Paper reference={componentRef} data={data} />
        )}
      </div>
    </>
  );
}

export default DataForm;
