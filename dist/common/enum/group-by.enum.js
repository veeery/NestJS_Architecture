"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBy = void 0;
var GroupBy;
(function (GroupBy) {
    GroupBy[GroupBy["date"] = 0] = "date";
    GroupBy[GroupBy["sales"] = 1] = "sales";
    GroupBy[GroupBy["customer"] = 2] = "customer";
    GroupBy[GroupBy["customer.customerArea"] = 3] = "customer.customerArea";
    GroupBy[GroupBy["customer.customerRegion"] = 4] = "customer.customerRegion";
    GroupBy[GroupBy["customer.customerType"] = 5] = "customer.customerType";
    GroupBy[GroupBy["createdBy"] = 6] = "createdBy";
    GroupBy[GroupBy["driver"] = 7] = "driver";
    GroupBy[GroupBy["supplier"] = 8] = "supplier";
    GroupBy[GroupBy["salesInvoiceDetails.productCategory"] = 9] = "salesInvoiceDetails.productCategory";
    GroupBy[GroupBy["salesOrderDetails.productCategory"] = 10] = "salesOrderDetails.productCategory";
    GroupBy[GroupBy["purchaseDetails.productCategory"] = 11] = "purchaseDetails.productCategory";
    GroupBy[GroupBy["productCategory"] = 12] = "productCategory";
    GroupBy[GroupBy["salesInvoice.customer"] = 13] = "salesInvoice.customer";
    GroupBy[GroupBy["salesInvoice.sales"] = 14] = "salesInvoice.sales";
    GroupBy[GroupBy["salesInvoice.customer.customerType"] = 15] = "salesInvoice.customer.customerType";
    GroupBy[GroupBy["salesInvoice.customer.customerArea"] = 16] = "salesInvoice.customer.customerArea";
    GroupBy[GroupBy["salesInvoice.customer.customerArea.customerRegion"] = 17] = "salesInvoice.customer.customerArea.customerRegion";
})(GroupBy = exports.GroupBy || (exports.GroupBy = {}));
//# sourceMappingURL=group-by.enum.js.map