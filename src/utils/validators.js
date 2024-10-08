import * as Yup from "yup";

export const newInvoiceSchema = Yup.object({
  logo: Yup.string().nullable(),
  paper_size: Yup.string().required("Paper size is required"),
  orientation: Yup.string().required("Orientation is required"),
  currency: Yup.string().required("Currency is required"),

  billed_from: Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
  }),

  billed_to: Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
  }),

  title: Yup.string().required("Invoice title is required"),
  invoice_no: Yup.string().required("Invoice number is required"),
  issue_date: Yup.date().required("Issue date is required").nullable(),
  due_date: Yup.date()
    .required("Due date is required")
    .min(Yup.ref("issue_date"), "Due date must be after issue date")
    .nullable(),

  items: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("Item title is required"),
        quantity: Yup.number()
          .positive("Quantity must be a positive number")
          .required("Quantity is required"),
        units: Yup.string().required("Unit type is required"),
        price: Yup.number()
          .min(0, "Price must be greater than or equal to 0")
          .required("Price is required"),
      })
    )
    .min(1, "At least one item is required"),

  subtotal: Yup.number().min(0, "Subtotal cannot be negative").required(),
  discount: Yup.number().min(0, "Discount cannot be negative").nullable(),
  tax: Yup.number().min(0, "Tax cannot be negative").nullable(),
  shipping: Yup.number().min(0, "Shipping cost cannot be negative").nullable(),
  amount_due: Yup.number()
    .min(0, "Amount due must be a positive number")
    .required(),
  amount_paid: Yup.number().min(0, "Amount paid cannot be negative").nullable(),
  balance_due: Yup.number().min(0, "Balance due cannot be negative").nullable(),

  notes: Yup.string().nullable(),
  terms: Yup.string().nullable(),
});


