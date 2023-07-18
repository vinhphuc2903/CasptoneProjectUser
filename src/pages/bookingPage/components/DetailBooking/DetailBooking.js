import React from "react";
import styles from './DetailBooking.module.scss'
import { useSelector } from "react-redux";
import moment from "moment";
import convertStringToNumber from "lib-pbl6";
import QRCode from 'react-qr-code';
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFFilesBusinessFee from "./PDFFilesBusinessFee";
import IcExportFile from "../../../../assets/icons/ic_export_file";

function formatNumber(num = 0) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num.toLocaleString();
    }
} 
function DetailBooking()
{
    const content = (name, value) => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
            }}>
                <div style={{ width: '40%', flex: 'left', fontWeight: '600' }}>
                    {name}
                </div>
                <div style={{ width: '60%', flex: 'left'}}>
                    : {value}
                </div>
            </div>    
        )
    }
    const detailShowtime = useSelector(state => state?.Order?.detailShowtime)
    return (
        <div className={styles.DetailBooking}>
            <div className={styles.HeaderBooking}>
                Thông tin đặt vé
            </div>
            <div 
                className={styles.infoDetail}
            >
                <div className={styles.column}>
                    {content('Mã giao dịch', detailShowtime?.orderCode)} 
                    {/* {content('Người đặt', detailShowtime?.name)}  */}
                    {content('Ngày đặt vé', moment(detailShowtime?.createdAt).format('DD/MM/YYYY HH:mm'))} 
                    {content('Tên phim', detailShowtime?.filmName)} 
                    {content('Danh sách vé', detailShowtime?.chairTicket?.map((item, index) => (index == 0 ? item : `, ${item}`)))} 
                    {content('Mã suất chiếu', detailShowtime?.showTimeCode)} 
                </div>
                <div className={styles.column}>
                    {content('Thời gian chiếu', `${formatNumber(detailShowtime?.fromHour)} : ${formatNumber(detailShowtime?.fromMinus)} đến  ${formatNumber(detailShowtime?.toHour)} : ${formatNumber(detailShowtime?.toMinus)}`)}
                    {content('Danh sách combo', detailShowtime?.foodOrders?.map((item, index) => (index == 0 ? 
                        `${item?.name} (${item?.quantity})` : 
                        `, ${item?.name}(${item?.quantity})`)))} 
                    {content('Trạng thái giao dịch', detailShowtime?.statusOrder == '10' ? "Chưa thanh toán" : detailShowtime?.statusOrder == '20' ? "Thanh toán thất bại" : "Thành công")} 
                    {content('Trạng thái thanh toán', detailShowtime?.statusPayment == '10' ? "Chưa thanh toán" : detailShowtime?.statusPayment == '20' ? "Thanh toán thất bại" : "Thành công")} 
                    {content('Tổng tiền', `${convertStringToNumber((detailShowtime?.total ?? 0).toString())} VNĐ`)} 
                </div>
            </div>
            {
                detailShowtime?.statusPayment == "30" && 
                <>
                    <div className={styles.qrData}>
                        <QRCode style={{ maxHeight: "150px" }} value={typeof detailShowtime?.orderCode != 'undefined' ? detailShowtime?.orderCode : ""} />
                    </div>
                    <PDFDownloadLink document={<PDFFilesBusinessFee detailShowtime={detailShowtime}/>} fileName='VePhim' style={{ textDecoration: 'none' }}>
                        <div className={styles.exportFile}>
                            <div>
                                <IcExportFile />
                            </div>
                            <div className={styles.title}>Xuất file</div>
                        </div>
                    </PDFDownloadLink>
                </>
            }
        </div>    
    )
}
export default DetailBooking