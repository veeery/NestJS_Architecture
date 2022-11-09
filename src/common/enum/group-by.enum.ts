export enum GroupBy {
  'date',
  'sales',
  'customer',
  'customer.customerArea',
  'customer.customerRegion',
  'customer.customerType',
  'createdBy',
  'driver',
  'supplier',
  'salesInvoiceDetails.productCategory',
  'salesOrderDetails.productCategory',
  'purchaseDetails.productCategory',

  //sales invoice detail
  'productCategory',
  'salesInvoice.customer',
  'salesInvoice.sales',
  'salesInvoice.customer.customerType',
  'salesInvoice.customer.customerArea',
  'salesInvoice.customer.customerArea.customerRegion',
}
