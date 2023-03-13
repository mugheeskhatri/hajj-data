import React, { useState, useEffect } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
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
import { EditIcon, TrashIcon } from "../../icons";
import { fetchDataFromFirebase } from "../../actions/firebaseFunctions";
import { decodedField } from "../../actions/functions";
// make a copy of the data, for the second table
// const response2 = response?.concat([]);

const HajjData = () => {
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);
  const [pageTable2, setPageTable2] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);

  //response from firebase
  const [response, setResponse] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(
      response.slice(
        (pageTable1 - 1) * resultsPerPage,
        pageTable1 * resultsPerPage
      )
    );
  }, [pageTable1]);

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
    getData();
  }, []);

  const getData = async () => {
    const response = await fetchDataFromFirebase();
    setResponse(response);
    setDataTable2(
      response.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  };

  return (
    <>
      <PageTitle>حج ڈیٹا</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader className="text-right">
            <tr>
              <TableCell>نام</TableCell>
              <TableCell>شناختی کارڈ</TableCell>
              <TableCell>جنس</TableCell>
              <TableCell>عمر </TableCell>
              <TableCell>فون نمبر</TableCell>
              <TableCell>ایکشنز </TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
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
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
         <div style={{direction:"ltr"}}>
         <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
         </div>
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default HajjData;
