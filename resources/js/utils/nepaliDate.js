import moment from "moment";
export const todaysDate = () => {
    const today = moment();
    const nepaliDate = today.format("YYYY-MM-DD");
    return nepaliDate;
};
