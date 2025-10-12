import React from 'react'

const NewsLetter = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section className="flex flex-col items-center justify-center px-4 py-16">
        {/* Tag line */}
        <div className="flex items-center gap-2 text-sm text-blue-500 bg-indigo-50 rounded-full px-3 py-1">
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.613 8.2a.62.62 0 0 1-.553-.341.59.59 0 0 1 .076-.637l6.048-6.118a.31.31 0 0 1 .375-.069c.061.033.11.084.137.147a.3.3 0 0 1 .014.197L6.537 4.991a.59.59 0 0 0 .07.552.61.61 0 0 0 .504.257h4.276a.62.62 0 0 1 .553.341.59.59 0 0 1-.076.637l-6.048 6.119a.31.31 0 0 1-.375.067.295.295 0 0 1-.15-.344l1.172-3.61a.59.59 0 0 0-.07-.553.61.61 0 0 0-.504-.257z"
              stroke="currentColor" strokeMiterlimit="5.759" strokeLinecap="round" />
          </svg>
          <span>Stay Updated</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mt-4 text-center">
          Get the Best Hotel Deals in Your Inbox
        </h1>

        {/* Description */}
        <p className="max-w-lg text-center text-slate-500 mt-6">
          Subscribe to receive exclusive offers, discounts, and updates from our hotel reservation platform. Never miss a great stay again!
        </p>

        {/* Form */}
        <form className="relative flex items-center rounded-md border border-blue-500 mt-6 text-sm max-w-md w-full">
          <svg className="absolute left-3" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 6 9.505 8.865a1 1 0 0 1-1.005 0L4 6" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.3 1H2.7C1.761 1 1 1.84 1 2.875v11.25C1 15.161 1.761 16 2.7 16h13.6c.939 0 1.7-.84 1.7-1.875V2.875C18 1.839 17.239 1 16.3 1" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="focus:outline-none pl-10 py-5 bg-transparent w-full"
            required
          />
          <button className="shrink-0 mr-2 cursor-pointer px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-blue-800 rounded-md active:scale-95 transition duration-300 text-white">
            Subscribe
          </button>
        </form>
      </section>
    </>
  )
}

export default NewsLetter
