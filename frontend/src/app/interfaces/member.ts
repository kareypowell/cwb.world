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
    country?:string;
    dateOfBirth?:{seconds:number};
    zipCode?:number;
    phoneNumber?:number;
    defaultDashView?:string; // to be set to where page redirects on Login/click dashboard link
    groupsJoined?:string[]; // save uid of groups joined
    roles?: Roles;
    linkedAccounts?:LinkedAccounts; // keep track of which accounts are linked to user.  
    groupsLead?:string[]; // Hold UIDs of groups the user leads
    sectorsLead?:string[]; // Hold UIDs of sectors the user leads
    profilePublic?:boolean;
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
    approved?:boolean;
    groupLead?:string[]; // Hold UID of group lead
    members?:GrpMember[];
    title?:string;
    description?:string;
    bio?:string;
    whatToExpect?:string;
    duration?: string; // may have to change to start and end dates
    meetingTimes?: string[];
    prices?:groupPrice[];
    sector?:string;
    community?:string;
    capacity?: number;
    acceptPayments?:boolean;
    bankInfo?:string;
    routingNumber?:number;
    accountNumber?:number;
    
}
export interface groupPrice{
    allowedTerm?:boolean;
    termDescription?:string;
    termPrice?:number;
}

export interface GrpMember{
    uid?:string;
    approved?:boolean;
    dateJoined?:Date;
    paymentTerms?:string; // may need another interface here!
    paid?:boolean;
    //files
    //
}
export interface LinkedAccounts{
    email?:boolean;
    facebook?:boolean;
    twitter?:boolean;
    google?:boolean;
}

export interface Community{
    uid?:string;
    name?:string;
    description?:string;
    bio?:string;
    whatToExpect?:string;
    imageUri?:string;
    // assignedTo?: perhaps a user
    // files
    // links

}

export interface Sector{
    uid?:string;
    name?:string;
    description?:string;
    bio?:string;
    whatToExpect?:string;
    community?:string; // community name
    sectorLead?: string[]; // hold uid of sector lead(s)
    imageUrl?:string;
    // files
    // links

}

export interface Event{
    uid?:string;
    group?:string; // get group UID
    name?:string;
    description?:string;
    groupLead?:string[]; // group leads from group
    additionalInfo?:string;
    startDate?:Date;
    startTime?:Date;
    endDate?:Date;
    endTime?:Date;
    recurrence?: string;
    startWithoutHost?:boolean;
}