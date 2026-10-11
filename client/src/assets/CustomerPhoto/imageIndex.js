import personIcon from "./icons/person-icon.png";
import time from "./icons/time.png";
import calendarIcon from "./icons/calendar-icon.png";
import personIcon2 from "./icons/person-icon2.png";
import orderIcon from "./icons/order-icon.png";
import paymentIcon from "./icons/payment-icon.png";
import penIcon from "./icons/pen-icon.png";
import StepOrderIcon from "./icons/stepOrderIcon.svg";
import StepPenIcon from "./icons/stepPenIcon.svg";
import FinalPenIcon from "./icons/finalPenIcon.svg";
import StepPaymentIcon from "./icons/stepPaymentIcon.svg";
import completeIcon from "./icons/complete-icon.png";
import AMEX from "./icons/Amex.svg";
import VISA from "./icons/Visa.svg";
import MASTERCARD from "./icons/Mastercard.svg";
import PhoneNumber from "./icons/PhoneNumber.svg";
import Home from "./icons/Home.svg";
import name from "./icons/CustomerName.svg";
import email from "./icons/email.svg";
import arrowBlue from "./icons/arrow-blue.svg";
import arrowWhite from "./icons/arrow-white.svg";
import Header from "./icons/Header-service.jpg";

const assetUrl = (asset) => (typeof asset === "string" ? asset : asset?.src);

const image = {
  orderIcon: assetUrl(orderIcon),
  paymentIcon: assetUrl(paymentIcon),
  penIcon: assetUrl(penIcon),
  personIcon: assetUrl(personIcon),
  time: assetUrl(time),
  calendarIcon: assetUrl(calendarIcon),
  personIcon2: assetUrl(personIcon2),
  completeIcon: assetUrl(completeIcon),
  StepOrderIcon: assetUrl(StepOrderIcon),
  StepPenIcon: assetUrl(StepPenIcon),
  FinalPenIcon: assetUrl(FinalPenIcon),
  StepPaymentIcon: assetUrl(StepPaymentIcon),
  VISA: assetUrl(VISA),
  AMEX: assetUrl(AMEX),
  MASTERCARD: assetUrl(MASTERCARD),
  PhoneNumber: assetUrl(PhoneNumber),
  Home: assetUrl(Home),
  name: assetUrl(name),
  email: assetUrl(email),
  arrowBlue: assetUrl(arrowBlue),
  arrowWhite: assetUrl(arrowWhite),
  Header: assetUrl(Header),
};

export default image;
