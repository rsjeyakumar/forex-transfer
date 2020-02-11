export interface LoginReq {
        userId: string;
        password: string;
}

export interface LoginRes {
        statusCode: number;
        userName: string;
        userId: number;
}


export interface AccountReq {
        statusCode: number;
        message: string;
        acccountDetail: AccountsList[];
}

export interface AccountsList {
        accountNumber: number;
        accountType: string;
        currency: string;
        balance: string;
}



export interface TransactionReq {
        fromAccount: number;
        toAccount: number;
        transferAmount: number;
}

export interface TransactionRes {
        statusCode: number;
        message: string;
}

export interface TransactionRes {
        statusCode: number;
        message: string;
}

export interface TransactionHistory {
        statusCode: number;
        transactionDetails: TransactionSummary[];
}

export interface TransactionSummary {
        fromAccount: number;
        toAccount: number;
        transferdAmount: number;
        transactionDate: Date;
        transactionStatus: string;
}
