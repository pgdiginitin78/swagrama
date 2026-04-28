import * as React from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Box } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const tableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export default function CommonPaginationTable(props) {
  const {
    dataResult,
    page,
    setPage,
    tableClass,
    rowsPerPage,
    count,
    renderActions,
    removeHeaders,
    handleSelectedRow,
    highlightRow,
    customRowBgColor,
    rowBackgroundColor,
    editableColumns,
    renderInput,
    populateTable,
    renderTableHeader,
  } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [rowIndex, setRowIndex] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  const removeHeader = (headers, fieldToRemove) => {
    return headers.filter((v) => !fieldToRemove.includes(v));
  };

  const allHeaders = dataResult?.length > 0 ? Object.keys(dataResult[0]) : [];

  const headers = removeHeaders
    ? removeHeader(allHeaders, removeHeaders)
    : allHeaders;

  const handlePageChange = (event, newPage) => {
    if (newPage === page || isLoading) return;
    setPage(newPage);
    setRowIndex(null);
    setIsLoading(true);
    populateTable && populateTable(newPage);
  };

  useEffect(() => {
    if (isLoading) setIsLoading(false);
  }, [dataResult]);

  return (
    <div className="w-auto grid">
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Paper sx={{ width: "100%", border: "1px solid lightgray" }}>
          {props?.tableHeading && (
            <div className="font-semibold text-sm pl-2 py-2">
              {props?.tableHeading} {renderTableHeader && renderTableHeader()}
            </div>
          )}

          <TableContainer
            sx={{
              "&::-webkit-scrollbar": { width: 7, height: 10 },
              "&::-webkit-scrollbar-track": { backgroundColor: "#ebebeb" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7393b3",
                borderRadius: 4,
              },
            }}
            className={tableClass}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow
                  sx={{ "& th": { paddingY: 1, backgroundColor: "#F1F1F1" } }}
                >
                  {headers.map((header, index) => (
                    <TableCell
                      sortDirection={orderBy === header ? order : false}
                      className="whitespace-nowrap"
                      key={index}
                    >
                      <TableSortLabel
                        active={false}
                        direction={orderBy === header ? order : "asc"}
                        onClick={createSortHandler(header)}
                      >
                        <span className="text-gray-600 font-bold text-sm">
                          {header}
                        </span>
                        {orderBy === header ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  {renderActions && (
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {tableSort(dataResult, getComparator(order, orderBy)).map(
                  (row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => {
                        setRowIndex(index);
                        handleSelectedRow && handleSelectedRow(row, index);
                      }}
                      sx={{ "& td": { paddingY: 1, fontSize: 12 } }}
                      style={{
                        backgroundColor:
                          (highlightRow === undefined ||
                            highlightRow === true) &&
                          rowIndex === index
                            ? customRowBgColor || "#FFC44B"
                            : rowBackgroundColor
                              ? rowBackgroundColor(row, index)
                              : "",
                      }}
                      hover
                    >
                      {headers.map((header, i) => (
                        <TableCell
                          className="whitespace-nowrap text-xs"
                          key={i}
                        >
                          {editableColumns && editableColumns.includes(header)
                            ? renderInput && renderInput(row, index, header)
                            : row[header] === true
                              ? "Yes"
                              : row[header] === false
                                ? "No"
                                : row[header]}
                        </TableCell>
                      ))}
                      {renderActions && (
                        <TableCell className="text-xs">
                          {renderActions(row, index)}
                        </TableCell>
                      )}
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>

            {isLoading && (
              <div className="flex justify-center text-gray-400 font-semibold my-10">
                <LoadingSpinner />
              </div>
            )}
          </TableContainer>

          <div className="flex justify-end px-4 py-2">
            <div className="inline-flex items-center gap-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={(e) => handlePageChange(e, page - 1)}
                disabled={page === 0 || isLoading}
                className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed border-r border-gray-200 transition-colors"
              >
                &lt;
              </button>

              {(() => {
                const totalPages = Math.ceil(count / rowsPerPage);
                const pages = [];

                if (totalPages <= 7) {
                  for (let i = 0; i < totalPages; i++) pages.push(i);
                } else if (page < 4) {
                  for (let i = 0; i < 4; i++) pages.push(i);
                  pages.push("...");
                  pages.push(totalPages - 2);
                  pages.push(totalPages - 1);
                } else if (page >= totalPages - 4) {
                  pages.push(0);
                  pages.push(1);
                  pages.push("...");
                  for (let i = totalPages - 4; i < totalPages; i++)
                    pages.push(i);
                } else {
                  pages.push(0);
                  pages.push("...");
                  pages.push(page - 1);
                  pages.push(page);
                  pages.push(page + 1);
                  pages.push("...");
                  pages.push(totalPages - 1);
                }

                return pages.map((pageNum, index) => {
                  if (pageNum === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-gray-400 text-sm border-r border-gray-200"
                      >
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={(e) => handlePageChange(e, pageNum)}
                      disabled={isLoading}
                      className={`min-w-[40px] px-3 py-2 text-sm border-r border-gray-200 transition-colors ${
                        page === pageNum
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      } disabled:cursor-not-allowed`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                });
              })()}

              <button
                onClick={(e) => handlePageChange(e, page + 1)}
                disabled={
                  page >= Math.ceil(count / rowsPerPage) - 1 || isLoading
                }
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
