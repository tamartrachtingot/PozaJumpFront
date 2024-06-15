import Item from "./Item"
export default interface Category{
    id?:bigint;
    name?:String;
    description?:String;
    // Items?:Array<Item>;
    image?:String;
}