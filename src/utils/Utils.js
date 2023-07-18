import EventRegister,{ EVENT_SHOW_POPUP, 
    FIRST_POPUP, 
    POPUP_TEXT_TYPE ,
    EVENT_SHOW_POPUP2, 
    EVENT_SHOW_POPUP_CANCEL_POST, 
    EVENT_SHOW_POPUP_DELETE,
    EVENT_SHOW_POPUP_ACCEPT,
    EVENT_SHOW_POPUP_COMMENT,
    EVENT_SHOW_POPUP_LOCK_ACCOUNT,
} 
from './EventRegister';
import { ToastContainer, toast } from 'react-toastify';
export default class Utils {
    static showSuccessToast(option) {
        toast(option?.message, {
          type: 'success',
          autoClose: 3000,
          theme: 'colored',
          ...option,
        })
      }
    
      static showErrorToast(option) {
        toast(option?.message, {
          type: 'error',
          autoClose: 3000,
          theme: 'colored',
          ...option,
        })
      }
}