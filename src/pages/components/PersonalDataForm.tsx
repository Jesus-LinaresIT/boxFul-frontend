import { Form, Input } from 'antd'
import styles from '../../styles/orderForm.module.css'
import { PersonalDataFormProps } from '../types'


export const PersonalDataForm = ({ handleChange, orderData }: PersonalDataFormProps) => {
   return (
      <>
         <Form.Item label="Nombres" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese sus Nombres' }]}>
            <Input className={styles.inpuntHeigh} name='senderName' value={orderData.senderName} onChange={handleChange} />
         </Form.Item>
         <Form.Item label="Apellidos" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese sus Apellidos' }]}>
            <Input className={styles.inpuntHeigh} name='senderLastName' value={orderData.senderLastName} onChange={handleChange} />
         </Form.Item>
         <Form.Item label="Correo electronico" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese el correo electronico' }]}>
            <Input className={styles.inpuntHeigh} name='senderEmail' value={orderData.senderEmail} onChange={handleChange} />
         </Form.Item>
      </>
   )
}
