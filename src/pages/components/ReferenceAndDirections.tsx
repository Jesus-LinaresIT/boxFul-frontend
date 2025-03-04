import { Form, Input, Select,  } from 'antd'
import styles from '../../styles/orderForm.module.css'
import { PersonalDataFormProps } from '../types'


export const ReferenceAndDirections = ({ handleChange, orderData }: PersonalDataFormProps) => {
   return (
      <>
         <Form.Item label="Punto de Referencia" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese el punto de referencia' }]}>
            <Input className={styles.inpuntHeigh} name="referencePoint" value={orderData.referencePoint} onChange={handleChange} />
         </Form.Item>

         <Form.Item label="Indicaciones" className={styles.span3} rules={[{ required: true, message: 'Por favor ingrese las Indicaciones' }]}>
            <Input className={styles.inpuntHeigh} name="instructions" value={orderData.instructions} onChange={handleChange} />
         </Form.Item>
      </>
   )
}
