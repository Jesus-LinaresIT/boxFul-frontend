import { Form, Input, Select } from 'antd'
import styles from '../../styles/orderForm.module.css'
import { PersonalDataFormProps } from '../types'
import countryCodes from '@/utils/CountryCodes';


export const InputPhoneNumber = ({ orderData, handleChange, selectedCountry, setSelectedCountry }: PersonalDataFormProps) => {

   return (
      <>
         <Form.Item label="Teléfono" className={styles.span1} rules={[{ required: true, message: 'Por favor ingrese el Teléfono' }]}>
            <div className={styles.phoneInputContainer}>
               <Select
                  variant='borderless'
                  className={styles.countrySelect} 
                  value={selectedCountry?.code || ''}
                  onChange={(value) => setSelectedCountry && setSelectedCountry(countryCodes.find((country) => country.code === value) || countryCodes[0])}
               >
                     {countryCodes.map((country) => (
                        <Select.Option key={country.code} value={country.code}>
                           {country.code}
                        </Select.Option>
                     ))}
               </Select>
               <Input className={styles.phoneInput} name="phone" value={orderData.phone} onChange={handleChange} />
            </div>
         </Form.Item>
      </>
   )
}
