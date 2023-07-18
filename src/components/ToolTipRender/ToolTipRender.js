import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import styles from './TooltipRender.module.scss'
import IconDown from "../../assets/icons/icon-down";
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popover from '@material-ui/core/Popover'
import Popper from "@mui/material/Popper";
import { List, ListItem } from "@material-ui/core";
import useRouter from "../../hooks/use-router";
import useQuery from "../../hooks/use-query";

const StyledMenu = styled((props) => (
    <Popover
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

function ToolTipRender(props){
	const { optionName, optionId, listData, onchange } = props
  const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      listData.length === 0 &&  handleClose(optionId, optionName)
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (item, name) => {
      if (item !== null && typeof item !== 'undefined' && item > 0)
      {
        router.push({
          pathname: '/category',
          params: {
              cate: item,
              nCt: name,
          }
        })
        if( typeof onchange !== 'undefined')
        {
          onchange(item)
        }
      }
      setAnchorEl(null);
    };
    return (
        <div>
            <Button
                // id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                style={{
                  color: 'white',
                  backgroundColor: 'black',
                  // maxWidth: '100px',
                  maxHeight: '40px'
                }}
                onClick={handleClick}
                endIcon={listData.length !== 0 ? 
                    <KeyboardArrowDownIcon /> 
                  : null}
            >
                {optionName}
            </Button>
            <StyledMenu
                // id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={
                  listData.length !== 0 &&  open
                }
                onClick ={(e) =>
                {
                  // listData.length === 0 &&  handleClose(optionId, optionName)
                }}
                onClose={handleClose}
                disableScrollLock={true}
            >
					{listData.map(item => {
            return (
                <MenuItem 
                  key={item?.data?.id}
                  onClick ={(e) => handleClose(item?.data?.id, item?.data?.name)}
                  // onClick={handleClose(item)} 
                  style={{
                    color: 'white',
                    backgroundColor: 'black'
                  }}
                  // disableRipple
                >
                  {item?.data?.name}
                </MenuItem>
              )
            }	
					)}
						{/* <MenuItem onClick={handleClose} disableRipple>
							Laptop Acer
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							Laptop Asus
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							Laptop Dell
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							Laptop Lenovo
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							Laptop HP
						</MenuItem> */}
                </StyledMenu>
      </div>
    )    
}
export default ToolTipRender