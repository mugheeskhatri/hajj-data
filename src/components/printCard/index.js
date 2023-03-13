import React from "react";
import { useRef } from "react";
import { inputsWithoutNominee, nomineeData } from "../../data/data";

export const A4Paper = ({ data, reference }) => {
  return (
    <div ref={reference} className="a-4 p-5 pt-10 relative">
      <div className="w-full">
        <h1 style={{ fontSize: 30 }} className="">
          معلومات براۓ سرکاری حج فارم سکیم (٢٠٢٣)
        </h1>
        <h1 style={{ fontSize: 22 }} className="mt-6">
          ( کوائف براۓ معاونت سرکاری حج فارم )
        </h1>
      </div>
      <div className="flex flex-wrap mt-2">
        <h1 className="w-full px-4 mt-6 text-center" style={{ fontSize: 22 }}>
          درخواست کنندہ کی تفصیل
        </h1>
        {inputsWithoutNominee?.map((v, i) => {
          return <KeyValue key={i} data={data} v={v} />;
        })}
        <KeyValue
          data={{ name: "دستخط ", value: "signature" }}
          v={{ name: "دستخط" }}
        />
      </div>

      <div className="flex flex-wrap mt-10">
        <h1 className="w-full px-4" style={{ fontSize: 22 }}>
          نامزد فرد کی تفصیل
        </h1>
        {nomineeData?.map((v, i) => {
          return <KeyValue key={i} data={data} v={v} />;
        })}
      </div>
      <div className="my-intro">
        Software Developed by: Muhammad Mughees (Moosa Mill) +923211231805
      </div>

      <div className="logoContainer">
        <img
          className="logoBackground"
          src={
            data.image
              ? data.image
              : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
          }
        />
      </div>
    </div>
  );
};

const KeyValue = ({ data, v }) => {
  return (
    <div
      style={{ paddingRight: 10, paddingLeft: 10 }}
      className={`mt-5 ${v.value === "address" ? "w-full" : "w-6/12"}`}
    >
      <div className="border-custom p-2 form-text rounded flex">
        <span>{v.name}:</span>
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
