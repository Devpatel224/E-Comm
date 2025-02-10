import React , {useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/CommonForm'
import { addressFormControls } from '@/config'

const initialeAddressFormData = {
  address : '',
  city : '',
  pincode : '',
  phone : '',
  notes : ''
}

function Address() {
  const [formData, setFormData] = useState(initialeAddressFormData)


  const handleManageAddress = (e) => {
    e.preventDefault()
    
  }
  return (
    <Card>
      <div className="">
        Address Link
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
          <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={"Add"} onsubmit={handleManageAddress}/>
      </CardContent>
    </Card>
  )
}

export default Address