import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextInput, TextLabel } from "@findxdn/erp-theme";
import { IconButton } from "@mui/material";
import {TextField} from "@mui/material";
import { Controller, useForm } from 'react-hook-form'
import convertStringToNumber from "lib-pbl6"

function CartTable(props) {
  const { 
    data, 
    width = '90%', 
    isShowDelete = false,
    isPayment = false, 
    setValue,
    control = null,
    disabledBt = false,
    getValues,
    valueTotal,
    setValueTotal,
    handleDeteleProduct= (
      () => {}
    )
  } = props
  
  return (
    <div
      style={{
        margin: "20px 10px",
        width: width,
        borderRadius: "10px",
        border: "1px solid #828282",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell align="right">Đơn giá</TableCell>
              <TableCell align="right">
                Số lượng
              </TableCell>
              <TableCell align="right">Thành tiền</TableCell>
              {!isShowDelete && !disabledBt && <TableCell align="right">Xóa khỏi giỏ hàng</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.list?.map((row) =>{ 
              return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  sx={{ maxWidth: "180px" }}
                >
                  {row.productName}
                </TableCell>
                <TableCell align="center">
                    <img 
                      src={row?.avtImageUrl}
                      width='100px'
                      height='100px'
                    />
                </TableCell>
                <TableCell align="right">{convertStringToNumber(row.price?.toString(), true)}</TableCell>
                <TableCell align="right">
                  <Controller
                      control={control}
                      rules={{
                          required: true,
                      }}
                      defaultValue={row.quantity} 
                      render={({ field: { ref, onChange, ...rest } }) => (
                          <TextField
                              {...rest}
                              type='number'
                              onChange={(e) => {
                                if(e.target.value != '')
                                {
                                  setValue(`${row?.id}total`, parseInt(e.target.value) * row.price)
                                  setValueTotal(valueTotal + (parseInt(e.target.value) - parseInt(rest.value != '' ? rest.value : 0)) * row.price)
                                  onChange(e.target.value)
                                }
                                else if(e.target.value == '')
                                {
                                  setValue(`${row?.id}total`, convertStringToNumber('0', true))
                                  setValueTotal(valueTotal + (0 - parseInt(rest.value)) * row.price)
                                  onChange('0')
                                }
                              }}
                              disabled={disabledBt}
                              InputProps={{ inputProps: { min: 1, max: 1000000 } }}
                              variant="outlined"
                              InputLabelProps={{ style: { fontSize: 13 } }}
                          />
                      )}
                      name={`${row?.productId}`}
                  />
                </TableCell>
                <TableCell align="right">
                  <Controller
                      control={control}
                      rules={{
                          required: true,
                      }}
                      defaultValue={row.quantity * row.price}  
                      render={({ field: { ref, value, ...rest } }) => (
                        <TextField
                            {...rest}
                            disabled
                            value={convertStringToNumber(value.toString(), true)}
                        />
                    )}
                    name={`${row?.id}total`}
                />
                </TableCell>
                {!isShowDelete && !disabledBt &&
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => {
                        !isPayment 
                        && handleDeteleProduct(row?.productId)}
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                }
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CartTable;
