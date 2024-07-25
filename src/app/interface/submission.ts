export interface Submission {
    id_profile: string;
    subject: string;
    document: string;
    dateReservation: string; // Using string to match the date format in the example
    dateReturn: string; // Using string to match the date format in the example
    transactionDetail: TransactionDetail[];
}

export interface TransactionDetail {
    idFac: string;
    quantity: number;
    price: number;
}