import Category from "./Category";
import Lend from './Lend';
export default interface Item{
    id?:BigInt;
    name?:String;
    description?:String;
    price?:number;
    qty:number;
    category?:Category;
    // listOfHistoryOfLends?:Array<Lend>;
    image?:String;
}