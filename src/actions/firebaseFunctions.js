import { async } from "@firebase/util";
import { update } from "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { fireStoreDB } from "../config/firebase";

// get all users from firestore
export const fetchDataFromFirebase = async (NIC) => {
  if (NIC) {
    const collectionRef = doc(fireStoreDB, "form-data", NIC?.toString());
    const response = await getDoc(collectionRef);
    return response.data();
  } else {
    const collectionRef = collection(fireStoreDB, "form-data");
    const response = await getDocs(collectionRef);
    const updatedResponse = response.docs.map((v) => v.data());
    return updatedResponse;
  }
};

// add user to firebase
export const addDataToFirebase = async (data) => {
  const collectionRef = doc(fireStoreDB, "form-data", data?.NIC.toString());
  await setDoc(collectionRef, data);
};

// delete user from firestore
export const deleteDataFromFirebase = async (_id) => {
  await deleteDoc(doc(fireStoreDB, "form-data", _id.toString()));
};

// update user in firestore
export const updateDataInFirestore = async (data) => {
  const collectionRef = doc(fireStoreDB, "form-data", data?.NIC.toString());
  await updateDoc(collectionRef, data);
};

// add group
export const addGroupInFirestore = async (data) => {
  const customId = Math.floor(Math.random() * 18797989).toString();
  const collectionRef = doc(fireStoreDB, "group-data", customId);
  setDoc(collectionRef, { ...data, groupId: customId });
  return customId;
};

// update user group details by id
export const updateUserWithGroupId = async (groupDetails, NIC) => {
  const collectionRef = doc(fireStoreDB, "form-data", NIC);
  setDoc(collectionRef, { groupDetails }, { merge: true });
};

// get group from firestore by id
export const getGroupFromFirebase = async (id) => {
  if (id) {
    const collectionRef = doc(fireStoreDB, "group-data", id);
    const response = await getDoc(collectionRef);
    return response.data();
  }
};

//update specific key of group
export const updateGroupInFirebase = async (groupId, data) => {
  try {
    const collectionRef = doc(fireStoreDB, "group-data", groupId);
    setDoc(collectionRef, data, { merge: true });
  } catch (e) {
    console.log("Error", e);
  }
};

//get all groups
export const getAllGroups = async () => {
  try {
    const collectionRef = collection(fireStoreDB, "group-data");
    const response = await getDocs(collectionRef);
    const updatedResponse = response.docs.map((v) => v.data());
    return updatedResponse;
  } catch (e) {
    console.log("Error", e);
  }
};

//update group
export const updateGroupInFirestore = async (data, groupId) => {
  const collectionRef = doc(fireStoreDB, "group-data", groupId);
  await updateDoc(collectionRef, data);
};

//group delete
export const deleteGroupFromFirestore = async (_id) => {
  await deleteDoc(doc(fireStoreDB, "group-data", _id.toString()));
};
