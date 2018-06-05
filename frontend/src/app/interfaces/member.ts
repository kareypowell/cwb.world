export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    aboutUser?: string;
    firstName?:string;
    lastname?:string;
    fullnameLower?:string; // firstname + lastname cast to lowercase for searching
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
    files?:FileInterface[];
    myEvents?:MyEvents[];
}

export interface MyEvents{
    uid?:string;
    group?:string; // hold uid of group event is tied to
    startDate?: Date;
    startTime?:Date;
    endDate?:Date;
    endTime?:Date;
    recurrence?: string;
    attended?:boolean;
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
    titleToLower?:string; // convert group title to lower case for searching
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
    files?:FileInterface[];
    
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
    files?:FileInterface[];
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
    nameToLower?:string; // convert name to lower case for search indexing
    description?:string;
    bio?:string;
    whatToExpect?:string;
    imageUri?:string;
    assignedTo?:string;
    dateCreated?: Date;
    files?:FileInterface[];

}
export interface FileInterface{
    name?:string; // name of file or link
    type?:string; // file or link
    link?:{file?:boolean,link?:boolean}; // link to file or actual link of link, lool! Set only one to true with radio buttons
}

export interface Sector{
    uid?:string;
    name?:string;
    nameToLower?:string;
    description?:string;
    bio?:string;
    whatToExpect?:string;
    community?:string; // community name
    sectorLead?: string[]; // hold uid of sector lead(s)
    imageUrl?:string;
    files?:FileInterface[];

}

export interface Event{
    uid?:string;
    group?:string; // get group UID
    name?:string;
    nameToLower?:string; // convert name to lower case for index searching
    description?:string;
    groupLead?:string[]; // group leads from group
    additionalInfo?:string;
    startDate?:Date;
    startTime?:Date;
    endDate?:Date;
    endTime?:Date;
    recurrence?: string;
    startWithoutHost?:boolean;
    files?:FileInterface[];
}