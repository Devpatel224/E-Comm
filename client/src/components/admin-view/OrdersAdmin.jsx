
import React , {useState} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card , CardHeader , CardTitle ,CardContent  } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import OrderDetails from './OrderDetails';


function OrdersAdmin() {
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  return (
    <Card>
          <CardHeader>
            <CardTitle>
              All Orders 
            </CardTitle>
          </CardHeader>
          <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                        <TableHead className="sr-only">
                          <span>Details</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>12345</TableCell>
                        <TableCell>27/06/2025</TableCell>
                        <TableCell>InProcess</TableCell>
                        <TableCell>$1000</TableCell>
                        <TableCell >
                        <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                  <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
                  <OrderDetails
                  ></OrderDetails>
                </Dialog>
                          </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
        </Card>
  )
}

export default OrdersAdmin