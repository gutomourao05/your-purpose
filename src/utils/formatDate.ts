export const formatDateToBR = (datePart: string) => {
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
};