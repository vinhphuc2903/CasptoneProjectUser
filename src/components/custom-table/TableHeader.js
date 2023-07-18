
import { Checkbox } from '@mui/material';
import React, { Fragment } from 'react';
import styles from "./CustomTable.module.scss";

function TableHeader (props) {
    const {
        headerColumn,
        dropdownColumn,
        checkBoxColumn,
        dataDefault,
        fieldName,
        fieldKey,
        onChangeHeader,
        isHaveHeader = true,
        isDropDown,
        isShowCheckBox,
        selectedCheckBox,
        data,
        componentHeadCell,
        borderTable = false
    } = props;
   
    const onSelectAllClick = (e) => {
        // e.stopPropagation();
        props.onSelectAllClick(e)
    }

    let isShowOptionHead = data.length > 0 && selectedCheckBox?.length > 0 ? true : false;
    let ComponentsHeadCell = componentHeadCell;

    let isShowCheckBoxColumn = isShowCheckBox && componentHeadCell != null;

    return (
        <div className={`${styles["TableHeader"]} _custom_scroll_header`} style={{ top: isHaveHeader ? 50 : 0 }}>
            <div className="d-flex w-100" style={{ borderTop: borderTable && '1px solid rgb(209 209 209 / 78%)' }}>
            {isDropDown &&
                <div className={`${styles["TableHeaderCell"]} ${styles["FilterColumn"]}`}
                    style={{ minWidth: dropdownColumn?.minWidth, maxWidth: dropdownColumn?.minWidth }}
                ></div>
            }
            {isShowCheckBoxColumn &&
                <div className={`${styles["TableHeaderCell"]} ${styles["FilterColumn"]}`}
                    style={{ minWidth: checkBoxColumn?.minWidth, maxWidth: checkBoxColumn?.minWidth }}>
                    <Checkbox
                        color="success"
                        indeterminate={
                            selectedCheckBox.length > 0 && selectedCheckBox.length < data.length
                        }
                        checked={data.length > 0 && selectedCheckBox?.length == data?.length}
                        onChange={(e) => {
                            e.stopPropagation()
                            onSelectAllClick(e)
                        }}
                        style={{
                            pointerEvents: 'auto'
                        }}
                    />
                </div>
            }
            {headerColumn.map((c, i) => {
                let stylesProps = {};
                if (c['maxWidth']) {
                    stylesProps['maxWidth'] = c["maxWidth"]
                }
                if (borderTable) {
                    stylesProps['borderRight'] = '1px solid rgb(209 209 209 / 78%)';
                }
                if (borderTable && i == 0) {
                    stylesProps['borderLeft'] = '1px solid rgb(209 209 209 / 78%)';
                }
                return <Fragment key={i}>
                    {
                        !isShowOptionHead ? (!c["isHidden"] && <div  className={`${styles["TableHeaderCell"]}`} style={{ color: 'black', minWidth: c["minWidth"], textAlign: c["align"], ...stylesProps }}>
                            <span className="text-truncate w-100">{c["label"]}</span>
                        </div>) : <div className={`${styles["TableHeaderCell"]}`} style={{ color: 'black', minWidth: c["minWidth"], textAlign: c["align"], ...stylesProps, position: 'relative' }}>
                            {
                                i == 0 &&
                                <div className={styles['option-checkBox']} >
                                    <span>Đã chọn tất cả {selectedCheckBox?.length ?? 0} dữ liệu trên trang này </span>
                                    {ComponentsHeadCell}
                                </div>
                            }
                        </div>
                    }
                </Fragment>
            })}
            </div>
        </div>
    )
}
export default TableHeader;
