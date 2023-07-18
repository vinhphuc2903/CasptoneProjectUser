import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet ,Font, Image} from '@react-pdf/renderer';
import RobotoRegular from "./fonts/Roboto-Regular.ttf"
import RobotoBold from "./fonts/Roboto-Bold.ttf"
import RobotoItalic from "./fonts/Roboto-Italic.ttf"
import convertStringToNumber from "lib-pbl6";
import moment from "moment";
// import QRCode from 'react-qr-code';
import QRCode from 'qrcode';

function formatNumber(num = 0) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num.toLocaleString();
    }
} 

export default function PDFFilesBusinessFee(props) {
    const { detailShowtime } = props
    Font.register({
        family: 'Roboto',
        fonts: [
            {
                src: RobotoRegular,
                fontWeight: 'normal',
            },
            {
                src: RobotoBold,
                fontWeight: 'bold',
            },
            {
                src: RobotoItalic,
                fontStyle : 'italic'
            },
        ],
    });
    const qrCodeData = typeof detailShowtime?.orderCode != 'undefined' ? detailShowtime?.orderCode : ""
    const [qrCodeImage, setQrCodeImage] = useState('');

    useEffect(() => {
        const generateQRCode = async () => {
          try {
            const url = await QRCode.toDataURL(qrCodeData, { width: 200 });
            setQrCodeImage(url);
          } catch (error) {
            console.error('Error generating QR code:', error);
          }
        };
    
        generateQRCode();
      }, []);
    
    return(
        <Document>
            <Page style={styles.Container} size="A4" >
                <View wrap={false}>
                    <Text style={styles.Title}>
                        THÔNG TIN CHI TIẾT VÉ
                    </Text>
                    <View style={styles.Content}>
                        <View style={styles.RowSum}>
                            <View style={styles.Row}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 80}]}>Mã giao dịch</Text>
                                    <Text style={styles.Text2}>: </Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>{detailShowtime?.orderCode}</Text>
                            </View>
                                <View style={[styles.Row,{marginLeft : 8}]}>
                                    <View style={styles.RowBold}>
                                        <Text style={[styles.Text2,styles.TextBold,{width : 130}]}>Danh sách combo</Text>
                                        <Text style={styles.Text2}>:</Text>
                                    </View>
                                    <View style={[styles.Text2, { diplay: 'flex', flexDirection: 'column', width: 200, paddingLeft: 3 }]}>
                                        {detailShowtime?.foodOrders?.map((item, index) =>
                                        <Text>{item?.name}: {item?.quantity}</Text>)}
                                    </View>
                                </View>
                            </View>
                        <View style={styles.RowSum}>
                            <View style={styles.Row}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 80}]}>Ngày đặt vé</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>
                                    {moment(detailShowtime?.createdAt).format('DD/MM/YYYY HH:mm')}
                                </Text>
                            </View>
                            <View style={[styles.Row,{marginLeft : 8}]}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 130}]}>Trạng thái giao dịch</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>
                                    {detailShowtime?.statusOrder == '10' ? "Chưa thanh toán" : detailShowtime?.statusOrder == '20' ? "Thanh toán thất bại" : "Thành công"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.RowSum}>
                            <View style={styles.Row}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 80}]}>Tên phim</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>{detailShowtime?.filmName}</Text>
                            </View>
                            <View style={[styles.Row,{marginLeft : 8}]}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 130}]}>Trạng thái thanh toán</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>
                                    {detailShowtime?.statusPayment == '10' ? "Chưa thanh toán" : detailShowtime?.statusPayment == '20' ? "Thanh toán thất bại" : "Thành công"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.RowSum}>
                            <View style={styles.Row}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 80}]}>Suất chiếu</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>
                                    {detailShowtime?.showTimeCode}
                                </Text>
                            </View>
                            <View style={[styles.Row,{marginLeft : 8}]}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 130}]}>Thời gian chiếu</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>
                                    { `${formatNumber(detailShowtime?.fromHour)} : ${formatNumber(detailShowtime?.fromMinus)} đến  ${formatNumber(detailShowtime?.toHour)} : ${formatNumber(detailShowtime?.toMinus)}`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.RowSum}>
                            <View style={styles.Row}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 80}]}>Danh sách vé</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>
                                    {detailShowtime?.chairTicket?.map((item, index) => (index == 0 ? item : `, ${item}`))}
                                </Text>
                            </View>
                            <View style={[styles.Row,{marginLeft : 8}]}>
                                <View style={styles.RowBold}>
                                    <Text style={[styles.Text2,styles.TextBold,{width : 130}]}>Tổng tiền</Text>
                                    <Text style={styles.Text2}>:</Text>
                                </View>
                                <Text style={[styles.Text2, { width: 200, paddingLeft: 3 }]}>
                                    {`${convertStringToNumber((detailShowtime?.total ?? 0).toString())} VNĐ`}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.AddressCreate}>
                        {qrCodeImage && (
                            <Image height={150} style={styles.qrCode} src={qrCodeImage} />
                        )}

                        {/* <Text style={[styles.Text2,styles.TextItalic]}> */}
                           
                            {/* <QRCode height={10000} style={{ maxHeight: "150px" }} value={typeof detailShowtime?.orderCode != 'undefined' ? detailShowtime?.orderCode : ""} /> */}
                        {/* </Text> */}
                    </View>
                </View>
            </Page>
        </Document>
    )

}
const styles = StyleSheet.create({
    Center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    UpperCase: {
        textTransform: 'uppercase'
    },
    Container: {
        padding: 24
    },
    Header: {
        flexDirection: 'column',
        gap: 4
    },
    HeaderBold: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 500
    },
    HeaderItalic: {
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    Text1: {
        fontSize: 14,
        fontFamily: 'Roboto',
    },
    TextBold: {
        fontWeight: 'bold',
    },
    Text2: {
        fontSize: 12,
        fontFamily: 'Roboto'
    },
    Text3: {
        fontSize: 10,
        fontFamily: 'Roboto'
    },
    TextItalic: {
        fontStyle: 'italic'
    },
    Title: {
        flexDirection: 'row',
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 20,
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    Content: {
        flexDirection: 'column',
        gap: 12
    },
    Row: {
        flexDirection: 'row',
    },
    RowBold: {
        flexDirection: 'row',
        gap: 4
    },
    RowSum: {
        flexDirection: 'row',
    },
    Table: {
        marginTop: 12,
        marginBottom: 12
    },
    TableHeader: {
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: 1,
        borderRight: 1,
        borderColor: '#D8D7D7',
    },
    TableBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: 1,
        borderRight: 1,
        borderColor: '#D8D7D7',
    },
    TableFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRight: 1,
        borderColor: '#D8D7D7',
    },
    BorderTable: {
        borderLeftWidth: 1,
        borderLeftColor: '#D8D7D7',
        paddingTop: 6,
        paddingBottom: 6,

    },
    BorderTableContent: {
        borderLeftWidth: 1,
        borderLeftColor: '#D8D7D7',
        paddingTop: 10,
        paddingBottom: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BorderTableContentLeft: {
        borderLeftWidth: 1,
        borderLeftColor: '#D8D7D7',
        paddingTop: 10,
        paddingBottom: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'left',
    },
    Cost: {
        flexDirection: 'column',
        gap: 12,
        marginBottom: 20
    },
    rowMix: {
        flexDirection: 'row'
    },
    AddressCreate: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 12,
        maxHeight: "150px"
    },
    WrapSignature : {
        flexDirection : 'column',
        gap : 74,
    },
    Signature: {
        flexDirection: 'row',
        gap: 8,
    },
    RowSinature: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 103,
        gap: 4,
    },
})