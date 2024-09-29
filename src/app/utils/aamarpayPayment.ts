import axios from "axios";
import config from "../config";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.aamarpay_payment_url!, {
      store_id: config.aamarpay_store_id,
      signature_key: config.aamarpay_signature_key,
      tran_id: paymentData.transactionId,
      success_url: `https://car-rental-reservation-system-ivory.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `https://car-rental-reservation-system-ivory.vercel.app/api/payment/confirmation?status=failed`,
      cancel_url: config.payment_cancel_url,
      amount: paymentData.totalCost,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.customerName,
      cus_email: paymentData.userEmail,
      cus_add1: "N/A",
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.aamarpay_verify_url!, {
      params: {
        store_id: config.aamarpay_store_id,
        signature_key: config.aamarpay_signature_key,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed!");
  }
};
