import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
//读取local中保存的user
const user = storageUtils.getUser();
//读取local中user保存到内存中
memoryUtils.user = user;
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
// ReactDOM.render(<Mytest></Mytest>,document.getElementById('root'))