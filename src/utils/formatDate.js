
// Example usage
// const inputDate = "2024-06-21";
// const formattedDate = formatDate(inputDate);
// console.log(formattedDate); // Output: "Jun 21, 2024"



function formatDate(inputDate) {
    // Create a new Date object from the input date string
    const date = new Date(inputDate);

    // Define an array of month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract the day, month, and year from the date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Get the month name from the month index
    const monthName = monthNames[monthIndex];

    // Format the date as "Month Day, Year"
    const formattedDate = `${monthName} ${day}, ${year}`;

    return formattedDate;
}


export default formatDate