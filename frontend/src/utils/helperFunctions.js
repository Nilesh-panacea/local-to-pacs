export function parseCustomTimestamp(timestamp) {
    // Extract parts of the timestamp
    const year = parseInt(timestamp.slice(0, 4), 10);
    const month = parseInt(timestamp.slice(4, 6), 10) - 1; // Months are zero-indexed in JS
    const day = parseInt(timestamp.slice(6, 8), 10);
    const hours = parseInt(timestamp.slice(9, 11), 10);
    const minutes = parseInt(timestamp.slice(11, 13), 10);
    const seconds = parseInt(timestamp.slice(13, 15), 10);
    const milliseconds = parseFloat(timestamp.slice(16)) * 1000; // Convert fractional seconds to milliseconds

    // Create a Date object
    const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);

    // Return a readable format
    return date.toLocaleString(); // E.g., "11/10/2024, 6:10:00 PM"
}

// Example usage:
// const readableDate = parseCustomTimestamp("20241110T181000.053437");
// console.log(readableDate); // Outputs a readable date format, e.g., "11/10/2024, 6:10:00 PM"
