import React from 'react';
import styles from './CustomTable.module.scss';
import { ImageEmpty } from '../../assets/images';

export default function EmptyTable() {
    return (
        <div className={styles.EmptyTable}>
            <img src={ImageEmpty} />
            <p className={styles.titleEmpty}>Không tìm thấy kết quả</p>
        </div>
    );
}
