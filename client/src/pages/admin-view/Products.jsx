import { useState, Fragment, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetTitle, Sheet } from '@/components/ui/sheet'
import CommonForm from '@/components/common/CommonForm'
import { addProductFormElements } from '@/config'
import ImageUpload from '@/components/admin-view/ImageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, editAProduct, fetchAllProducts } from '@/store/admin/products-slice'
import { useToast } from '@/hooks/use-toast'
import AdminProductsTile from '@/components/admin-view/AdminProductsTile'

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
  const [currentEditedId,setCurrentEditedId] = useState(null)
  
  const {products} = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()
  const {toast} = useToast()
  
  const isValidForm = () => {
    return Object.keys(formData).every((key) => formData[key] !== '');
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if(currentEditedId != null){
      dispatch(editAProduct({
        id:currentEditedId,
        formData
      })).then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchAllProducts())
          setOpenCreateProductsDialog(false)
          setFormData(initialeFormData)
          toast({
            title : "Product Edited Successfully"
          })
        }
      })
    }
    else{
      dispatch(addNewProduct({...formData,image:uploadedImageUrl}))
      .then(data =>{
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

  }

  const handleDelete = (getCurrentProductId)=>{
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      dispatch(fetchAllProducts())
      toast({
        title:"Product Deleted Successfully"
      })
    })
  }
  useEffect(()=>{
     dispatch(fetchAllProducts())
  },[dispatch])
  

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add new Product</Button>
      </div>
      <div className='grid gap4 md:grid-cols-3 lg:grid-cols-4'>
          {
            products && products.length > 0 ? products.map((product)=><AdminProductsTile product={product} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setFormData={setFormData}
            handleDelete={handleDelete}/>) : null
          }
        </div>
        <Sheet open={openCreateProductsDialog} onOpenChange={() => {
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialeFormData)
        }}>
          <SheetContent side='right' className='overflow-hidden overflow-y-scroll'>
            <SheetTitle>{currentEditedId?'Edit Product':'Add New Product'}</SheetTitle>
            <ImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} 
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId}
            />
            <div className='py-6'>
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId?'Edit':'Add'}
                onsubmit={onSubmit}
                isbtnDisabled={!isValidForm()}
              />
            </div>
          </SheetContent>
        </Sheet>
    </Fragment>
  )
}

export default AdminProducts