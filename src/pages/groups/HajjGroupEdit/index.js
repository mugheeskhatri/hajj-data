import React, { useState } from "react";
import { Input, Label } from "@windmill/react-ui";
import PageTitle from "../../../components/Typography/PageTitle";
import { Button } from "@windmill/react-ui";
import { useEffect } from "react";
import { groupInputs, inputs } from "../../../data/data";
import {
  getGroupNameFromId,
  updateGroupData,
} from "../../../actions/functions";
import CustomDateInput from "../../../components/inputs/CustomDateInput";
import Memberstable from "./Memberstable";
import MembersAddModal from "./MembersAddModal";
import { useHistory, useParams } from "react-router-dom";
import { fetchDataFromFirebase } from "../../../actions/firebaseFunctions";

function HajjGroupEdit() {

  //history and params
  const params = useParams();
  const history = useHistory()

  const [data, setData] = useState({});

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [oldMembers, setOldMembers] = useState([]);

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // formDataSet();
    getGroupDetails();
  }, []);

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

  const getGroupDetails = async () => {
    const groupData = await getGroupNameFromId(params.id);
    setData(groupData);
    const membersDataWithDetails = [];
    for (var i = 0; i < groupData.members.length; i++) {
      const response = await fetchDataFromFirebase(groupData.members[i]);
      membersDataWithDetails.push(response);
    }
    setSelectedMembers(membersDataWithDetails);
    setOldMembers(groupData.members);
  };
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const groupEdit = async () => {
    if (data.groupName === "") {
      alert("Please enter group name");
    } else {
      const response = await updateGroupData(data, oldMembers);
      if (response === "done") {
        alert("فارم ایڈٹ  ہو چکا ہے");
        history.goBack()
      }
    }
  };

  console.log("Data", data);

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
          <Button onClick={groupEdit}>ایڈٹ  کریں</Button>
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
        data={data}
      />
    </>
  );
}

export default HajjGroupEdit;
