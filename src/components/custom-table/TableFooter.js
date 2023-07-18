import React from 'react';
import styles from "./CustomTable.module.scss";

function TableFooter (props) {
    const { headerColumn, dropdownColumn, checkBoxColumn,dataDefault, fieldName, fieldKey, onChangeHeader ,isShowCheckBox ,isDropDown, componentHeadCell} = props
    let isShowCheckBoxColumn = isShowCheckBox && componentHeadCell != null;
    return (
        <div className={`${styles["TableFooter"]} _custom_scroll_footer`}>
            {isDropDown &&
                <div className={`${styles["TableHeaderCell"]} ${styles["FilterColumn"]}`}
                    style={{ minWidth: dropdownColumn?.minWidth, maxWidth: dropdownColumn?.minWidth }}
                >
                </div>
            }
            {isShowCheckBoxColumn &&
                <div className={`${styles["TableHeaderCell"]} ${styles["FilterColumn"]}`}
                    style={{ minWidth: checkBoxColumn?.minWidth, maxWidth: checkBoxColumn?.minWidth }}>
                </div>
            }
            {headerColumn.map((c, i) => {
                return !c["isHidden"] && <div key={i} className="text-truncate" style={{ color: 'black', flex: 1, minWidth: c["minWidth"], paddingLeft: 10, paddingRight: 10 }}>{c["label"]}</div>
            })}
        </div>
    )
}
export default TableFooter;