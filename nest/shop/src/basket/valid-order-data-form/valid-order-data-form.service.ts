import { Injectable } from '@nestjs/common';
import { OrderDataDto } from 'src/dto/orderData.dto';

@Injectable()
export class ValidOrderDataFormService {

    checkLen = (task: string, max = null) => max === null? task.length > 2: task.length > 0 && task.length < max;

    // objekt który posiada metody do każdej wartości w przesłanym formularzy (sprawdza czy wartości się zgadzają)
    valuesSettings = {
        name: (task: string) => {return this.checkLen(task)? typeof task.toString() === "string": false},
        surname: (task: string) => this.checkLen(task),
    
        city: (city: string) => {return this.checkLen(city)? typeof city.toString() === "string": false},
        post_code: (code: string) => {
          return !!/[0-9]{2,2}-[0-9]{3,3}/.exec(code);
        },

        street: (task: string) => this.checkLen(task),
        house_number: (h_number: string) => {

          const isNum = parseInt(h_number);
          return !this.checkLen(h_number, 0) && !isNaN(isNum);
        },
    
        apartment_number: (_number: string) => {
          const apart_num = _number.toString();
          return apart_num.length > 0? !isNaN(parseInt(apart_num)): true;
        },
        phone: (_number: number) => {
          const phone_num = _number.toString();
          return phone_num.length > 0? !!/[0-9]{9,9}/.exec(phone_num): false;
        },
    
        email: (email: string) => {
          return this.checkLen(email, 128)? !!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/.exec(email): false;
        }
    };

    // sprawdzamy przesłany formularz
    checkOrderData(form: OrderDataDto)
    {
        let flag: boolean = true;
        for(let e in form)
        {
            const method = this.valuesSettings[`${e}`];
            if(!method(form[`${e}`])) flag = false;
        };

        return flag;
    }
}