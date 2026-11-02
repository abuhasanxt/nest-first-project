import { IsString } from 'class-validator';


export class createBookDto{
    @IsString()
    name:string
}