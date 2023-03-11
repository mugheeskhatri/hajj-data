import React from "react";
import { useRef } from "react";

export const A4Paper = ({ data, reference }) => {
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

  return (
    <div ref={reference} className="a-4 p-5 pt-10" >
      <div className="flex">
        <div className="w-9/12 px-5">
          <h1 style={{ fontSize: 30 }} className="">
            معلومات براۓ سرکاری حج فارم سکیم ٢٠٢٣
          </h1>
          <h1 style={{ fontSize: 22 }} className="mt-6">
            ( کوائف براۓ معاونت سرکاری حج فارم )
          </h1>
        </div>
        <div className="w-3/12 flex justify-end px-3">
          <div className="passportImage">
            Photo with blue background of size 3cm x 4cm maybe passed gum
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-2">
        {inputs?.map((v, i) => {
          return <KeyValue key={i} data={data} v={v} />;
        })}
        <KeyValue
          data={{ name: "دستخط ", value: "signature" }}
          v={{ name: "دستخط" }}
        />
      </div>
    </div>
  );
};

const KeyValue = ({ data, v }) => {
  const nameRef = useRef();
  const divRef = useRef();
  const divWidth = divRef?.current?.offsetWidth;
  const nameBoxWidth = nameRef?.current?.offsetWidth;
  const valueWidth = divWidth - nameBoxWidth - 20;

  return (
    <div
      ref={divRef}
      style={{ paddingRight: 10, paddingLeft: 10 }}
      className={`mt-5 ${v.value === "address" ? "w-full" : "w-6/12"}`}
    >
      <div className="border-custom p-2 form-text rounded flex">
        <span ref={nameRef}>{v.name}:</span>
        <span
          style={{
            paddingRight: 10,
            paddingLeft: 10,
          }}
          className="word-wrap-custom"
        >
          {data[v.value]}
        </span>
      </div>
    </div>
  );
};
