import { IsNumber, IsString } from 'class-validator';


export class createBookDto{
    @IsString()
    name:string
    @IsString()
    writer:string
    @IsNumber()
    price:number
}