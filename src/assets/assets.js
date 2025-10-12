import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.jpg'
import roomImg2 from './roomImg2.jpg'
import roomImg3 from './roomImg3.jpg'
import roomImg4 from './roomImg4.jpg'
import roomImg5 from './roomImg5.jpg'
import roomImg6 from './roomImg6.jpg'
import roomImg7 from './roomImg7.jpg'
import roomImg8 from './roomImg8.jpg'
import roomImg9 from './roomImg9.jpg'
import roomImg10 from './roomImg10.jpg'
// import roomImg11 from './roomImg11.jpg'
import roomImg12 from './roomImg12.jpg'
import roomImg13 from './roomImg13.jpg'
import roomImg14 from './roomImg14.jpg'
import roomImg15 from './room15.jpg'
import roomImg16 from './roomImg16.jpg'
import roomImg17 from './roomImg17.jpg'
import roomImg18 from './roomImg18.jpg'
import roomImg19 from './roomImg19.jpg'
import roomImg20 from './roomImg20.jpg'
import roomImg21 from './roomImg21.jpg'
import roomImg22 from './roomImg22.jpg'
import roomImg23 from './roomImg23.jpg'
import roomImg24 from './roomImg24.jpg'
import roomImg25 from './roomImg25.jpg'
// import roomImg from './roomImg.jpg'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
// import { v4 as uuidv4} from 'uuid';


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    // regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Dubai",
    "Singapore",
    "New York",
    "London",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    address: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    review:
      "Booking through this platform made my trip stress free. I found great hotels at fair prices, and everything was confirmed instantly!",
  },
  {
    id: 2,
    name: "Liam Johnson",
    address: "New York, USA",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 4,
    review:
      "The system is really easy to use I could compare rooms, check amenities, and make reservations in just a few minutes. Highly reliable!",
  },
  {
    id: 3,
    name: "Sophia Lee",
    address: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
    rating: 5,
    review:
      "Excellent service and user friendly interface. I booked my family vacation smoothly, and the support team was very responsive!",
  },
  {
    id: 4,
    name: "David Chen",
    address: "Singapore",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200",
    rating: 5,
    review:
      "Everything went perfectly! The hotel matched the photos and description exactly. I’ll definitely use this booking system again.",
  },
  {
    id: 5,
    name: "Isabella Rossi",
    address: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=200",
    rating: 4,
    review:
      "I loved how easy it was to find available rooms. The filters made it simple to choose the perfect stay within my budget.",
  },
];


// Facility Icon
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Great Stack",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Urbanza Suites",
    "address": "Main Road  123 Street , 23 Colony",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

// Rooms Dummy Data
export const roomsDummyData = [
    {
    _id:" room1", // Unique ID
    roomType: "Double Bed",
    pricePerNight: 399,
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    images: [roomImg2, roomImg1, roomImg12, roomImg13, roomImg25 ],
    isAvailable: true,
    name: "Special Gardens",
    address: "Main Road Street ",
  },

    {
    _id: "room2", // Unique ID
    roomType: "Double Bed",
    pricePerNight: 350,
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    images: [roomImg23, roomImg24, roomImg20, roomImg18, roomImg7 ],
    isAvailable: true,
    name: "Special Gardens",
    address: "Main Road Street",
  },

    {
    _id:" room3", // Unique ID
    roomType: "Single Bed",
    pricePerNight: 250,
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    images: [roomImg15, roomImg8, roomImg13, roomImg16, roomImg22 ],
    isAvailable: true,
    name: "Special Gardens",
    address: "Main Road Street ",
  },

    {
    _id: "room4", // Unique ID
    roomType: "Family suite",
    pricePerNight: 400,
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    images: [roomImg5, roomImg6, roomImg9, roomImg14, roomImg17 ],
    isAvailable: true,
    name: "Special Gardens",
    address: "Main Road Street",
  },

    {
    _id: "room5", // Unique ID
    roomType: "Family suite",
    pricePerNight: 400,
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    images: [roomImg10, roomImg19, roomImg21, roomImg4, roomImg3 ],
    isAvailable: true,
    name: "Special Gardens",
    address: "Main Road Street",
  },
    // {
    //     "_id": "67f76452197ac559e4089b8e",
    //     "hotel": hotelDummyData,
    //     "roomType": "Double Bed",
    //     "pricePerNight": 299,
    //     "amenities": ["Room Service", "Mountain View", "Pool Access"],
    //     "images": [roomImg2, roomImg3, roomImg4, roomImg1],
    //     "isAvailable": true,
    //     "createdAt": "2025-04-10T06:25:22.593Z",
    //     "updatedAt": "2025-04-10T06:25:22.593Z",
    //     "__v": 0
    // },
    // {
    //     "_id": "67f76406197ac559e4089b82",
    //     "hotel": hotelDummyData,
    //     "roomType": "Double Bed",
    //     "pricePerNight": 249,
    //     "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
    //     "images": [roomImg3, roomImg4, roomImg1, roomImg2],
    //     "isAvailable": true,
    //     "createdAt": "2025-04-10T06:24:06.285Z",
    //     "updatedAt": "2025-04-10T06:24:06.285Z",
    //     "__v": 0
    // },
    // {
    //     "_id": "67f763d8197ac559e4089b7a",
    //     "hotel": hotelDummyData,
    //     "roomType": "Single Bed",
    //     "pricePerNight": 199,
    //     "amenities": ["Free WiFi", "Room Service", "Pool Access"],
    //     "images": [roomImg4, roomImg1, roomImg2, roomImg3],
    //     "isAvailable": true,
    //     "createdAt": "2025-04-10T06:23:20.252Z",
    //     "updatedAt": "2025-04-10T06:23:20.252Z",
    //     "__v": 0
    // }
]



// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/