
import { Card, Form, Button, message } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import styles from '../../styles/orderForm.module.css'
import { OrderData, Packages } from '../types';
import { useState } from 'react';
import { orderCreate } from '@/services/authServices';
import dayjs from 'dayjs';
import countryCodes from '@/utils/CountryCodes';
import { PersonalDataForm } from './PersonalDataForm';
import { PickAddres_PickDate } from './PickAddres_PickDate';
import { AddressPlacesDestination } from './AddressPlacesDestination';
import { ReferenceAndDirections } from './ReferenceAndDirections';
import { InputPhoneNumber } from './InputPhoneNumber';
import { PackageForm } from './PackageForm';
import { validateFields, validatePackages } from '@/utils/Helper';
import { PackageFormReverse } from './PackFormReverse';


const OrderForm = () => {
   const [currentStep, setCurrentStep] = useState(0);

   //Estado para almacenar los datos de la orden
   const [orderData, setOrderData] = useState<OrderData>({
      pickupAddress: "",
      scheduledDate: "",
      senderName: "",
      senderLastName: "",
      senderEmail: "",
      senderPhone: "",
      recipientAddress: "",
      department: "",
      municipality: "",
      referencePoint: "",
      instructions: "",
   });

   //Estado para codigo de países
   const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); //SV por defecto

   const [packages, setPackage] = useState<Packages[]>([]);
   const [currentPackage, setCurrentPackage] = useState<Packages>({
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      content: "",
   });

   const handleChange = (e: any) => {
      setOrderData({
         ...orderData,
         [e.target.name]: e.target.value,
      });
   };

   const handleDateChange = (date: dayjs.Dayjs | null) => {
      if(!date) return;

      const formattedDateString = date.format("YYYY-MM-DD");
      console.log(formattedDateString);
      setOrderData({
         ...orderData,
         scheduledDate: formattedDateString,
      });
   }

   const updatePackage = <K extends keyof Packages>(index: number, field: K, value: Packages[K]) => {
      const updatePackages = [...packages];
      updatePackages[index][field] = value;
      setPackage(updatePackages);
   }

   const onRemoveAdd = () => {
      setPackage([...packages, currentPackage]); // Agregar paquete a la lista
      setCurrentPackage({ length: 0, width: 0, height: 0, weight: 0, content: "" }); // Limpiar el formulario
   }

   const removePackage = (index: number) => {
      setPackage(packages.filter((_, i) => i !== index));
   }

   const handleSubmit = async () => {
      const payload = {...orderData, packages};
      console.log(payload);
      try{
         const response = await orderCreate(payload);
         console.log(response);
         message.success('Orden creada correctamente');
         setCurrentStep(0);
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
                        <Button
                              type="primary" 
                              className={ styles.primaryButton } 
                              onClick={ async () => {
                                 const { messageForm, isValid } = validateFields(orderData);
                                 if(!isValid){
                                    message.error(messageForm)
                                    return;
                                 }
                                 console.log(orderData)
                                 setCurrentStep(1);
                              }} >
                           <span style={{ marginInlineEnd: 'auto' }}>Siguiente</span><ArrowRightOutlined />
                        </Button>
                     </div>
               </Form>
            )}

            {currentStep === 1 && (
               <>
                  <h3>Agrega tus bultos</h3>
                  <PackageForm
                     pkg={currentPackage}
                     onChange={(field, value) => setCurrentPackage({ ...currentPackage, [field]: value })}
                     onRemove={onRemoveAdd}
                     isNew
                  />

                  {packages.length > 0 && (
                     <>
                        <h3>Paquetes agregados</h3>
                        {packages.map((pkg, index) => (
                           <PackageFormReverse
                              key={index}
                              pkg={pkg}
                              onChange={(field, value) => updatePackage(index, field, value)} 
                              onRemove={() => removePackage(index)} 
                              />
                        ))}
                     </>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                     <Button className={styles.backButton} type="primary" onClick={() => setCurrentStep(0)}>
                        <ArrowLeftOutlined /> Regresar
                     </Button>
                     <Button className={styles.primaryButton} type="primary" onClick={() => {

                           const { isValid, messageForm } = validatePackages(packages);
                           if (!isValid) {
                              message.error(messageForm);
                              return;
                           }
                           handleSubmit();
                        }}>

                        <span style={{ marginInlineEnd: 'auto' }}>Enviar</span><ArrowRightOutlined />
                     </Button>
                  </div>
               </>
            )}
         </Card>
      </div>
   );
};
export default OrderForm;