import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableCell,
  TableRow,
  Badge,
  Avatar,
  Button,
  Input,
} from "@windmill/react-ui";
import { useEffect } from "react";
import { fetchDataFromFirebase } from "../../../actions/firebaseFunctions";
import { CLOUDINARY_IMAGE_URL, DUMMY_IMAGE } from "../../../config/api";
import { decodedField, getGroupNameFromId } from "../../../actions/functions";
import { AiOutlineCheck } from "react-icons/ai";

function MembersAddModal({
  isModalOpen,
  closeModal,
  setData,
  selectedMembers,
  setSelectedMembers,
}) {
  const [allMembers, setAllMembers] = useState([]);
  const [allFilteredMembers, setAllFilteredMembers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetchDataFromFirebase();
    setAllMembers(response);
    setAllFilteredMembers(response);
  };

  const selectMember = (user) => {
    const onlyKeys = selectedMembers.map((v) => v.NIC);
    if (onlyKeys.includes(user.NIC)) {
      const members = selectedMembers.filter(
        (member) => member.NIC !== user.NIC
      );
      const membersToSet = members.map((v) => v.NIC);
      setSelectedMembers(members);
      setData((prev) => ({ ...prev, members: membersToSet }));
    } else if (onlyKeys.length >= 14) {
      alert("گروپ لمیٹ پوری ہے");
    } else {
      const members = [...selectedMembers, user];
      const membersToSet = members.map((v) => v.NIC);
      setSelectedMembers(members);
      setData((prev) => ({ ...prev, members: membersToSet }));
    }
  };

  const onChangeSearch = (e) => {
    const { value } = e.target;
    if (value) {
      const filteredMembers = allMembers?.filter((v) =>
        v.name.toUpperCase().includes(value.toUpperCase())
      );
      setAllFilteredMembers(filteredMembers);
    } else {
      setAllFilteredMembers(allMembers);
    }
  };

  return (
    <>
      <Modal style={{ width: 800 }} isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>
          <div className="flex w-full">
            <div className="w-3/12">ممبر سلیکٹ کریں</div>
            <div className="w-9/12">
              <Input
                onChange={onChangeSearch}
                className="w-full"
                placeholder="سرچ کریں"
              />
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div style={{ height: 450, overflowY: "auto" }} className="mt-2">
            <Table>
              {allFilteredMembers.map((user, i) => {
                return (
                  <MembersAddModalList
                    selectMember={() => selectMember(user)}
                    user={user}
                    key={i}
                    selectedMembers={selectedMembers}
                  />
                );
              })}
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

const MembersAddModalList = ({ user, selectMember, selectedMembers }) => {
  const [selected, setSelected] = useState(false);

  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const onlyKeys = selectedMembers.map((v) => v.NIC);
    const included = onlyKeys.includes(user.NIC);
    setSelected(included);
  }, [selectedMembers]);

  const getGroupName = async () => {
    if (user?.groupDetails) {
      const response = await getGroupNameFromId(user.groupDetails.groupId);
      setGroupName(response.groupName);
    }
  };

  useEffect(() => {
    getGroupName();
  }, []);

  return (
    <TableRow
      className="shadow rounded mt-2"
      style={user?.groupDetails ? { opacity: 0.8 } : {}}
    >
      <TableCell>
        <div
          onClick={!user?.groupDetails && selectMember}
          className="w-5 h-5 border flex items-center justify-center cursor-pointer"
        >
          {selected && <AiOutlineCheck size={15} color="blue" />}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center text-sm">
          <Avatar
            className="hidden ml-3 md:block"
            src={user.image ? CLOUDINARY_IMAGE_URL + user.image : DUMMY_IMAGE}
            alt="User avatar"
          />
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {user?.fatherOrHusbandName}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{decodedField(user.NIC)}</span>
      </TableCell>
      <TableCell>{user?.groupDetails ? <Badge>{groupName}</Badge> : ""}</TableCell>
    </TableRow>
  );
};

export default MembersAddModal;
