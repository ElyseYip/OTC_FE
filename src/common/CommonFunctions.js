 export const datePickerTimeFormat = (date) => {
    const fetchDate = new Date(date)
    let day = fetchDate.getDate();
    let month = fetchDate.getMonth() +1;
    const year = fetchDate.getFullYear();
    if (date) {
        if(day <10){
            day = "0"+day
        }
        if(month <10){
            month = "0"+month
        }
        return`${year}-${month}-${day}`;
    }
};
export const timeConverter = (date) => {
    const fetchDate = new Date(date * 1000)
    let day = fetchDate.getDate();
    let month = fetchDate.getMonth() +1;
    if(month <10){
        month = "0"+month
    }
    if(day <10){
        day = "0"+day
    }
    const year = fetchDate.getFullYear();
    let hours = fetchDate.getHours();
    let minutes = fetchDate.getMinutes();
    let seconds = fetchDate.getSeconds();
    if(minutes <10){
        minutes = "0"+minutes
    }
    if(seconds <10){
        seconds = "0"+seconds
    }

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
 }

 export const dateToEpoch = (val) =>{
    const fetchDate = new Date (val).getTime() / 1000
     return fetchDate
 }

export const timeDifference = (date) => {
    const date1 = new Date();
    const date2 = new Date(date);
    const diffTime = Math.abs(date2-date1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}

export const decimalTimes = (num1, num2) =>{
    return Math.round((num1* num2) * 1e12)/1e12
}

 export const decimalMinus = (num1, num2) =>{
     return Math.round((num1 - num2) * 1e12)/1e12
 }

export const emailValidation = (email) =>{
    const regex = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const result = regex.test(email)
    return result
}

export const buyOrSellSide = (val) =>{
    let side;
    if (val === 1) {
        side ="SELL"
    }else{
        side = "BUY"
    }
    return side
}

export const translateStatus = (val) =>{
    let status;
    if (val === 0) {
        status ="Pending"
    } else if(val === 3){
        status = "Accepted"
    } else if(val === 4){
        status = "Cancelled"
    } else if(val === 5){
        status = "Declined"
    } else if (val === 7){
        status = "Completed"
    } else if(val === 8){
        status = "Expired"
    } else{
        status = "xxxx"
    }
    return status
}