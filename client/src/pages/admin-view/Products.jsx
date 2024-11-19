import  {useState, Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetTitle , Sheet } from '@/components/ui/sheet'
import CommonForm from '@/components/common/CommonForm'
import { addProductFormElements } from '@/config'

const initialeFormData = {
  image : null,
  title: '',
  description:'',
  category:'',
  brand:'',
  price:'',
  salePrice:'',
  totalStock:''
} 

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialeFormData)

  const onSubmit = ()=>{

  }
  return (
     <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add new Product</Button>
      </div>
      <div className='grid gap4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
          setOpenCreateProductsDialog(false)
        }}>
          <SheetContent side='right' className='overflow-hidden'>
            <SheetTitle>Add New Product</SheetTitle>
          <div className='py-6'>
            <CommonForm 
             formControls={addProductFormElements}
             formData={formData}
             setFormData={setFormData}
             buttonText="Add"
             onsubmit={onsubmit}
            />            
          </div>
          </SheetContent>
        </Sheet>
      </div>
     </Fragment>
  )
}

export default AdminProducts