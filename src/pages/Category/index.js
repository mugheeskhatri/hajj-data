import React, { useState, useEffect } from 'react'
import { Input, Label } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import {
    Button, Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Pagination
} from '@windmill/react-ui'
import SectionTitle from '../../components/Typography/SectionTitle'
import { EditIcon, TrashIcon } from '../../icons'
import response from '../../utils/demo/tableData'
import { realtimedb, firestoredb } from '../../config/firebase'
import { set, ref, push, get, child, update, remove } from "firebase/database";
import { addDoc, collection, getDocs, doc, } from "firebase/firestore";
import tableData from '../../utils/demo/tableData'
function Category() {
    const response2 = response.concat([])
    const [pageTable1, setPageTable1] = useState(1)
    const [pageTable2, setPageTable2] = useState(1)
    const [category, setCategory] = useState()
    const [allCategory, setAllCategory] = useState()
    const [categoryData, setCategoryData] = useState([])
    const [mainCategoryData, setMainCategoryData] = useState([])
    const [key, setKey] = useState()

    const [dataTable1, setDataTable1] = useState([])
    const [dataTable2, setDataTable2] = useState([])

    // pagination setup
    const resultsPerPage = 10
    const totalResults = response.length

    // pagination change control
    function onPageChangeTable1(p) {
        setPageTable1(p)
    }

    // pagination change control
    function onPageChangeTable2(p) {
        setPageTable2(p)
    }
    useEffect(() => {
        setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
    }, [pageTable1])
    useEffect(() => {
        setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])

    const sendCatregory = () => {
        push(ref(realtimedb, 'category/'+ category), {
            category
        });
    }
    useEffect(() => {
        const dbRef = ref(realtimedb);
        get(child(dbRef, 'category')).then((snapshot) => {
            if (snapshot.exists()) {
                for (const property in snapshot.val()) {
                    snapshot.val() ?
                        setAllCategory(snapshot.val()[property])
                        : setAllCategory("")
                    mainCategoryData.push(property)
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })

    }, [categoryData])
    useEffect(() => {
        categoryData.push(allCategory)
    }, [allCategory])
    const filtered = categoryData.filter(function (x) {
        return x !== undefined;
    });
    console.log(mainCategoryData)

    const removeData = () => {
        // const removes = {};
        // removes['/category/' + key]
        remove(ref(realtimedb), '/category/', key)
    }
    return (
        <>
            <PageTitle>Category</PageTitle>

            <Label>
                <span>New Category</span>
                <Input onChange={e => {
                    setCategory(e.target.value)
                }} className="mt-1" />
            </Label>
            <div className="mt-4 mb-4">
                <Button onClick={sendCatregory} block>Add New Category</Button>
            </div>
            <PageTitle>All Categories</PageTitle>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Category</TableCell>
                            {/* <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell> */}
                            <TableCell>No of Products</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((e, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <p className="font-semibold">{e}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{allCategory[i]}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button layout="link" size="icon" aria-label="Edit">
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                            <Button layout="link" size="icon" aria-label="Delete">
                                                <TrashIcon onClick={() => {
                                                    setKey(mainCategoryData[i])
                                                    removeData()
                                                }} className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={onPageChangeTable2}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>
        </>
    )
}

export default Category
