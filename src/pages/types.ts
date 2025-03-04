import { set } from 'react-hook-form';
export interface OrderData{
   pickupAddress: string;
   scheduledDate: string;
   name: string;
   lastName: string;
   email: string;
   phone: string;
   destinationAddress: string;
   department: string;
   municipality: string;
   referencePoint: string;
   instructions: string;
}

export interface Packages {
   length: number;
   width: number;
   height: number;
   weight: number;
   content: string;
}

export interface Country {
   code: string;
   name: string;
   flag: string;
 }

export interface PersonalDataFormProps {
   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleDateChange?: (date: any, dateString: string | string[]) => void;
   setOrderData?: React.Dispatch<React.SetStateAction<OrderData>>;
   setSelectedCountry?: React.Dispatch<React.SetStateAction<Country>>;
   selectedCountry?: Country;
   orderData: OrderData;
}
