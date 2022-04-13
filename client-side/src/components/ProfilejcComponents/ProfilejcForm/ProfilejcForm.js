import { Form, Input } from 'antd';
import 'antd/dist/antd.css';

const ProfilejcForm = (props) => {
   const [form] = Form.useForm();

   return (
      <div class='container mt-5'>
         <Form
            initialValues={props.initialValues}
            form={form}
            layout='vertical'
            autoComplete='off'>
            <Form.Item>
               <label for='firstname'>First Name</label>
               <Input value='najib' disabled />
               <label for='lastName'>Last Name</label>
               <Input value='Belhadj' disabled />
               <label for='Email'>Email</label>
               <Input value='najibelhadj11@gmail.com' disabled />
               <label for='job'>job</label>
               <Input value='Etudiant' disabled />
               <label for='orientation'>Orientation</label>
               <Input value='droitier' disabled />
               <label for='competences'>competences</label>
               <Input value='Kafez bezena' disabled />
               <label for='statistiques'>statistiques</label>
               <Input value='90%' disabled />
               <label for='taille'>taille</label>
               <Input value='188.8' disabled />
               <label for='sexe'>Sexe</label>
               <Input value='Homme' disabled />
               <label for='ville'>ville</label>
               <Input value='Manouba' disabled />
            </Form.Item>
         </Form>
      </div>
   );
};
export default ProfilejcForm;
