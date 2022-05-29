import React, { useEffect, useState } from 'react'
import { getAllDiscipline } from '../../services/discipline.service';
import { addDisciplineCoach } from '../../services/profile.service'
import "antd/dist/antd.css";
import { Form, Select, Button } from "antd";

const { Option } = Select;

function EquipePage() {
    const [data, setdata] = useState([])
    function handleChange(value) {
        console.log(`Selected: ${value}`);
      }
    useEffect(() => {
       const  fetchdata = async() => {
            const dd = await getAllDiscipline();
            if ( dd){
                console.log("disc",dd);
                setdata(dd);

            }
        };
        fetchdata();
    }, [])
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    
    
      const onFinish = (values) => {
        console.log("Received values of form: ", values);
        console.log("VALUE1",values.select)
         addDisciplineCoach(values.select);
         localStorage.setItem('firstAuth', false);
         window.location = '/';
      };
    if(localStorage.getItem('firstAuth') === 'true'){
  return (<>
  <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        "input-number": 3,
        "checkbox-group": ["A", "B"],
        rate: 3.5
      }}
    >
      <Form.Item
        name="select"
        label="Select"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select your country!"
          }
        ]}
      >
  <Select
    placeholder="Please select your Displine"
    onChange={handleChange}
    style={{ width: '100%' }}
  >
        {data.map(x => (
          <Option key={x._id}>{x.description}</Option>
        ))}
  </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

      </>
    
  )
}else{
  return (
    window.location = '/'
    )}
}

export default EquipePage