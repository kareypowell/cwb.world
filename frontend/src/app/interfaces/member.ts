export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    aboutUser?: string;
    firstName?: string;
    lastname?: string;
    fullnameToLower?: string; // firstname + lastname cast to lowercase for searching
    addressLineOne?: string;
    addressLineTwo?: string;
    addressLineThree?: string;
    city?: string;
    state?: string;
    country?: string;
    dateOfBirth?: { seconds: number };
    zipCode?: number;
    phoneNumber?: number;
    defaultDashView?: string; // to be set to where page redirects on Login/click dashboard link
    groupsJoined?: string[]; // save uid of groups joined
    independentEvents?: string[]; // events joined without actually joining affiliated groups
    roles?: Roles;
    linkedAccounts?: LinkedAccounts; // keep track of which accounts are linked to user.  
    groupsLead?: string[]; // Hold UIDs of groups the user leads
    sectorsLead?: string[]; // Hold UIDs of sectors the user leads
    profilePublic?: boolean;
    files?: string[];
}


export interface Roles {
    member?: boolean;
    admin?: boolean;
    groupLead?: boolean;
    guestHost?: boolean;
    sectorLead?: boolean;
    hostPartner?: boolean;
}

export interface Group {
    uid?: string;
    approved?: boolean;
    dateCreated?: Date;
    groupLead?: string; // Hold UID of group lead
    members?: { userUID?: string, memberUID?: string }[];
    name?: string;
    imageUri?: string; // hold url to display image
    nameToLower?: string; // convert group title to lower case for searching
    description?: string;
    bio?: string;
    whatToExpect?: string;
    duration?: string; // may have to change to start and end dates
    meetingTimes?: meetingDays[];
    prices?: groupPrice[];
    sector?: string;
    community?: string;
    capacity?: number;
    acceptPayments?: boolean;
    bankInfo?: string;
    routingNumber?: number;
    accountNumber?: number;
    files?: string[];
    createdBy?: string; // hold name of user who created it
    partnershipCode?: string;
    events?: string[];
    blogPosts?: string[];
    homePage?:string;
}

export interface blogPost{
    uid?:string; // hold post id
    title?: string;
    title_url?:string;
    draft?: boolean;
    excerpt?:string;
    body?: string;
    datePublished?: Date;
    author?: string; // hold uid of author
    group?:string; // hold uid of group

}

export interface meetingDays {
    day?: string; // Monday, Tuesday, Wed, etc
    meet?: boolean; // whether there is a meeting on this day or not
    recurrence?: string; // every
    startTime?: Date;
    endTime?: Date;
}

export interface groupPrice {
    allowedTerm?: boolean;
    meetingType?: { group_meeting: boolean, one_on_one: boolean };
    termDescription?: string;
    termPrice?: number;
}

export interface GroupMember {
    uid?: string; // member uid
    groupUID?: string; // group uid
    approved?: boolean;
    dateJoined?: Date;
    paymentTerms?: string; // may need another interface here!
    paid?: boolean;
    files?: string[];
    firstName?: string;
    lastName?: string;
    photoURL?: string;
    attendance?: { event_uid: string, attended: boolean }[];
}
export interface LinkedAccounts {
    email?: boolean;
    facebook?: boolean;
    twitter?: boolean;
    google?: boolean;
}

export interface Community {
    uid?: string;
    name?: string;
    nameToLower?: string; // convert name to lower case for search indexing
    description?: string;
    bio?: string;
    whatToExpect?: string;
    imageUri?: string;
    assignedTo?: string;
    dateCreated?: Date;
    createdBy?: string; // hold uid of person who created group
    numberMembers?: number; //init to 0 on creation. increment when a group in this community has a new member
    groupsInCommunity?: string[]; // hold UID of groups in this community
    sectorsInCommunity?: string[]; // hold UIDs of sectors in this community
    files?: string[];
}
export interface Files {
    uid?:string;
    name?: string;
    isPrivate?: boolean;
    url?:string; // url to file
    groudId?:string; // hold uid to group file belongs to
    dateCreated?: Date;
}
export interface SuperSector{
    uid?:string;
    name?: string;
    nameToLower?:string;
    imageURL?:string;
    community?:string;
    description?:string;
    dateCreated?: Date;
    whatToExpect?:string;
    createdBy?:string;
    files?:string[];
    images?:string[];
    videos?:string[];
}
export interface Sector {
    uid?: string;
    name?: string;
    nameToLower?: string;
    description?: string;
    bio?: string;
    whatToExpect?: string;
    sectorImage?:string;
    community?: string; // community name
    communityID?:string;
    superSector?:string;
    sectorLead?: string; // hold uid of sector lead(s)
    imageUrl?: string;
    files?: string[];
    dateCreated?: Date;
    createdBy?: string; // hold name of creator
    groupsInSector?: string[]; // hold UIDs of all groups in this sector
    numberMembers?: number; // sum of all members in all groups in this sector
    sectorRequests?: string[]; // hold UIDs of new sector creation requests unless created by an Admin
}

export interface EventItem {
    uid?: string;
    group?: string; // get group UID
    eventType?: string; // single, recurring
    eventStatus?: string; // active, cancelled, delayed
    eventLogo?: string; // hold url to event image
    name?: string;
    registrationRequired?: boolean;
    openToOnlyGroupMembers?: boolean;
    includeWeekends?: boolean;
    videoDisplay?: boolean;
    videoUrl?: string; // if video available, give url
    eventImage?: boolean;
    eventImageUrl?: string; //image to url
    nameToLower?: string; // convert name to lower case for index searching
    description?: string;
    whatToExpect?: string;
    groupLead?: string; // group leads from group
    additionalInfo?: string;
    startDate?: Date; // date and time of event start
    timeZone?: string; //time zone
    prerequisiteRequired?:boolean;
    prereqs?:string[];
    sessionChoice?:boolean;
    sessions?:eventSession[];
    endDate?: Date;// end time
    eventOnline?: boolean;
    liveEventUrl?:string;
    eventPhysical?: boolean;
    eventVenue?: string; // if not physical, give venue
    isRecurrent?: boolean; // if one time or recurrent
    recurrence?: string; // if recurrent, set recurrence
    durationNumber?:number; //1, 2, 10, etc => hold the count for duration and duration holds the term, month, year, weeks etc
    durationTerm?:string; //weeks, one month, 10 weeks, etc
    eventCapacity?: number; // if open to all users
    startWithoutHost?: boolean;
    paidEvent?: boolean;
    eventFee?: boolean;
    refundable?: boolean;
    refundPolicy?: string;
    files?: string[];
}

export interface eventSession{
    name?:string;
    capacity?:number;
    description?:string;
    price?:number;
    required?:boolean;
    locationSameAsMainEvent?:boolean;
    locationOnline?:boolean;
    physicalLocation?:boolean;
    physicalLocationAddress?:boolean;
    startDate?: Date;
    endDate?:Date;
    timeZone?:string;

}

export interface AirRMS{
    uid?:string;
    name?:string;
    spaceType?:string;
    description?:string;
    capacity?:number;
    eventsHosted?:number;
    owner?:string; // hold uid of owner who can then request to host event with this space
    pricePerHour?: number;
    pricePerDay?: number;
    pricePerWeek?:number;
    pricePerMonth?:number;
    eventsBooked?: string[]; //hold uids of events booked to take place in this space
}