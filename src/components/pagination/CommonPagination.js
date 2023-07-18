import React, { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import Constants from '../../utils/Constants';
import queryString from 'query-string';
// import useRouter from 'hooks/use-routers';
import useRouter from '../../hooks/use-router';
import pick from 'lodash/pick';
import produce from 'immer';
import styles from './custom-pagination.module.scss';

export default function CustomPagination(props) {
  const { total, loading } = props;
  const [rowsPerPage, setRowsPerPage] = useState(
    Constants.PAGINATION.DEFAULT_PAGE_SIZE,
  );
  const [page, setPage] = useState(1);

  const router = useRouter();

  const replaceRouter = (params) => {
    router.replace(params);
  };

  const handleChangePage = (event, pageValue) => {
    setPage(pageValue);
    const params = {
      page: pageValue,
      offset: router.get('offset') ?? 50,
    };
    replaceRouter(params);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    // const params = produce(router.query, (draft) => {
    //   if (!!draft.page && draft.page > 1) {
    //     setPage(1);
    //     delete draft.page;
    //   }
    //   draft.offset = event.target.value;
    // });
    const params = {
      page: router.get('page') ?? 1,
      offset: event.target.value
    }
    replaceRouter(params);
  };

  const defaultLabelDisplayedRows = ({ from, to, count }) =>
    `${`Hiển thị từ ${from}`}–${to} trên tổng ${
      count !== -1 ? count : `${to}`
    }`;

  useEffect(() => {
    if (router.get('page') != null) {
      setPage(router.get('page'));
    }
    if (router.get('offset') != null) {
      setRowsPerPage(router.get('offset'));
    }
  }, []);

  return (
    <div
      className={`${styles.customPagination}`}
      style={{
        display: loading ? 'block' : 'flex',
        justifyContent: 'end',
        padding: '0px 10px',
        borderRadius: '3px',
        marginTop: '10px'
      }}
    >
        <>
          <TablePagination
            component="div"
            count={total}
            page={Number(page - 1)}
            rowsPerPageOptions={Constants.ShowPerPage.VALUE}
            sx={{
              '.MuiTablePagination-select': {
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: ' 0px 5px',
                gap: '3px',
                background: '#FFFFFF',
                border: '1px solid #707070',
                borderRadius: '3px',
              },
              '.MuiPagination-ul': {
                flexWrap: 'nowrap',
                display: 'flex',
                alignContent: 'center',
                '.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#138300',
                  '&:hover': {
                    backgroundColor: '#138300',
                  },
                },
                '.MuiPagination-text': {
                  padding: '0 4px',
                },
              },
            }}
            labelRowsPerPage="Hiển thị"
            labelDisplayedRows={defaultLabelDisplayedRows}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage || 0}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Pagination
            onChange={handleChangePage}
            color="success"
            shape="rounded"
            variant="outlined"
            sx={{
              
              '.MuiPagination-ul': {
                flexWrap: 'nowrap',
                '.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#138300',
                  '&:hover': {
                    backgroundColor: '#138300',
                  },
                },
                '.MuiPagination-text': {
                  padding: '0 4px',
                },
              },
            }}
            count={Math.ceil(total / rowsPerPage)}
            page={Number(page)}
          />
        </>
    </div>
  );
}
