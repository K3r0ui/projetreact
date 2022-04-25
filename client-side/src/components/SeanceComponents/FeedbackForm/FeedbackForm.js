
import { Form, Input, message, Button, Space,Radio } from 'antd';
import 'antd/dist/antd.css'; 
const FeedbackForm = (props) => {
    const [form] = Form.useForm();

  const onFinish = (values) => {
   
     props.finishFeedback(values.feedback,values.goal);
     form.resetFields();
     message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

    return ( <>

    
    <Form
    initialValues={props.initialValues}

      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >


        <Form.Item
        name="feedback"
        label="Feedback"
        rules={[{ required: true, message: 'Entrer le feedback' }]}
      >
        <Input.TextArea showCount maxLength={100} placeholder="Feedback" />
        
      </Form.Item>


      <Form.Item>
      <Form.Item  
      name="goal"
       label="Le but de la séance est atteint ?"
       rules={[{ required: true, message: 'le but !!' }]}>
        <Radio.Group  >
          <Radio value={true}>oui</Radio>
          <Radio value={false}>non</Radio>
       
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
    
     </>);
}
 
export default FeedbackForm;