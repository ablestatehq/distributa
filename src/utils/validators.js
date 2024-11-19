import * as Yup from "yup";
import getValidNumber from "./getValidNumber";

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
          .typeError("Quantity must be a valid number")
          .positive("Quantity must be a positive number")
          .required("Quantity is required"),
        units: Yup.string().required("Unit type is required"),
        price: Yup.number()
          .typeError("Price must be a valid number")
          .min(0, "Price must be greater than or equal to 0")
          .required("Price is required"),
      })
    )
    .min(1, "At least one item is required"),

  sub_total: Yup.number()
    .typeError("Subtotal must be a valid number")
    .min(0, "Subtotal cannot be negative")
    .required(),
  discount: Yup.number()
    .typeError("Discount must be a valid number")
    .nullable()
    .min(0, "Discount cannot be negative")
    .test(
      "is-less-than-subtotal",
      "Discount cannot be greater than the subtotal",
      function (value) {
        const { sub_total } = this.parent;
        return (
          value == null || getValidNumber(value) <= getValidNumber(sub_total)
        );
      }
    ),
  tax: Yup.number()
    .typeError("Tax must be a valid number")
    .min(0, "Tax cannot be negative")
    .nullable(),
  shipping: Yup.number()
    .typeError("Shipping must be a valid number")
    .min(0, "Shipping cost cannot be negative")
    .nullable(),
  amount_due: Yup.number()
    .typeError("Amount due must be a valid number")
    .min(0, "Amount due must be a positive number")
    .required(),
  amount_paid: Yup.number()
    .typeError("Amount paid must be a valid number")
    .min(0, "Amount paid cannot be negative")
    .nullable(),
  balance_due: Yup.number()
    .typeError("Balance due must be a valid number")
    .min(0, "Balance due cannot be negative")
    .nullable(),

  notes: Yup.string().nullable(),
  terms: Yup.string().nullable(),
});

export const createTransactionSchema = Yup.object({
  $id: Yup.string().nullable(),
  flow_type: Yup.string().required("Flow type is required"),
  item: Yup.string().required("Title is required"),
  date: Yup.date().required("Date is required").nullable(),
  amount: Yup.number()
    .typeError("Amount must be a valid number")
    .min(0, "Amount must be a positive number")
    .required("Amount is required"),
  description: Yup.string(),
  payer_payee: Yup.string().required("Payer/Payee is required"),
  invoice_receipt_no: Yup.string(),
  payment_method: Yup.string().required("Payment method is required"),
  category: Yup.string().required("Category is required"),
  payment_terms: Yup.string()
    .required("Payment terms is required")
    .oneOf(["immediate", "deferred"]),
  transaction_status: Yup.string()
    .required("Status is required")
    .test("valid-initial-status", "Invalid initial status", function (value) {
      const { payment_terms } = this.parent;

      if (!this.parent.$id) {
        return payment_terms === "immediate"
          ? value === "pending"
          : value === "scheduled";
      }

      return true;
    })
    .test(
      "valid-status-transition",
      "Invalid status transition",
      function (newStatus) {
        const { payment_terms, transaction_status } = this.parent;

        if (!transaction_status) return true;

        const statusTransitions = {
          immediate: {
            pending: ["cleared", "bounced", "failed", "void"],
            cleared: ["void"],
            bounced: ["pending", "void"],
            failed: ["pending", "void"],
            void: [],
          },
          deferred: {
            scheduled: ["pending", "void"],
            pending: ["cleared", "bounced", "failed", "void"],
            cleared: ["void"],
            bounced: ["pending", "void"],
            failed: ["pending", "void"],
            void: [],
          },
        };

        const validTransitions =
          statusTransitions[payment_terms][transaction_status];
        const isValidTransition = validTransitions.includes(newStatus);
        if (!isValidTransition && this.parent.$id) {
          return this.createError({
            path: "transaction_status",
            message: `Cannot transition from ${transaction_status} to ${newStatus}.`,
          });
        }

        return true;
      }
    ),
});

export const createCategorySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().nullable(),
  type: Yup.string().required("Type is required"),
});

export const passwordSchema = Yup.object().shape({
  current_password: Yup.string().required("Current password is required"),
  new_password: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});

export const personalDetailsSchema = Yup.object().shape({
  name: Yup.string().nullable(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
