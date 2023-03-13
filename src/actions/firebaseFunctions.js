import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { fireStoreDB } from "../config/firebase";

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

export const addDataToFirebase = async (data) => {
  const collectionRef = doc(fireStoreDB, "form-data", data?.NIC.toString());
  await setDoc(collectionRef, data);
};
