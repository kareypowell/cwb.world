export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    roles?: Roles;
    
}

export interface Roles{
    member?:boolean;
    admin?:boolean;
    groupLead?: boolean;
    sectorLead?: boolean;
    hostPartner?: boolean;
}