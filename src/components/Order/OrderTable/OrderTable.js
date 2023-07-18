import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import convertStringToNumber from "lib-pbl6"
import useRouter from "../../../hooks/use-router";
import moment from "moment";
import { PDFDownloadLink } from '@react-pdf/renderer'

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function OrderTable(props) {
  const {
    data,
    width = '900px',
    isShowDelete = false,
    isPayment = false,
    isShowTable = true,
    handleDeteleProduct = (
      () => { }
    )
  } = props
  
  function createRow(desc, price, isNb = true) {
    return { desc, price, isNb };
  }

  const router = useRouter();
  var i = 0;
  var dataSort = data?.sort((a, b) =>
     {
      if(a.createAt > b.createAt) return -1;
        else return 1 }
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {dataSort?.map((item, index) => {
        const row1 = [
          createRow('Tổng tiền hàng', item?.total),
          createRow('Phí vận chuyển', 30000),
          createRow('Giảm phí vận chuyển', item?.total ?? 0 > 1000000 ? -30000 : 0),
        ];
        const invoiceSubtotal = subtotal(row1);
        if(item?.status !== 'Cart')
        {
          i =  i + 1;
          return (
            <div
              style={{
                margin: "20px",
                width: width,
                borderRadius: "10px",
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center'
                }}
              >
                <div
                  style={{
                    minWidth: '300px',
                  }}
                >
                  <div>Đơn {i} (Ngày đặt hàng: {moment(item?.createAt).format("DD/MM/YYYY")})</div>
                  <div>Trạng thái đơn hàng: {item?.status === 'Pending' ? 'Chờ xác nhận' : item?.status === 'Shipping' ? 'Đang giao hàng' : item?.status === 'Shipped' ? 'Đã giao hàng' : 'Đã hủy'}</div>
                </div>
                <div
                  style={{
                    width: '80%',
                    display: 'flex',
                    alignContent: 'flex-end',
                    justifyContent: 'flex-end'
                  }}
                >
                  <button
                    style={{
                      width: '101px',
                      height: '33px',
                      backgroundColor: '#E50000',
                      borderColor: 'red',
                      borderRadius: '10px',
                      marginLeft: '25px',
                      color: '#ffffff',
                    }}
                    onClick={(e) => {
                      router.push({
                        params: {
                          id: item?.id,
                        },
                        pathname: '/detailOrder',
                      })
                    }}
                  >
                    Chi tiết
                  </button>
                </div>

              </div>
              {isShowTable &&
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell align="center">Hình ảnh</TableCell>
                        <TableCell align="right">Đơn giá</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                        <TableCell align="right">Thành tiền</TableCell>
                        {!isShowDelete && <TableCell align="right">Xóa</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item?.list?.map((row) => (
                        <TableRow
                          key={row?.name}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            align="left"
                            sx={{ maxWidth: "180px" }}
                          >
                            {row?.productName}
                          </TableCell>
                          <TableCell align="center">
                            <img
                              src={row?.avtImageUrl}
                              width={100}
                              height={100}
                            />
                          </TableCell>
                          <TableCell align="right">{row?.price}</TableCell>
                          <TableCell align="right">{row?.quantity}</TableCell>
                          <TableCell align="right">{row?.price * row?.quantity}</TableCell>
                          {!isShowDelete &&
                            <TableCell align="right">
                              <IconButton
                                onClick={(e) => {
                                  !isPayment
                                    && handleDeteleProduct(row?.productId)
                                }
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          }
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ }} aria-label="simple table">
                    <TableBody>
                      {row1?.map((row) => (
                        <TableCell key={row.desc} sx={{ fontWeight: '700' }}  align="center">
                          <TableRow>{row.desc}</TableRow>
                          <TableCell align="center" style={{ width: 240 }}>{convertStringToNumber(row?.price?.toString(), true)}</TableCell>
                        </TableCell>
                      ))}
                      <TableRow >
                        <TableCell sx={{ fontWeight: '700' }}>Tổng phí thanh toán</TableCell>
                        <TableCell align="right">{convertStringToNumber(invoiceSubtotal?.toString(), true)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          )
        }
      })}
    </div>
  );
}

export default OrderTable;

