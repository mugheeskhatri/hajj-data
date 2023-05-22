import React, { useState, useEffect, useRef } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import {
  AiOutlinePrinter,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";

// import response from "../../utils/demo/tableData";
import { deleteDataFromFirebase } from "../../actions/firebaseFunctions";
import {
  decodedField,
  getData,
  removeMemberFromGroup,
} from "../../actions/functions";
import { CLOUDINARY_IMAGE_URL, DUMMY_IMAGE } from "../../config/api";
import { useHistory } from "react-router-dom";
import { A4Paper } from "../../components/printCard";
import { useReactToPrint } from "react-to-print";
import { tableHeaders } from "../../data/data";
// make a copy of the data, for the second table
// const response2 = response?.concat([]);

const HajjData = () => {
  //history
  const history = useHistory();

  // setup pages control for every table
  const [pageTable2, setPageTable2] = useState(1);

  //for print
  const [image, setImage] = useState("");
  const [dataToPrint, setDataToPrint] = useState({});
  const [showCard, setShowCard] = useState(false);
  const componentRef = useRef();

  // setup data for every table
  const [dataTable2, setDataTable2] = useState([]);

  //response from firebase
  const [response, setResponse] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(
      response.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  useEffect(() => {
    getData(setResponse, setDataTable2, pageTable2, resultsPerPage);
  }, []);

  // edit field
  const editClick = (e) => {
    history.push(`/app/hajj-data/edit/${e.NIC}`);
  };

  // deleteClick field
  const deleteClick = async (e) => {
    await deleteDataFromFirebase(e.NIC);
    e.groupDetails &&
      (await removeMemberFromGroup(e.NIC, e.groupDetails.groupId));
    alert("ڈیٹا ڈیلیٹ ہو چکا ہے ");
    getData(setResponse, setDataTable2, pageTable2, resultsPerPage);
  };

  // printClick field
  const printClick = async (e) => {
    await setDataToPrint({
      ...e,
      NIC: decodedField(e.NIC),
      nomineeNic: decodedField(e.nomineeNic),
      passport:
        e.passport.slice(0, 2) +
        decodedField(e.passport.slice(2, e.passport.length)),
    });

    await setImage(CLOUDINARY_IMAGE_URL + e.image);
    await setShowCard(true);
    print();
  };

  const print = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "hajj form data",
    onAfterPrint: () => {
      setShowCard(false);
      setImage("");
      setDataToPrint({});
    },
  });

  const RenderActions = ({ v }) => (
    <div className="flex items-center space-x-4">
      <Button
        onClick={() => editClick(v)}
        layout="link"
        size="icon"
        aria-label="Edit"
      >
        <AiOutlineEdit className="w-5 h-5" />
      </Button>
      <Button
        onClick={() => printClick(v)}
        style={{ marginRight: 15 }}
        layout="link"
        size="icon"
        aria-label="Print"
      >
        <AiOutlinePrinter className="w-5 h-5" />
      </Button>
      <Button
        onClick={() => deleteClick(v)}
        layout="link"
        size="icon"
        aria-label="Delete"
      >
        <AiOutlineDelete className="w-5 h-5" />
      </Button>
    </div>
  );

  return (
    <>
      <PageTitle>حج ڈیٹا</PageTitle>
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
        <TableFooter>
          <div style={{ direction: "ltr" }}>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable2}
              label="Table navigation"
            />
          </div>
        </TableFooter>
      </TableContainer>
      {showCard && (
        <A4Paper data={dataToPrint} image={image} reference={componentRef} />
      )}
    </>
  );
};

export default HajjData;
