
import { Form, Input, message, Button, Space } from 'antd';
import 'antd/dist/antd.css'; 
import {  useNavigate,} from "react-router-dom";
import { addDefi } from '../../../services/Defi.service';

  

const DefiForm = () => {
const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    message.success('Submit success!');
    console.log('Received values of form: ', values);
    addDefi(values.description,values.lien);
    navigate('/defis');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  

  return (
    <div class="container mt-5">
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="lien"
        label="URL"
        rules={[
          {
            required: true,
            message: 'Entrer un lien exacte'
          },
          {
            type: 'url',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 6,
          },
        ]}
      >
        <Input placeholder="Lien de vidéo" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Entrer une description' }]}
      >
        <Input.TextArea showCount maxLength={100} placeholder="Description" />
        
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
         
        </Space>
      </Form.Item>
    

    </Form>
    </div>
  );
};

export default DefiForm;
