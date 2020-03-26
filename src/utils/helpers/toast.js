import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function toastMessage(message) {
  toast(message);
}

export default toastMessage;
