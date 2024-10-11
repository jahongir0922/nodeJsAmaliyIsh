const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 20 },
  isVip: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 5, maxlength: 20 },
});
const Customer = mongoose.model("Customer", customerSchema);
function validateCustomer(customer) {
  const customerSchema = {
    name: Joi.string().required().min(5).max(20),
    isVip: Joi.boolean(),
    phone: Joi.string().required().min(5).max(20),
  };
  return Joi.validate(customer, customerSchema);
}
exports.Customer = Customer;
// exports.customerSchema = customerSchema;
exports.validate = validateCustomer;
