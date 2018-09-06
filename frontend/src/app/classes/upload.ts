export class Upload {
    $key: string;
    file:File;
    url: string;
    group:string; //hold uid of the group it belongs to
    isPrivate: boolean; // make file private
    name:string;
    progress:number;
    createdAt: Date = new Date();

    constructor(file:File){
        this.file = file;
    }
}
