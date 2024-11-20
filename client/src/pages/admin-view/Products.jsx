import { useState, Fragment, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetTitle, Sheet } from '@/components/ui/sheet'
import CommonForm from '@/components/common/CommonForm'
import { addProductFormElements } from '@/config'
import ImageUpload from '@/components/admin-view/ImageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, fetchAllProducts } from '@/store/admin/products-slice'
import { DiscAlbum } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const initialeFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialeFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)

  const {products} = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()
  const {toast} = useToast()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addNewProduct({...formData,image:uploadedImageUrl})).then(data =>{
      console.log(data)
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false)
        setImageFile(null)
        setFormData(initialeFormData)
        toast({
          title : "Product Added Successfully"
        })
      }
    })

  }

  console.log(products,uploadedImageUrl)

  useEffect(()=>{
     dispatch(fetchAllProducts())
  },[dispatch])

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add new Product</Button>
      </div>
      <div className='grid gap4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openCreateProductsDialog} onOpenChange={() => {
          setOpenCreateProductsDialog(false)
        }}>
          <SheetContent side='right' className='overflow-hidden overflow-y-scroll'>
            <SheetTitle>Add New Product</SheetTitle>
            <ImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} 
            imageLoadingState={imageLoadingState}
    
            />
            <div className='py-6'>
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText="Add"
                onsubmit={onSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  )
}

export default AdminProducts