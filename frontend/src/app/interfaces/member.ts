export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    aboutUser?: string;
    firstName?:string;
    lastname?:string;
    addressLineOne?:string;
    addressLineTwo?:string;
    addressLineThree?:string;
    city?:string;
    state?:string;
    dateOfBirth?:Date;
    zipCode?:number;
    phoneNumber?:number;
    defaultDashView?:string; // to be set to where page redirects on Login/click dashboard link
    groupsJoined?:string[]; // save uid of groups joined
    roles?: Roles;
    linkedAccounts?:linkedAccounts; // keep track of which accounts are linked to user.  
}

export interface Roles{
    member?:boolean;
    admin?:boolean;
    groupLead?: boolean;
    sectorLead?: boolean;
    hostPartner?: boolean;
}

export interface Group{
    uid?:string;
    groupLead?:User[];
    members?:GrpMember[];
    title?:string;
    description?:string;
    meetingTimes?: string[];
    prices?:string[];
    sector?:string;
    community?:string;
    
}

export class GrpMember{
    uid?:string;
    dateJoined?:Date;
    paymentTerms?:string; // may need another interface here!
    paid?:boolean;
    //files
    //
}
export class linkedAccounts{
    email?:boolean;
    facebook?:boolean;
    twitter?:boolean;
    google?:boolean;
}