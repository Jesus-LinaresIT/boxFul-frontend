import { Form, Input, Select,  } from 'antd'
import styles from '../../styles/orderForm.module.css'
import { PersonalDataFormProps } from '../types'

const { Option } = Select;

export const AddressPlacesDestination = ({ handleChange, orderData, setOrderData }: PersonalDataFormProps) => {
   return (
      <>
         <Form.Item label="📍 Dirección del destinatario" className={styles.span2} rules={[{ required: true, message: 'Por favor ingrese la dirección del destinatario' }]}>
            <Input className={styles.inpuntHeigh} name="recipientAddress" value={orderData.recipientAddress} onChange={handleChange} />
         </Form.Item>

         <Form.Item label="Departamento" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese el Departamento' }]}>
            <Select className={styles.inpuntHeigh} value={orderData.department} onChange={(value) => setOrderData && setOrderData({ ...orderData, department: value })}>
               <Option value="San Salvador">San Salvador</Option>
               <Option value="La Libertad">La Libertad</Option>
            </Select>
         </Form.Item>

         <Form.Item label="Municipio" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese el Municipio' }]}>
            <Select className={styles.inpuntHeigh} value={orderData.municipality} onChange={(value) =>setOrderData && setOrderData({ ...orderData, municipality: value })}>
               <Option value="San Salvador">San Salvador</Option>
               <Option value="Antiguo Cuscatlán">Antiguo Cuscatlán</Option>
            </Select>
         </Form.Item>
      </>
   )
}
