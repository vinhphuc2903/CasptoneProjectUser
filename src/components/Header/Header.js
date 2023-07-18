/* eslint-disable jsx-a11y/alt-text */
import { IconButton } from "@mui/material";
import React from "react";
import { IconSearch, IconUser, IconShop } from "../../assets/icons/list-Icon";
import { ScShop } from "../../assets/images";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import useRouter from "../../hooks/use-router";
import * as RouterPath from '../../router/RouterPath'
import { ImageHeader } from "../../assets/images";
import ResponsiveAppBar from "./common/HeaderMui/HeaderMui";
import MenuMain from "./common/Menu/MenuMain";

const Header = (props) => {
    const { onchange, 
        onChangeSearch = () => {}
    } = props;
    const [ isLogin, setIsLogin ] = React.useState(false);
    const router = useRouter();
    const [valueInput, setValueInput] = React.useState('');
    return (
        <div style={{ minWidth:'100%' }}>
            <ResponsiveAppBar isLogin={isLogin} />
            <MenuMain />
        </div>
    )
}

export default Header