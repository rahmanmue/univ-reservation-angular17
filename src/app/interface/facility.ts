export interface Facility {
    id?: string;
    name: string;
    information: string;
    picture: string;
    quantity: number;
    price?: number;
    typeFacilities: string;
    availability: string;
}

export interface typeFacilities {
    id: string;
    name: string;
}

export interface availability {
    id: string;
    name: string;
}

export interface FacilityResponse{
    id?: string;
    name: string;
    information: string;
    picture: string;
    quantity: number;
    price?: number;
    typeFacilities: typeFacilities;
    availability: availability;
}