import React , {useEffect, useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/CommonForm'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, fetchAddress , deleteAddress, editAddress } from '@/store/shop/address-slice'
import { useToast } from '@/hooks/use-toast'
import AddressCard from './AddressCard'

const initialeAddressFormData = {
  address : '',
  city : '',
  pincode : '',
  phone : '',
  notes : ''
}

function Address() {
  const [formData, setFormData] = useState(initialeAddressFormData)
  const [currentEditedId,setCurrentEditedId] = useState(null)
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth) 
  const {toast} = useToast()
  const {addressList} = useSelector(state => state.address)

 
   
  const handleManageAddress = (e) => {
    e.preventDefault()

    if(addressList.length >= 3 && currentEditedId === null){
      toast({
        title: 'You can add only 3 address',
        variant : 'destructive'
      })
      return
    }

    if(currentEditedId === null){
      dispatch(addAddress({...formData, userId: user?.id})).then(data =>{
        console.log(data)
  
        if(data.payload?.success){
          dispatch(fetchAddress({userId: user?.id}))
          toast({
            title: 'Address Added Successfully',
            variant : 'success'
          })
          setFormData(initialeAddressFormData)
        }
      })
    }else{
      dispatch(editAddress({userId : user?.id,addressId:currentEditedId,formData})).then(data =>{
      if(data.payload?.success){        
        dispatch(fetchAddress({userId:user?.id}))
        toast({
          title: 'Address Updated Successfully',
          variant : 'success'
        })
        setFormData(initialeAddressFormData)
        setCurrentEditedId(null)
      }
    })
    }


  }

  const handleDeleteAddress = (getCurrentAddressInfo) => {
  

    dispatch(deleteAddress({userId: getCurrentAddressInfo.userId, addressId: getCurrentAddressInfo._id})).then(data =>{
      if(data.payload?.success){
        dispatch(fetchAddress({userId:getCurrentAddressInfo.userId}))

        toast({
          title: 'Address Deleted Successfully',
          variant : 'success'
        })
      }
    })
  }

  const handleEditAddress = (getCurrentAddressInfo) => {
    const {userId,...rest} = getCurrentAddressInfo
    setCurrentEditedId(rest._id)
    setFormData(rest)
  }


  function isFormValid(){
    return Object.keys(formData).map(key => formData[key] !== '').every(value => value)
  }

  useEffect(()=>{
    dispatch(fetchAddress({userId: user?.id}))
  },[dispatch])

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2   gap-2">
        {
          addressList && addressList.length > 0 ?
          addressList.map((addressItem)=> <AddressCard key={addressItem._id} addressInfo={addressItem} handleDeleteAddress={handleDeleteAddress} setCurrentEditedId={setCurrentEditedId} handleEditAddress={handleEditAddress}/>) : null
        }
      </div>
      <CardHeader>
        <CardTitle>{currentEditedId !== null ? "Edit Address" : "Add a Address" }</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
          <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={currentEditedId !== null ? "Edit" : "Add"} onsubmit={handleManageAddress} isbtnDisabled={!isFormValid()}/>
      </CardContent>
    </Card>
  )
}

export default Address