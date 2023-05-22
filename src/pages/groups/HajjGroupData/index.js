import React, { useState, useEffect, useRef } from "react";

import PageTitle from "../../../components/Typography/PageTitle";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from "@windmill/react-ui";

// import response from "../../utils/demo/tableData";
import { fetchDataFromFirebase } from "../../../actions/firebaseFunctions";
import { deleteGroup, getGroupData } from "../../../actions/functions";
import { useHistory } from "react-router-dom";
import { A4Paper } from "../../../components/printCard";
import { useReactToPrint } from "react-to-print";
import { groupTableHeaders } from "../../../data/data";

const HajjGroupData = () => {
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
    getGroupData(setResponse, setDataTable2, pageTable2, resultsPerPage);
  }, []);

  // edit field
  const editClick = (e) => {
    history.push(`/app/hajj-group/edit/${e.groupId}`);
  };

  // deleteClick field
  const deleteClick = async (e) => {
    await deleteGroup(e);
    alert("ڈیٹا ڈیلیٹ ہو چکا ہے ");
    getGroupData(setResponse, setDataTable2, pageTable2, resultsPerPage);
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
        style={{ marginRight: 15 }}
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
              {groupTableHeaders.map((v, i) => {
                return <TableCell key={i}>{v}</TableCell>;
              })}
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((group, i) => (
              <GroupRow RenderActions={RenderActions} group={group} key={i} />
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

const GroupRow = ({ group, RenderActions }) => {
  const [leaderData, setLeaderData] = useState({});
  useEffect(() => {
    getLeaderData();
  }, []);

  const getLeaderData = async () => {
    const leader = await fetchDataFromFirebase(group.leaderId);
    setLeaderData(leader);
  };

  console.log(leaderData);
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold">{group?.groupName}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{leaderData?.name}</span>
      </TableCell>
      <TableCell>{leaderData?.mobile}</TableCell>
      <TableCell>{group?.members?.length}</TableCell>
      <TableCell>{<RenderActions v={group} />}</TableCell>
    </TableRow>
  );
};

export default HajjGroupData;
