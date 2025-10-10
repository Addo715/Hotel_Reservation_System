import React from 'react'

const Footer = () => {
  return (
     <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-black bg-gray-100">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-blue-500 pb-10">
                <div className="md:max-w-96">
                    {/* <img alt="" class="h-11" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiLogoSquareShape.svg" /> */}
                    <h1>name of hotel or logo</h1>
                    <p className="mt-6 text-sm">
                        A modern and convenient platform designed to make hotel bookings easier. 
                        Discover comfortable stays, compare options, and reserve your room 
                        in just a few clicks anytime, anywhere.
                    </p>
                </div>

                <div className="flex-1 flex flex-col sm:flex-row items-start md:justify-end gap-10 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5 text-blue-500">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-5 text-blue-500">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+233-555-555-555</p>
                            <p>contact@hotelname.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © <a>name of hotel</a>. All Right Reserved.
            </p>
        </footer>
  )
}

export default Footer
