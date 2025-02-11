import React , {useState} from 'react'
import { Dialog , DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/CommonForm'

const initialeFormData = {
    status : ''
}

function OrderDetails() {
    const [formData,setFormData] = useState(initialeFormData)

    const handleUpdateStatus = (e) => {
        e.preventDefault()
    }

    
  return (
    <DialogContent className="sm:max-w-[600px] "> 
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className='flex mt-6 items-center justify-between'>
                        <p className='font-medium'>Order Id:</p>
                        <Label>12345</Label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Order Date:</p>
                        <Label>11/2/25</Label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Order price:</p>
                        <Label>$500</Label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Order Status:</p>
                        <Label>InProgress</Label>
                    </div>
                </div>
                <Separator></Separator>

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className='font-medium'> Details</div>
                        <ul className='grid gap-3'>
                            <li className='flex items-center justify-between'>
                                <span>Prodcut One</span>
                                <span>$100</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className='font-medium'>Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>John doe</span>
                                <span>Address</span>
                                <span>City</span>
                                <span>pincoe</span>
                                <span>phone</span>
                                <span>notes</span>
                            </div>
                    </div>
                </div>

                <CommonForm formControls={[
                    {
                        label: "Order Status",
                        name: "Status",
                        componentType: "select",
                        options: [
                          { id: "pending", label: "Pending" },
                          { id: "inProcess", label: "In Process" },
                          { id: "inShipping", label: "In Shipping" },
                          { id: "rejected", label: "Rejected" },
                          { id: "delivered", label: "Delivered" },
                        ],
                      }
                    ]
                } 
                formData={formData}
                setFormData={setFormData}
                buttonText={'Update Status'}
                onSubmit={handleUpdateStatus}
                ></CommonForm>
            </div>
    </DialogContent>
  )
}

export default OrderDetails