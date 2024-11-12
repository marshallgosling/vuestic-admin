export enum PaymentSystemType {
  Visa = 'visa',
  MasterCard = 'mastercard',
  Unipay = 'unipay',
}

export const paymentSystemTypeOptions = Object.values(PaymentSystemType)

export interface PaymentCard {
  id: string
  name: string
  isPrimary: boolean // show Primary badge
  cardHolder: string // John Doe
  paymentSystem: PaymentSystemType // Enum or union type for various payment systems
  cardNumber: string // 1234567890123456
  cardNumberMasked: string // ****1679
  expirationDate: string // 09/24
  cvv: string // 123
}

export interface BillingAddress {
  id: string
  name: string
  isPrimary: boolean // show Primary badge
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}
