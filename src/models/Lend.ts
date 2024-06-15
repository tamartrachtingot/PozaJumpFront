import Item from './Item';
import User from './User'
export default interface Lend{
    id?:bigint|null ;
    lendingDate?:Date;
    returnDate?:Date;
    user?:User;
    item?:Item|null;
}