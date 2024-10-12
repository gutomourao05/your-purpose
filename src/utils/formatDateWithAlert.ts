export const formatDate = (dateString: string, timeAlert: string) => {
    const [day, month, year] = dateString.split("/");
    const time = timeAlert ? `${timeAlert}:00` : "00:00:00";

    const newDate = `${year}-${month}-${day}T${time}.000Z`;

    return newDate;
};