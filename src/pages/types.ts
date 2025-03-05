import { set } from 'react-hook-form';
export interface OrderData{
   pickupAddress: string;
   scheduledDate: string;
   senderName: string;
   senderLastName: string;
   senderEmail: string;
   senderPhone: string;
   recipientAddress: string;
   department: string;
   municipality: string;
   referencePoint: string;
   instructions: string;
   packages?: Packages;
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

export interface PackageFormProps {
   pkg: Packages;
   onChange: (field: keyof Packages, value: any) => void;
   onRemove?: () => void;
   isNew?: boolean;
}
