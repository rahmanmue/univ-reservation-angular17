interface TransactionDetailDTO {
    id: string;
    idFac: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Reservation {
    dateReservation: string;
    dateReturn: string;
    dateSubmission: string;
    document: string;
    grandTotal: number;
    id: string;
    name: string;
    penalties: string;
    status: string;
    subject: string;
    totalItem: number;
    transactionDetailDTO: TransactionDetailDTO[];
}
