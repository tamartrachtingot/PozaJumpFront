import Lend from'./Lend'
export default interface User{
    id?:number|null;
    tz?:String|any;
    password?:String|any;
    firstName?:String|any;
    lastName?:String|any;
    phone?:String|any;
    email?:String|any;
    status:number;
    // listOfLends:Array<Lend>;
}