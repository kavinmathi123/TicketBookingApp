let submitBtn = document.getElementById('submit-btn');
let searchBtn = document.getElementById('search-btn');
const inforBox = document.querySelector(".inforBox");
let Booking = [];

function handleClick() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    let tickets = parseInt(document.getElementById('tickets').value);

    let seatsAvailable = parseInt(document.getElementById("seats-available").textContent);
    let ticketsSold = parseInt(document.getElementById("tickets-sold").textContent);

    // Input validation
    if (!name || !email || isNaN(tickets) || tickets <= 0) {
        alert("Please enter valid booking information.");
        return;
    }

    if (tickets > seatsAvailable) {
        alert("Not enough seats available!");
        return;
    }

    // Update seats
    seatsAvailable -= tickets;
    ticketsSold += tickets;

    // Store booking information
    Booking.push({ name, email, tickets });

    // Update the UI
    document.getElementById("seats-available").textContent = seatsAvailable;
    document.getElementById("tickets-sold").textContent = ticketsSold;

    // Clear the input fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('tickets').value = '';

    // Check if tickets are sold out
    if (seatsAvailable === 0) {
        document.getElementById('sold-out-message').style.display = 'block';
        submitBtn.disabled = true;  // Disable the submit button
        document.querySelector('.inforBox').style.display = 'none';
    }

    console.log(Booking);
}

function handleSearch() {
    const userEmail = document.getElementById('userEmail').value.trim();
    const userBooking = Booking.filter(b => b.email === userEmail);

    if (userBooking.length > 0) {
        const bookingList = userBooking.map(b => `Name: ${b.name}, Tickets Booked: ${b.tickets}`).join('\n');
        document.getElementById('search-result').textContent = bookingList;
    } else {
        document.getElementById('search-result').textContent = 'No booking found for this email';
    }
}

submitBtn.addEventListener("click", handleClick);
searchBtn.addEventListener("click", handleSearch);
