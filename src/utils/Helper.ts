import { OrderData, Packages } from "@/pages/types";

export const validateFields = (orderData:OrderData) => {
   const requiredFields = [
      orderData.pickupAddress,
      orderData.scheduledDate,
      orderData.senderName,
      orderData.senderLastName,
      orderData.senderEmail,
      orderData.senderPhone,
      orderData.recipientAddress,
      orderData.department,
      orderData.municipality,
      orderData.referencePoint,
      orderData.instructions,
   ];

   // Validar campos vacíos
   const allFieldsFilled = requiredFields.every((field) => {
      if (typeof field === "string") {
         return field.trim() !== "";
      }
      return Boolean(field);
   });

   // Expresión regular para validar email
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const isEmailValid = emailRegex.test(orderData.senderEmail);

   if (!isEmailValid) {
      return { isValid: false, messageForm: "El correo electrónico no es válido." };
   }

   if (!allFieldsFilled) {
      return { isValid: false, messageForm: "Todos los campos son obligatorios." };
   }

   return { isValid: true, messageForm: "" };
};

export const validatePackages = (packages: Packages[]) => {
   if (packages.length === 0) {
      return { isValid: false, messageForm: "Debes agregar al menos un paquete." };
   }

   for (const pkg of packages) {
      if (!pkg.length || !pkg.height || !pkg.width || !pkg.weight || !pkg.content.trim()) {
         return { isValid: false, messageForm: "Todos los campos de los paquetes son obligatorios." };
      }
   }

   return { isValid: true, messageForm: "" };
};

