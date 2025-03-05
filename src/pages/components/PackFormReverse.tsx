import { Input, Button, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "../../styles/orderForm.module.css";
import { PackageFormProps } from "../types";


export const PackageFormReverse = ({ pkg, onChange, onRemove, isNew = false }: PackageFormProps) => {
   return (
      <Form layout="vertical" className={`${styles.packageContainer} ${isNew ? styles.newPackage : styles.addedPackage}`} 
               onFinish={(e: { preventDefault: () => any; }) => e.preventDefault()} // Se evita el comportamiento por defecto
         >

            <Form.Item label="Peso" className={styles.span1}>
               <Input
                  type="number"
                  style={{width: "95px", height: "48px"}}
                  value={pkg.weight}
                  suffix="lb"
                  onChange={(e) => onChange("weight", Number(e.target.value))}
               />
            </Form.Item>
            <Form.Item label="Contenido" className={styles.span4}>
               <Input placeholder="Contenido" style={{width: "430px", height: "48px"}} value={pkg.content} onChange={(e) => onChange("content", e.target.value)} />
            </Form.Item>

            <div className={styles.inputGroup}>
               <Form.Item label="Largo " >
                  <Input
                     type="number"
                     className={styles.inputItemDimensions}
                     suffix="cm"
                     value={pkg.length}
                     onChange={(e) => onChange("length", Number(e.target.value))}
                  />
               </Form.Item>
               <Form.Item label="Alto " >
                  <Input
                     type="number"
                     className={styles.inputItemDimensions}
                     value={pkg.height}
                     suffix="cm"
                     onChange={(e) => onChange("height", Number(e.target.value))}
                  />
               </Form.Item>
               <Form.Item label="Ancho " >
                  <Input type="number"
                     className={styles.inputItemDimensions}
                     value={pkg.width}
                     suffix="cm"
                     onChange={(e) => onChange("width", Number(e.target.value))}
                  />
               </Form.Item>
            </div>


            <div className={styles.buttonContainer}>
               {isNew ? (
                  <Button type="dashed" icon={<PlusOutlined />} onClick={onRemove}>Agregar</Button>
               ) : (
                  <Button danger icon={<DeleteOutlined />} onClick={onRemove} />
               )}
            </div>
      </Form>
   );
};
