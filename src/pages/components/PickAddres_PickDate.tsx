import { Form, Input,DatePicker } from 'antd'
import styles from '../../styles/orderForm.module.css'
import { CalendarOutlined } from "@ant-design/icons";
import { PersonalDataFormProps } from '../types'

export const PickAddres_PickDate = ({handleChange, handleDateChange, orderData}: PersonalDataFormProps)  => {
   return (
      <>
         <Form.Item label="📍 Direccion de recoleccion" className={styles.span2} rules={[{ required: true, message: 'Por favor ingrese la direccion de recoleccion' }]}>
            <Input
               className={styles.inpuntHeigh} name="pickupAddress"
               value={orderData.pickupAddress}
               onChange={handleChange}
         />
         </Form.Item>
         <Form.Item label="Fecha Programada" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese la fecha Programada' }]}>
            <div className={styles.datePickerContainer}>
               <div className={styles.dateIcon}>
                  <CalendarOutlined style={{ fontSize: "16px", color: "#6c757d" }} />
               </div>
               <DatePicker className={styles.customDatePicker} onChange={handleDateChange} suffixIcon={null} placeholder='' />
            </div>
         </Form.Item>
      </>
   )
}
