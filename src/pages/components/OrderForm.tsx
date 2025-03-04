
import { Card, Form, Input, Button, Select, DatePicker, message } from 'antd';
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from '../../styles/orderForm.module.css'
import { OrderData, Packages } from '../types';
import { useState } from 'react';
import { orderCreate } from '@/services/authServices';
import countryCodes from '@/utils/CountryCodes';
import { PersonalDataForm } from './PersonalDataForm';
import { PickAddres_PickDate } from './PickAddres_PickDate';
import { AddressPlacesDestination } from './AddressPlacesDestination';
import { ReferenceAndDirections } from './ReferenceAndDirections';
import { InputPhoneNumber } from './InputPhoneNumber';

const { Option } = Select;

const OrderForm = () => {
   const [currentStep, setCurrentStep] = useState(0);

   //Estado para almacenar los datos de la orden
   const [orderData, setOrderData] = useState<OrderData>({
      pickupAddress: "",
      scheduledDate: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      destinationAddress: "",
      department: "",
      municipality: "",
      referencePoint: "",
      instructions: "",
   });

   //Estado para codigo de países
   const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); //SV por defecto

   const [packages, setPackage] = useState<Packages[]>([]);

   const handleChange = (e: any) => {
      setOrderData({
         ...orderData,
         [e.target.name]: e.target.value,
      });
   };

   const handleDateChange = (dateString: string | string[]) => {
      const formattedDateString = Array.isArray(dateString) ? dateString[0] : dateString;
      setOrderData({
         ...orderData,
         scheduledDate: formattedDateString,
      });
   }

   const addPackage = () => {
      setPackage([...packages, {
         length: 0,
         width: 0,
         height: 0,
         weight: 0,
         content: "",
      }]);
   }

   const updatePackage = <K extends keyof Packages>(index: number, field: K, value: Packages[K]) => {
      const updatePackages = [...packages];
      updatePackages[index][field] = value;
      setPackage(updatePackages);
   }

   const removePackage = (index: number) => {
      setPackage(packages.filter((_, i) => i !== index));
   }

   const handleSubmit = async () => {
      const payload = {...orderData, packages};
      try{
         const response = await orderCreate(payload);
         console.log(response);
         message.success('Orden creada correctamente');

      }catch(error){
         console.error(error);
         message.error('Error al crear la orden');
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.containerHeader}>
            <h2 className={styles.title}>Crea una orden</h2>
            <p className={styles.subtitle}>
               Dale una ventaja competitiva a tu negocio con entregas el <b>mismo día </b>
               (Área Metropolitana) y <b>el día siguiente </b> a nivel nacional.
            </p>
         </div>

         <Card className={styles.card}>
            {currentStep === 0 && (
               <Form layout="vertical" className={styles.formGrid}>
                     <PickAddres_PickDate handleChange={handleChange} handleDateChange={handleDateChange} orderData={orderData} />

                     <PersonalDataForm handleChange={handleChange} orderData={orderData} />

                     <InputPhoneNumber handleChange={handleChange} orderData={orderData} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>

                     <AddressPlacesDestination handleChange={handleChange} orderData={orderData} setOrderData={setOrderData} />

                     <ReferenceAndDirections handleChange={handleChange} orderData={orderData} />

                     <div className={`${styles.buttonContainer} ${styles.span3}`}>
                        <Button  type="primary" className={ styles.primaryButton } onClick={() => setCurrentStep(1)} >
                           <span style={{ marginInlineEnd: 'auto' }}>Siguiente</span><ArrowRightOutlined />
                        </Button>
                     </div>

               </Form>
            )}
         </Card>
      </div>
   )
}

export default OrderForm;