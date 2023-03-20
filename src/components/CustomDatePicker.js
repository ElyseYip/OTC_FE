import React from "react";
import {datePickerTimeFormat} from "../common/CommonFunctions";
import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment";

export default function CustomDatePicker(props){
    const {
        setDate,
        setClickedCalendar,
        clickedCalendar,
        handleExpiryChange,
        date
    }=props;

    let today  = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), (today.getDate() +1))

    return(
        <DatePicker
            onChange={(e) =>setDate(datePickerTimeFormat(e))}
            onClose={() => {
                setClickedCalendar(false);
            }}
            value={date? date:moment().add(1, 'days')}
            minDate={tomorrow}
            open={clickedCalendar}
            renderInput={( ref,
                           inputProps,
                           disabled,
                           onChange,
                           value,) =>
                <>
                    <input
                        className="expire-date center"
                        type="text"
                        placeholder="YYYY-MM-DD"
                        // onInput={e => {
                        //     if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
                        // }}
                        onChange={e=>handleExpiryChange(e)}
                        value={date}
                    />
                    <div className="icon calendar" onClick={() => setClickedCalendar(true)}><span
                        className="icon-calendar"></span>
                    </div>
                </>
            }/>
    )
}