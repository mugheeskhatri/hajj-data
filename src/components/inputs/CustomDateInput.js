import React, { useState } from "react";
import { Label } from "@windmill/react-ui";
import { useEffect } from "react";

const CustomDateInput = ({ v, handleChange, data }) => {
  const [dateValues, setDateValues] = useState({
    date: "",
    month: "",
    year: "",
  });
  const onDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "year") {
      if (value.length == 5) return false;
      else {
        setDateValues((prev) => ({ ...prev, year: value }));
      }
    } else {
      if (value.length == 3) return false;
      else {
        setDateValues((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  useEffect(() => {
    console.log("Date", data[v.value]);
    const splitedValues = data[v.value]?.split("-");
    if (splitedValues) {
      setDateValues({
        date: splitedValues[0],
        month: splitedValues[1],
        year: splitedValues[2],
      });
    }
  }, []);

  useEffect(() => {
    handleChange({
      target: {
        value: `${dateValues.date ? dateValues.date : `     `}-${
          dateValues.month ? dateValues.month : `     `
        }-${dateValues.year ? dateValues.year : `    `}`,
        name: v.value,
      },
    });
  }, [dateValues]);
  return (
    <Label>
      <span>{v.name}</span>
      <div
        style={{ direction: "ltr" }}
        className="flex justify-end block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-2"
      >
        <input
          onChange={(e) => onDateChange(e)}
          name="date"
          className="dateInputs ml-1 text-sm dark:text-gray-300 dark:bg-gray-700"
          style={{ width: 18 }}
          type="number"
          placeholder="00"
          value={dateValues.date}
        />{" "}
        /
        <input
          onChange={(e) => onDateChange(e, v.value)}
          name="month"
          className="dateInputs ml-1 text-sm dark:text-gray-300 dark:bg-gray-700"
          style={{ width: 18 }}
          type="number"
          placeholder="00"
          value={dateValues.month}
        />{" "}
        /
        <input
          onChange={(e) => onDateChange(e, v.value)}
          name="year"
          className="dateInputs ml-1 text-sm dark:text-gray-300 dark:bg-gray-700"
          style={{ width: 35 }}
          type="number"
          placeholder="2023"
          value={dateValues.year}
        />
      </div>
    </Label>
  );
};

export default CustomDateInput;
