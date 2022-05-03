import { Result, Button } from 'antd';
import {  useNavigate  } from 'react-router-dom';
function Page404() {
   const navigate  = useNavigate();
   return (
   <Result
   status="404"
   title="404"
   subTitle="Sorry, the page you visited does not exist."
   extra={<Button onClick={ async() => navigate("/")} type="primary">Back Home</Button>}
 />
   )};

export default Page404;


