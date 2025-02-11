import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import OrderDetails from "../shopping-view/OrdersDetails";

function  OrdersShopping() {
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)

  return (
    <Card className="mt-8 p-0">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table >
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
              <TableCell>
                <Dialog open={openDetailsDialog} setOpen={setOpenDetailsDialog}>
                  <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
                  <OrderDetails></OrderDetails>
                </Dialog>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default OrdersShopping;
