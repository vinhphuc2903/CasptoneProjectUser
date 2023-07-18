import * as React from 'react';
import Button from '@mui/material/Button';
import styles from './FilmHover.module.scss';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useRouter from '../../hooks/use-router';
import * as RouterPath from "../../router/RouterPath"
import { AES } from 'crypto-js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    height: "60%",
    padding: 0,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FilmHover(props) {
    const { imageUrl, id, data } = props
    const router = useRouter();
    const itemContent = (content) => {
        return (
            <div
                style={{
                    backgroundColor: '#dc5c5c',
                    color: 'white',
                    padding: '4px 6px',
                    borderRadius: '5px'
                }}
            >
                {content}
            </div>    
        )
    }
    const [ open, setOpen ] = React.useState(false);
    const handleOnClick = (event) => {
        event.preventDefault()
        setOpen(!open)
    }
    return (
        <div 
            style={{ display: 'flex', justifyContent: 'center',flexBasis: '25%' }}
        >
             <Modal
                open={open}
                onClose={handleOnClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{padding: 0}}
            >
                <div style={style} padding={0} >
                    <iframe width="100%" height="100%" src={data?.trailerLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                
                </div>
            </Modal>
            <PopupState variant="popper" popupId="demo-popup-popper" sx={{ position: 'relative', zIndex: 5, pointerEvents: 'none', minWidth: '400px' }}>
            {(popupState) => (
                    <div  
                        variant="contained" {...bindToggle(popupState)}
                        style={{ maxWidth: '260px', margin: '0px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
                        onMouseEnter={popupState.open} 
                        onMouseLeave={popupState.close}     
                    >
                        <div style={{ border: '3px solid hsl(27deg 41% 75%)', position: 'relative', minWidth: '260px', minHeight: '400px' }}>
                            <img src={data?.backgroundImage} width = '100%' />
                        </div>
                        <div
                            style={{
                                fontSize: '22px', 
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontWeight: 500,
                                fontFamily: 'emoji',
                                color: 'white',
                                width: 'fit-content',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                webkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                            }}
                        >
                            {data?.name}
                        </div>
                        <div
                            style={{
                                color: '#dc7f35',
                            }}
                        >
                            {data?.listTypeFilm?.map((item, index) => {
                                if( index == 0)
                                {
                                    return `${item}`
                                } else return `, ${item}`                 
                            })}
                        </div>
                        <Popper 
                            {...bindPopper(popupState)} 
                            transition
                            placement={'right'}
                            className={styles.popperData}
                        >
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper
                                    sx={{ backgroundColor: '#f0f8ffd4'}}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: "column",
                                            maxWidth: '400px',
                                            minWidth: '400px',
                                            margin: '20px',
                                            paddingBottom: '10px',
                                            gap: '10px',
                                            
                                        }}
                                    >
                                        <div style={{ 
                                            fontSize: '20px', 
                                            // textDecoration: 'line-through',
                                            width: 'fit-content',
                                            borderBottom: '3px solid #dc5c5c'
                                        }}>
                                            {data?.name}
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: '10px'
                                            }}
                                        >
                                            {itemContent("2D")}
                                            {itemContent(`C${data?.ageLimit}`)}
                                        </div>
                                        <div>
                                            {data?.listTypeFilm?.map((item, index) => {
                                                if( index == 0)
                                                {
                                                    return `${item}`
                                                } else return `, ${item}`                 
                                            })}
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: '#bb2c2c',
                                                        fontWeight: '500',
                                                        paddingRight: '5px'
                                                    }}
                                                >
                                                    Đạo Diễn:
                                                </div>
                                                <div>
                                                    {data?.director}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: '#bb2c2c',
                                                        fontWeight: '500',
                                                        paddingRight: '5px'
                                                    }}
                                                >
                                                    Diễn Viên: 
                                                </div>
                                                <div>
                                                    {data?.actor}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: '#bb2c2c',
                                                        fontWeight: '500',
                                                        paddingRight: '5px'
                                                    }}
                                                >
                                                    Thời gian: 
                                                </div>
                                                <div>
                                                   {`${Math.floor(data?.time / 60)} giờ ${data?.time % 60} phút`}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Button onClick={handleOnClick}>Trailer</Button>
                                            <Button onClick={() => {
                                                    router.push({
                                                        pathname: RouterPath.DETAIL_FILM,
                                                        params: {
                                                            idx: AES.encrypt(data?.id?.toString(), 'idx').toString()
                                                        }
                                                    })
                                                }}
                                            >Chi tiết</Button>
                                        </div>
                                        <div
                                            style={{
                                                borderTop: '1px dotted rgb(162, 149, 149)',
                                                paddingTop: '10px',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                maxHeight: '70px',
                                                
                                            }}
                                        >
                                            {data?.introduce}
                                        </div>
                                    </div>
                                </Paper>
                            </Fade>
                            )}
                        </Popper>
                    </div>
            )}
            </PopupState>
        </div>
    );
}