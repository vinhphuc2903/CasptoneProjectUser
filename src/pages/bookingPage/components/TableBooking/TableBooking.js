import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@findxdn/erp-theme';
import CustomTable from '../../../../components/custom-table/CustomTable';
import convertStringToNumber from 'lib-pbl6';
// import Pagination from 'shared/components/common/pagination/CommonPagination';
import styles from './TableBooking.module.scss';
import CustomPagination from '../../../../components/pagination/CommonPagination';
import CustomTooltip from '../../../../components/tooltip/CustomTooltip';
import moment, { now } from 'moment';
import Modal from '@mui/material/Modal';
import DetailBooking from '../DetailBooking/DetailBooking';
import { useDispatch } from 'react-redux';
import OrderAction from '../../../../redux/order/action';
import Utils from '../../../../utils/Utils';
import getErrorMessage from '../../../../utils/ErrorConstant';
import { PDFDownloadLink } from '@react-pdf/renderer'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  padding: 0,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TableBooking(props) {
  const { loading, dataList, sum, paging,tableName } = props;
  var currentDate = new Date();
  var fiveMinutesAgo = new Date(currentDate.getTime() - 5 * 60000);
  const dataListOrder = dataList?.map((item, i) => ({
    id: item?.orderId,
    index: i + 1,
    orderCode: item?.orderCode,
    filmName: item?.filmName,
    createdAt: moment(item?.createdAt).format('DD/MM/YYYY HH:mm'),
    isPayment: item?.statusPayment == '30' ? true : false,
    isCanPayment: item?.statusPayment == '10'  && moment(item?.createdAt).format('YYYY/MM/DD HH:mm:ss') >=  moment(fiveMinutesAgo).format('YYYY/MM/DD HH:mm:ss') ? true : false,
    paymentAt: item?.paymentAt && moment(item?.paymentAt).format('DD/MM/YYYY HH:mm'),
    statusOrder: item?.statusOrder == '10' ? "Chưa thanh toán" : item?.statusOrder == '20' ? "Thanh toán thất bại" : "Thành công",
    statusPayment: item?.statusPayment == '10' ? "Chưa thanh toán" : item?.statusOrder == '20' ? "Thanh toán thất bại" : "Đã thanh toán",
    statusOrderSt: item?.statusOrder,
    statusPaymentSt: item?.statusPaymentSt,
    total: item?.total,
  }));
  const headCells = [
    {
      id: 'index',
      label: '#',
      field: 'index',
      minWidth: 40,
      maxWidth: 40,
      align: 'left',
      code: '1',
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'orderCode',
      label: 'Mã giao dịch',
      field: 'orderCode',
      minWidth: 200,
      maxWidth: 200,
      align: 'left',
      code: '2',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
          <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'createdAt',
      label: 'Thời gian giao dịch',
      field: 'createdAt',
      minWidth: 170,
      maxWidth: 170,
      align: 'left',
      code: '3',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'paymentAt',
      label: 'Thời gian thanh toán',
      field: 'paymentAt',
      minWidth: 180,
      maxWidth: 180,
      align: 'left',
      code: '3',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'filmName',
      label: 'Tên film',
      field: 'filmName',
      minWidth: 200,
      maxWidth: 200,
      align: 'left',
      code: '4',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
          <Typography className={styles.LineClamp}>{children}</Typography>
        </CustomTooltip>
      ),
    },
    {
      id: 'statusOrder',
      label: 'Trạng thái GD',
      field: 'statusOrder',
      minWidth: 160,
      align: 'left',
      code: '5',
    //   isHidden: true,
      isShow: 'true',
      component: (data) => (
        <Typography className={styles.LineClamp}
        style={{
          color: `${data?.data?.statusOrderSt == "30" ? "#0f7005" : data?.data?.statusOrderSt == "20" ? "red" : "#7f7f7e"}`,
        }}
        >{data?.children}</Typography>
      ),
    },
    {
      id: 'statusPayment',
      label: 'Trạng thái TT',
      field: 'statusPayment',
      minWidth: 160,
      align: 'left',
      code: '6',
    //   isHidden: true,
      isShow: 'true',
      component: (data) => (
        <Typography className={styles.LineClamp} 
        style={{
          color: `${data?.data?.statusOrderSt == "30" ? "#0f7005" : data?.data?.statusOrderSt == "20" ? "red" : "#7f7f7e"}`,
        }}>{data?.children}</Typography>
      ),
    },
    {
      id: 'total',
      label: 'Tổng tiền',
      field: 'total',
      minWidth: 140,
      align: 'left',
      code: '6',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{convertStringToNumber((children ?? 0)?.toString())}</Typography>
      ),
    },
    {
      id: 'id',
      label: 'Chi tiết',
      field: 'id',
      minWidth: 140,
      align: 'left',
      code: '7',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <div
          style={{
            cursor: 'pointer',
            color: 'white',
            backgroundColor: '#ae4108',
            padding: '5px 10px',
            borderRadius: '3px',
            fontSize: '14px'
          }}
          onClick={e => handleOnClick(e, children)}
        >
          Chi tiết
        </div>
      ),
    },
    {
      id: 'id',
      label: 'Thanh toán',
      field: 'id',
      minWidth: 140,
      align: 'left',
      code: '7',
      isShow: 'true',
      component: (data) => {
        return (
        <div
          style={{
            cursor: 'pointer',
            border: `1px solid ${data?.data?.isPayment ? "#0f7005" : data?.data?.isCanPayment ? "red" : "#7f7f7e"}`,
            backgroundColor: `${data?.data?.isPayment ? "#0f7005" : data?.data?.isCanPayment ? "red" : "#7f7f7e"}`,
            padding: '5px 10px',
            borderRadius: '3px',
            color: 'white',
            fontSize: '14px',
            width: '120px',
            display: 'flex',
            justifyContent: 'center'
          }}
          onClick={e => {
            if(!data?.data?.isPayment && data?.data?.isCanPayment)
            {
              handleOnClickPayment(e, data?.children)
            }
          }}
        >
            {data?.data?.isPayment ? "Đã thanh toán" : 
              data?.data?.isCanPayment ? "Thanh toán" : "TT Thất bại"}
        </div>
      )},
    },
  ];
  const dispatch = useDispatch();
  
  const [ open, setOpen ] = React.useState(false);
  const handleOnClick = (event, id) => {
    event.preventDefault()
    setOpen(!open)
    dispatch({
      type: OrderAction.GET_DETAIL_BY_ID,
      params: id,
      onSuccess: (data) => {

      },
      onError: (data) => {
      
      }
    })
  }

  const handleOnClickPayment = (event, id) => {
    event.preventDefault()
    dispatch({
      type: OrderAction.GET_LINK_PAYMENT,
      params: { OrderId:  id},
      onSuccess: (data) => {
        window.location = data
      },
      onError: (data) => {
        Utils.showErrorToast({
          message:
            `Thanh toán thất bại: ${getErrorMessage(data)}`,
        });
      }
    })
  }

  return (
    <>
    <Modal
        open={open}
        onClose={handleOnClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{padding: 0}}
      >
        <div style={style} padding={0} >
          <DetailBooking />
        </div>
      </Modal>
    <Box className={styles.tableBonus} sx={{ color: 'blue' }}>
        <>
        <div className={styles.bonus}>
            <div className={styles.totalBonus}>
              {tableName}
            {/* <span>{convertNumberToString(sum?.TotalBonusValue)}</span> */}
            </div>
        </div>
        <CustomTable
            headerColumn={headCells}
            data={dataListOrder ?? []}
            isShowCheckBox={false}
        />
        </>
    </Box>
    {/* <CustomPagination total={paging?.totalRecord || 0} /> */}
    </>
  );
}

export default TableBooking;
