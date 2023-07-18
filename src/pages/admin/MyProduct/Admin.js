import React from "react";
import styles from "../MyProduct/Admin.module.scss"
import MenuLeft from "../../../components/MenuLeft/MenuLeft";
import Product from "../../../components/Admin/Product/Product";
import AddProduct from "../../../components/Admin/AddProduct/AddProduct";
import Order from "../../../components/Admin/OrderAdmin/Order";
import { ToastContainer } from "react-toastify";
import useRouter from "../../../hooks/use-router";
import ListEmployee from "../../../components/Admin/Employee/EmployeeList/ListEmployee";
import NotFound from "../../404/NotFound"
import LoginAction from "../../../redux/login/action";
import { useDispatch } from "react-redux";

function Admin() {
    const [value, setValue] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const router = useRouter();
    const dispatch = useDispatch();

    const [ isAdmin, setIsAdmin ] = React.useState(true)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        router.push({
            params: {
                tp: newValue,
            }
        })
    };
    React.useEffect(() => {
        dispatch({
            type: LoginAction.ISADMIN,
            onError: (data) => {
                setIsAdmin(false)
            }
        })
    }, [])
    return (
        <div className={styles.admin}>
            <ToastContainer />
            {isAdmin ?
            <div>
            (
                <div className={styles.menuleft}>
                    <MenuLeft 
                        value={value} 
                        handleChange={handleChange} 
                        idx={index} 
                        setIndex={setIndex}/>
                </div>
                { (value === 0) && <Product setValue={handleChange}/>}
                { (value === 1) && <AddProduct setValues={handleChange}/>}
                { (value === 2 || value === 3 
                    || value === 4 || value === 5 ) && <Order />}
                {value === 6 && <ListEmployee />}
            )
            </div>
            : <NotFound />}
        </div>
    )
}
export default Admin;