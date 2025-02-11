import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({addressInfo,handleDeleteAddress,handleEditAddress,setCurrentEditedId}) {
 
  // const handleEditAddress = (addressInfo) => {

  // }
  return (
        <Card className=''>
            <CardContent className='grid gap-4 p-4'>
                <Label>Address : {addressInfo?.address}</Label>
                <Label>Citry : {addressInfo?.city}</Label>
                <Label>PinCode : {addressInfo?.pincode}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>notes : {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className='flex justify-end  gap-3'>
                <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
            </CardFooter>
        </Card>
  )
}

export default AddressCard