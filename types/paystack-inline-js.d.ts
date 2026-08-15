declare module "@paystack/inline-js" {
  export interface PaystackTransactionSuccess {
    id: number;
    reference: string;
    message: string;
  }

  export interface PaystackTransactionError {
    message: string;
  }

  export interface PaystackResumeCallbacks {
    onSuccess?: (transaction: PaystackTransactionSuccess) => void;
    onCancel?: () => void;
    onError?: (error: PaystackTransactionError) => void;
    onLoad?: (info: { id: number; accessCode: string }) => void;
  }

  export default class PaystackPop {
    constructor();
    resumeTransaction(accessCode: string, callbacks?: PaystackResumeCallbacks): void;
  }
}
