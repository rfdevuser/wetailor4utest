import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#500724] dark:bg-gray-700 text-white py-8 "  style={{ 
        backgroundImage: `url('/backgrond/footerbg2.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
      <div className="max-w-screen-xl mx-auto px-4">
    
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Address Section */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Our Address</h3>
            <p>Rakhis Fashions</p>
            <p>19 , 2nd floor , 1st cross B-Block,</p>
            <p>4th main road Vinayaka Nagar , HAL Airport road</p>
            <p>Bengaluru, Karnataka 560017</p>
          </div>
          
          {/* Contact Info */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p>Email: hr@rakhisfashions.com</p>
            <p>Phone: +91 9916214043</p>
          </div>
        </div>

      
        {/* Map Section */}
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Location Map</h3>
          <div className="relative w-full h-48 md:h-64 border-2 border-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              allowFullScreen
              title="Onati Global Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.099051299844!2d77.65718521483686!3d12.95413019086904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae173f2d5533a1%3A0x9b0481f2923aa1f4!2sOnati%20Global!5e0!3m2!1sen!2sin!4v1619787113557!5m2!1sen!2sin"
            ></iframe>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
