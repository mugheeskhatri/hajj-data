import React, { useState } from "react";
import { Input, Label } from "@windmill/react-ui";
import PageTitle from "../../../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import { useEffect } from "react";
import { groupInputs, inputs } from "../../../data/data";
import { createGroup } from "../../../actions/functions";
import CustomDateInput from "../../../components/inputs/CustomDateInput";
import Memberstable from "./Memberstable";
import MembersAddModal from "./MembersAddModal";

function HajjGroupCreate() {
  const [data, setData] = useState({});

  const [selectedMembers, setSelectedMembers] = useState([]);

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    formDataSet();
  }, []);

  const formDataSet = () => {
    const formData = {};
    groupInputs.map((v) => {
      formData[v.value] = v.defaultVale ? v.defaultVale : "";
    });
    setData({ ...formData, leaderId: "" });
    setSelectedMembers([]);
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

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const groupCreate = async () => {
    if (data.groupName === "") {
      alert("براۓ کرم گروپ کا نام لکھیں");
    } else {
      const response = await createGroup(data);
      if (response === "done") {
        formDataSet();
        alert("فارم جمعہ ہو چکا ہے");
      }
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-full text-center">
          <PageTitle>گروپ بنائیں</PageTitle>
        </div>
      </div>
      <div>
        {/* group form */}
        <div className="flex flex-wrap">
          {groupInputs.slice(0, inputs.length - 6).map((v, i) => {
            return (
              <div key={i} className={`w-full md:px-3 mt-5`}>
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
        </div>

        {/* ptint Button */}
        <div className="my-5 px-3 w-full flex gap-2">
          <Button onClick={groupCreate}>جمع کریں</Button>
        </div>
      </div>

      <div className="w-full text-center relative my-4">
        <PageTitle>گروپ ممبران لسٹ</PageTitle>
        <div
          style={{ height: "100%" }}
          className="flex items-center absolute left-0 top-0"
        >
          <Button onClick={openModal}>+ ممبر ایڈ کریں</Button>
        </div>
      </div>

      {/* members table */}
      <Memberstable
        data={data}
        setData={setData}
        dataTable2={selectedMembers}
      />

      {/* members add modal */}
      <MembersAddModal
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
        setData={setData}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  );
}

export default HajjGroupCreate;
