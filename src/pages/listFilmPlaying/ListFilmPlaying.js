/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import styles from './ListFilmPlaying.module.scss'
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import useRouter from "../../hooks/use-router";
import { ToastContainer } from 'react-toastify';
import { MatNaQuy } from "../../assets/images";
import FilmHover from "../../components/FilmHover/FilmHover";
import FilmAction from "../../redux/film/action";
import { useSelector } from "react-redux";
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';

function ListFilmPlaying(props) 
{
    const router= useRouter()
    let params = { ...router.getAll() };

    const dispatch = useDispatch()
    const listFilm = useSelector((state) => state?.Film?.film);
    const getAllFilm = async() => {
        dispatch({
            type: FilmAction.GET_ALL_FILM,
            params: { status: params?.status },
            onSuccess: (data) => {
            },
        })
    }   

    useEffect(() => {
        getAllFilm()
    }, [params?.status])
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.listFilmPlaying}>
            <div className={styles.headerContent}>
                <Header />
                <div>
                    {/* <FilmItem /> */}
                </div>
                {listFilm?.length == 0 && 
                    <div
                        style={{
                            color: 'cornsilk',
                            fontSize: '30px',
                            display: "flex",
                            justifyContent: 'center',
                            marginTop: '50px',
                        }}
                    >
                        Không tìm thấy phim!
                    </div>
                }
                <div
                    className={styles.filmItem}
                >
                    {listFilm.map((item, index) => (
                        <FilmHover imageUrl={MatNaQuy} data={item} id={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListFilmPlaying

