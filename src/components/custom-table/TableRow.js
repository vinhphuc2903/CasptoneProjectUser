import { Checkbox, Collapse, IconButton } from '@mui/material';
import styles from './CustomTable.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

const TableRow = (props) => {
    const {
        row,
        style,
        checkBoxColumn,
        dropdownColumn,
        handelClickRow,
        dataHead,
        isShowCheckBox,
        isItemSelected,
        index,
        isDropDown,
        ComponentDropDown,
        updateCollapse,
        collapseArr,
        rowHeight,
        childrenField = '',
        handleClickCheckBox,
        fieldId="Id",
        componentHeadCell,
        borderTable = false
    } = props;
    const [isCollapse, setIsCollapse] = useState(collapseArr[index]);
    const handleColapse = (e) => {
        e.stopPropagation();
        setIsCollapse(!isCollapse);
        updateCollapse(index, !isCollapse);
    };

    let isShowCheckBoxColumn = isShowCheckBox && componentHeadCell != null;

    const onHandleClickRow=(e, row)=>{
        e.stopPropagation();
        handelClickRow(e, row)
    }

    return (
        <div
            style={{
                ...style,
                borderBottomWidth: isCollapse ? 1 : 0,
                backgroundColor: isCollapse ? '#FBFAF4' : 'white',
            }}
            className={styles['TableRow']}
            // onClick={(e) => handelClickRow(e, row)}
        >
            <div className={`${styles['MainRow']}`} style={{ height: rowHeight }}>
                {isDropDown && (
                    <div
                        className={`${styles['TableCell']} ${styles['FilterColumn']}`}
                        style={{
                            minWidth: dropdownColumn?.minWidth,
                            maxWidth: dropdownColumn?.minWidth,
                        }}
                    >
                        <div>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={handleColapse}
                            >
                                {isCollapse ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </IconButton>
                        </div>
                    </div>
                )}
                {isShowCheckBoxColumn && (
                    <div
                        className={`${styles['TableCell']} ${styles['FilterColumn']}`}
                        style={{
                            minWidth: checkBoxColumn?.minWidth,
                            maxWidth: checkBoxColumn?.minWidth,
                        }}
                    >
                        <Checkbox
                            onClick={(event) => {
                                event.stopPropagation();
                                handleClickCheckBox(row[fieldId])
                            }}
                            color="success"
                            checked={isItemSelected}
                        />
                    </div>
                )}
                {dataHead.map((c, i) => {
                    let CustomComponent = c['component'];
                    let stylesProps = {};
                    if (c['maxWidth']) {
                        stylesProps['maxWidth'] = c['maxWidth'];
                    }

                    if(borderTable){
                        stylesProps['borderRight'] =  '1px solid rgb(209 209 209 / 78%)';
                    }
                    if(borderTable && i==0){
                        stylesProps['borderLeft'] =  '1px solid rgb(209 209 209 / 78%)';
                    }
                    return (
                        !c['isHidden'] && (
                            <div
                                key={i}
                                className={`${styles['TableCell']}`}
                                style={{
                                    minWidth: c['minWidth'],
                                    ...stylesProps,
                                    backgroundColor: isCollapse ? '#FBFAF4' : 'white',
                                }}                        
                            >
                                {CustomComponent ? (
                                    <div
                                        style={{
                                            justifyContent:
                                                c['align'] == 'left'
                                                    ? 'flex-start'
                                                    : c['align'] == 'right'
                                                        ? 'flex-end'
                                                        : 'center',
                                            alignItems: 'center',
                                        }}
                                        className="w-100 d-flex"
                                        onClick={(e) => c['isOnclick'] && onHandleClickRow(e,row)}
                                    >
                                        <CustomComponent
                                            data={row}
                                            dataId={row[c['field']]}
                                            children={row[c['field']]}
                                            fieldId="fieldId"
                                            stt={index}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="text-truncate w-100"
                                        style={{ textAlign: c['align'] }}
                                        title={row[c['field']]}
                                    >
                                        {row[c['field']]}
                                    </div>
                                )}
                            </div>
                        )
                    );
                })}
            </div>
            <Collapse in={isCollapse} timeout={0} unmountOnExit>
                <div className={`${styles['SubRow']}`}>
                    {row[childrenField]?.length > 0 ? (
                        <ComponentDropDown data={row} />
                    ) : (
                        <div style={{ margin: '15px 75px' }}>
                            Chưa có sản phẩm con
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    );
};

export default TableRow;
