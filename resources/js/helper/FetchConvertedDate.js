import { NepaliDateConverter } from "react-nepali-date-picker-lite";
class FetchConvertedDate {
    static getDateFromToday(days) {
        const today = new Date(); // Get today's date
        const targetDate = new Date();
        targetDate.setDate(today.getDate() + days); // Add specified days
        const formattedDate = targetDate.toISOString().split("T")[0]; // '2023-10-01'
        const defaultDate = NepaliDateConverter.AD2BS(formattedDate);
        return defaultDate;
    }

    static getConvertedDateBS2AD(date) {
        return NepaliDateConverter.BS2AD(date);
    }
    static getConvertedDateAD2BS(date) {
        return NepaliDateConverter.AD2BS(date);
    }
}

export default FetchConvertedDate;
