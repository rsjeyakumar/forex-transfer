export interface Search {
    flightName: string;
    departureLocation: string;
    arrivalLocation: string;
    departureDate: Date;
    duration: Date;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
    travelId: number;
    flightId: number;
}
export interface FlightListResponse {
    flightDetails: Search[];
    statusCode: number;
    message: string;
}

export interface VendorListResponse {
    vendorList: VendorList[];
    statusCode: number;
    message: string;
}
export interface VendorList {
    vendorName: string;
    vendorId: number;
}

export interface MenuListResposne {
    statusCode: number;
    message: string;
    menuList: MenuList[];
}

export interface MenuList {
    menuId: number;
    menuName: string;
    menuPrice: number;

}


export interface Orders {
    vendorId: number;
    menuList: OrderMenu[];
    paymentType: string;
}

export interface OrderMenu {
    menuId: number;
    quantity: number;
}



/*home slice*/
export interface ViewItemsRes {
    statusCode: number;
    message: string;
    itemList: ViewItems[];
}

export interface ViewItems {
    itemId: number;
    itemName: string;
    price: number;
    favourite: boolean;
}


export interface OrdersReq {
    totalPrice: number;
    itemList: OrderItemList[];
}


export interface OrderItemList {
    itemId: number;
    quantity: number;
}
