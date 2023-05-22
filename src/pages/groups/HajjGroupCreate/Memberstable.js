import React from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Avatar,
  Button,
  Badge,
} from "@windmill/react-ui";

import { tableHeaders } from "../../../data/data";
import { CLOUDINARY_IMAGE_URL, DUMMY_IMAGE } from "../../../config/api";
import { decodedField } from "../../../actions/functions";

const Memberstable = ({ dataTable2, setData, data }) => {
  //render table actions
  const RenderActions = ({ v }) => (
    <div className="flex items-center space-x-4">
      {data.leaderId === v.NIC ? (
        <Badge>گروپ لیڈر</Badge>
      ) : (
        <Button onClick={() => makeLeader(v)}>گروپ لیڈر بنائیں</Button>
      )}
    </div>
  );

  const makeLeader = (v) => {
    setData((prev) => ({ ...prev, leaderId: v.NIC }));
  };

  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader className="text-right">
          <tr>
            {tableHeaders.map((v, i) => {
              return <TableCell key={i}>{v}</TableCell>;
            })}
          </tr>
        </TableHeader>
        <TableBody>
          {dataTable2.map((user, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Avatar
                    className="hidden ml-3 md:block"
                    src={
                      user.image
                        ? CLOUDINARY_IMAGE_URL + user.image
                        : DUMMY_IMAGE
                    }
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
              <TableCell>{user?.gender}</TableCell>
              <TableCell>{user?.age}</TableCell>
              <TableCell>{user?.mobile}</TableCell>
              <TableCell>{<RenderActions v={user} />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Memberstable;
