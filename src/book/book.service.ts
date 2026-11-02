import { Injectable } from "@nestjs/common";

@Injectable ()
export class BookService{
getBook():string{
    return "take book"
}

addBook(data:any){
     console.log(data);
    return data
}

}