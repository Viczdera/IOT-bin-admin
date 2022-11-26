import React from 'react';
import moment from 'moment';



export const Capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const formatter = new Intl.NumberFormat("en-NG", {
    currency: "NGN",
});
export const formatterUsd = new Intl.NumberFormat("en-US", {
    currency: "USD",
});

export const AmountToLocale = (ifTrue: boolean, d: any) => {
    return ifTrue ? d?.toLocaleString() || 0 : 0;
};

export const FormatDate = (data: any) => {
    return data != null ? moment(data).format("DD-MM-YYYY") : "--------"

}
export const CamelCase=(data:string)=>{
    return data.charAt(0).toUpperCase() + data.slice(1);
}