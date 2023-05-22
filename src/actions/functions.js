import axios from "axios";
import { CLOUDINARY_API } from "../config/api";
import {
  addDataToFirebase,
  addGroupInFirestore,
  deleteGroupFromFirestore,
  fetchDataFromFirebase,
  getAllGroups,
  getGroupFromFirebase,
  updateDataInFirestore,
  updateGroupInFirebase,
  updateGroupInFirestore,
  updateUserWithGroupId,
} from "./firebaseFunctions";

export const encodedField = (field) => {
  return field * 184585 + 5598;
};

export const decodedField = (field) => {
  return (Number(field) - 5598) / 184585;
};

export const handleSubmitForm = async (data, edit) => {
  try {
    if (data.NIC.length < 13) {
      alert("براۓ کرم شناختی کارڈ نمبر پورا لکھیں");
    } else {
      const encodedNomineeNic = encodedField(data.nomineeNic);
      const encodedNIC = encodedField(data.NIC);
      const encodedPassport =
        data.passport.slice(0, 2) +
        encodedField(Number(data.passport.slice(2, data.passport.length)));
      if (edit) {
        const response = await updateDataInFirestore({
          ...data,
          nomineeNic: encodedNomineeNic,
          NIC: encodedNIC,
          passport: encodedPassport,
        });
        return "done";
      } else {
        const already = await fetchDataFromFirebase(encodedNIC);
        if (!already) {
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
      }
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const uploadImageAndGetURL = async (file, setImage, setData) => {
  let reader = new FileReader();
  reader.onload = () => {
    if (reader.readyState === 2) {
      setImage(reader.result);
      let data = {
        file: reader.result,
        upload_preset: "haji-image",
      };
      axios.post(CLOUDINARY_API, data).then((res) => {
        setImage(res.data.secure_url);
        setData((prev) => ({
          ...prev,
          image: res.data.secure_url
            .split("/")
            .slice(-2)
            .toString()
            .replace(",", "/"),
        }));
      });
    }
  };
  reader.readAsDataURL(file.target.files[0]);
};

export const getData = async (
  setResponse,
  setDataTable2,
  pageTable2,
  resultsPerPage
) => {
  const response = await fetchDataFromFirebase();
  setResponse(response);
  setDataTable2(
    response.slice(
      (pageTable2 - 1) * resultsPerPage,
      pageTable2 * resultsPerPage
    )
  );
};

export const createGroup = async (data) => {
  try {
    const withoutLeader = data.members.filter((v) => v !== data.leaderId);
    const leader = data.members.filter((v) => v === data.leaderId);
    const bothData = [...leader, ...withoutLeader];
    data.members = bothData;
    const response = await addGroupInFirestore(data);
    const leaderId = data.leaderId;
    data.members.map(async (v) => {
      const leader = leaderId === v;
      await updateUserWithGroupId(
        { groupId: response, leader },
        v.toString(),
        leader
      );
    });
    return "done";
  } catch (e) {
    console.log("Error in creating group", e);
  }
};

//get groupData
export const getGroupNameFromId = async (id) => {
  try {
    const response = await getGroupFromFirebase(id);
    return response;
  } catch (e) {
    console.log("Error", e);
    return id;
  }
};

// remove member from group
export const removeMemberFromGroup = async (NIC, groupId) => {
  try {
    const group = await getGroupFromFirebase(groupId);
    const filteredMembers = await group.members.filter((m) => m !== NIC);
    const updateGroup = await updateGroupInFirebase(
      groupId,
      group.leaderId === NIC
        ? {
            members: [...filteredMembers],
            leaderId: "",
          }
        : {
            members: [...filteredMembers],
          }
    );
  } catch (e) {
    console.log("Error:", e);
  }
};

export const getGroupData = async (
  setResponse,
  setDataTable2,
  pageTable2,
  resultsPerPage
) => {
  const response = await getAllGroups();
  setResponse(response);
  setDataTable2(
    response.slice(
      (pageTable2 - 1) * resultsPerPage,
      pageTable2 * resultsPerPage
    )
  );
};

export const updateGroupData = async (data, oldMembers) => {
  try {
    const withoutLeader = data.members.filter((v) => v !== data.leaderId);
    const leader = data.members.filter((v) => v === data.leaderId);
    const bothData = [...leader, ...withoutLeader];
    data.members = bothData;
    oldMembers.map(async (v) => {
      await updateUserWithGroupId(null, v.toString());
    });
    const response = await updateGroupInFirestore(data, data.groupId);
    const leaderId = data.leaderId;
    data.members.map(async (v) => {
      const leader = leaderId === v;
      await updateUserWithGroupId(
        { groupId: data.groupId, leader },
        v.toString()
      );
    });
    return "done";
  } catch (e) {
    console.log("Error in creating group", e);
  }
};

export const deleteGroup = async (data) => {
  try {
    await data.members.map(async (v) => {
      await updateUserWithGroupId(null, v.toString());
    });
    await deleteGroupFromFirestore(data.groupId);
    return "done";
  } catch (e) {
    console.log("Error", e);
  }
};
