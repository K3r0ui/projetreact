
import { Form, Input, message, Button, Space,Radio } from 'antd';
import 'antd/dist/antd.css'; 


const EventForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
       props.finish(values.name,values.description,values.etat);
       message.success('Submit success!');
    };
  
    const onFinishFailed = () => {
      message.error('Submit failed!');
    };
  
    
  
    return (
      <div class="container mt-5">
      <Form
      initialValues={props.initialValues}
  
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Nom de l'évènnement"
          rules={[
            {
              required: true,
              message: 'Entrer un lien exacte'
            },
           
            {
              type: 'string',
              min: 6,
            },
          ]}
        >
          <Input placeholder="Nom de l'évènnement" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Entrer une description' }]}
        >
          <Input.TextArea showCount maxLength={100} placeholder="Description" />
          
        </Form.Item>
        <Form.Item>
        <Form.Item
          name="etat"
          label="Etat"
          rules={[{ required: true, message: 'Entrer une description' }]}
        >
        <Radio.Group defaultValue={"public"} >
            <Radio value={"privé"}>privé</Radio>
            <Radio value={"public"}>public</Radio>
            
        </Radio.Group>
        </Form.Item>
        <center>
          <Space>
          
            <Button type="primary" class="btn btn-primary" htmlType="submit">
              Submit
            </Button>
            
          </Space>
          </center>
        </Form.Item>
      </Form>
      </div>
    );
  };
export default EventForm;