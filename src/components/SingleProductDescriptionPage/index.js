"use client"
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BlouseDetailsData } from '@/components/BlouseData/Data.BlouseDetails';
import { BlouseExtraData } from '@/components/BlouseData/Data.BlouseExtras';
import { BlouseSleevesData } from '@/components/BlouseData/Data.BlouseSleeves';
import Image from 'next/image';
import { GET_FABRIC_PRODUCTS } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import FabricCard from '../Assests/FabricCard';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import BlousePriceCalTable from '@/components/Assests/BlousePriceCalTable';
import { setProductID } from '@/redux/reducers/productSlice';




const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
const SingleProductDescriptionPage = ({ products }) => {
   const dispatch = useDispatch();
  const productID = products.name;
  console.log(products,'prodId')
  // 
  const reduxProductID = useSelector((state) => state.productID);
  console.log(reduxProductID,'prodId')
  // State to manage the currently selected image for larger view
  

  // State to manage selected size and its prices
  const [localSelectedFabric, setLocalSelectedFabric] = useLocalStorage(`fabric_${products.name}`, null);
  const [localSelectedLinigFabric, setLocalSelectedLiningFabric] = useLocalStorage(`Liningfabric_${products.name}`, null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedRegularPrice, setSelectedRegularPrice] = useState(null);
  const [selectedBlouseExtraItem, setSelectedBlouseExtraItem] = useState(null);
  const [selectedBlouseDetailsItem, setSelectedBlouseDetailsItem] = useState(null);
  const [selectedBlouseSleevesItem, setSelectedBlouseSleevesItem] = useState(null);
 const [SingleProduct, setSingleProduct] = useState(null);
 const [flagForExtra, setFlagForExtra] = useState(true);
 
  // Check if products is undefined or in pending state


    // console.log(productID);
    const queryVariables = {
      firstt: 4,
      cat: "fabric_swatch",
      mafter: null,
    };
  
  
    const { loading, error, data, fetchMore } = useQuery(GET_FABRIC_PRODUCTS, {
      variables: queryVariables,
    });
    const queryVariables2 = {
      firstt: 4,
      cat: "Lining Fabric",
      mafter: null,
    };
  
  
    const { loading: loading2, error: error2, data: data2, fetchMore: fetchMore2 } = useQuery(GET_FABRIC_PRODUCTS, {
      variables: queryVariables2,
    });
  useEffect(() => {
    if (reduxProductID === null || reduxProductID !== productID) {
      dispatch(setProductID(productID));
    }
  }, [productID, reduxProductID, dispatch]);
  

  
  useEffect(() => {
    const selectedBlouseSleevesItemFromStorage = localStorage.getItem(`selectedBlouseSleevesItem_${productID}`);
    const selectedBlouseDetailsItemFromStorage = localStorage.getItem(`selectedBlouseDetailsItem_${productID}`);
    const selectedBlouseExtraItemFromStorage = localStorage.getItem(`selectedBlouseExtraItem_${productID}`);
    const selectedSizeFromStorage = localStorage.getItem(`selectedSize_${productID}`);
    const selectedPriceFromStorage = localStorage.getItem(`selectedPrice_${productID}`);
    const selectedRegularPriceFromStorage = localStorage.getItem(`selectedRegularPrice_${productID}`);

    if (selectedBlouseSleevesItemFromStorage) {
      setSelectedBlouseSleevesItem(JSON.parse(selectedBlouseSleevesItemFromStorage));
    }
    if (selectedBlouseDetailsItemFromStorage) {
      setSelectedBlouseDetailsItem(JSON.parse(selectedBlouseDetailsItemFromStorage));
    }
    if (selectedBlouseExtraItemFromStorage) {
      setSelectedBlouseExtraItem(JSON.parse(selectedBlouseExtraItemFromStorage));
    }
    if (selectedSizeFromStorage) {
      setSelectedSize(selectedSizeFromStorage);
    }
    if (selectedPriceFromStorage) {
      setSelectedPrice(selectedPriceFromStorage);
    }
    if (selectedRegularPriceFromStorage) {
      setSelectedRegularPrice(selectedRegularPriceFromStorage);
    }
  }, [productID]);
  useEffect(() => {
    const selectedSizeFromStorage = localStorage.getItem(`selectedSize_${productID}`);
    const selectedPriceFromStorage = localStorage.getItem(`selectedPrice_${productID}`); 
    const selectedRegularPriceFromStorage = localStorage.getItem(`selectedRegularPrice_${productID}`); 
    if (selectedSizeFromStorage) {
      setSelectedSize(selectedSizeFromStorage);
      
    }
    if (selectedPriceFromStorage) {
      setSelectedPrice(selectedPriceFromStorage);
      
    }
    if (selectedRegularPriceFromStorage) {
      setSelectedRegularPrice(selectedRegularPriceFromStorage);
      
    }
  }, []);
  // Handlers to update selected items and store in session storage

  // console.log(data2,"data2");
  // Destructure necessary properties from products
  const { image, galleryImages } = products;
  const [selectedImage, setSelectedImage] = useState(image.sourceUrl);
  // Handle click on gallery image to update the selected image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
 

 
  const handleBlouseSleevesClick = (item) => {
  
 {
      // Select the item
      setSelectedBlouseSleevesItem(item);
      localStorage.setItem(`selectedBlouseSleevesItem_${productID}`, JSON.stringify(item));
      // setFlagForExtra(true)
    }
  };
  const handleToRemoveSleeves =(item)=>{
    setSelectedBlouseSleevesItem(null);
      localStorage.removeItem(`selectedBlouseSleevesItem_${productID}`);
  }
  const handleBlouseDetailsClick = (item) => {
    const isSelected = selectedBlouseDetailsItem?.id === item.id;
  
 {
      // Select the item
      setSelectedBlouseDetailsItem(item);
      localStorage.setItem(`selectedBlouseDetailsItem_${productID}`, JSON.stringify(item));
    }
  };
  const handleToRemoveDetails =(item)=>{
    setSelectedBlouseDetailsItem(null);
      localStorage.removeItem(`selectedBlouseDetailsItem_${productID}`);
  }
  const handleBlouseExtraItemClick = (item) => {
    const isSelected = selectedBlouseExtraItem?.id === item.id;
  
    {
      // Select the item
      setSelectedBlouseExtraItem(item);
      localStorage.setItem(`selectedBlouseExtraItem_${productID}`, JSON.stringify(item));
    }
  };
  const handleToRemoveExtra =(item)=>{
    setSelectedBlouseExtraItem(null);
      localStorage.removeItem(`selectedBlouseExtraItem_${productID}`);
  }
  const handleOnClick = (chestSize, price, regularPrice) => {
    setSelectedSize(chestSize);
    setSelectedPrice(price);
    setSelectedRegularPrice(regularPrice);
    localStorage.setItem(`selectedSize_${productID}`, chestSize);
    localStorage.setItem(`selectedPrice_${productID}`, price);
    localStorage.setItem(`selectedRegularPrice_${productID}`, regularPrice);
  };
 
  
  // Extract product name from products
  const productName = products.name.split(' - ')[0];

  // Settings for the carousel (react-slick settings)
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 1,
    centerMode: true, // Center the carousel
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  if (!products) {
    return <div>Loading...</div>;
    // You can customize the loading state as per your UI/UX requirements
  }
  
  return (
    <>
      <div className="flex flex-row">
        {/* Main Product Image */}
        <div className="md:w-2/3 md:mr-4 mb-4 md:mb-0">
          <img
            src={selectedImage}
            alt="Product Image"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Gallery Images */}
        <div className="flex flex-row md:flex-col flex-wrap">
          {galleryImages.nodes.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(image.sourceUrl)} className="cursor-pointer mx-2 mb-2">
              <img
                src={image.sourceUrl}
                alt={`Image ${index}`}
                className="object-cover w-32 h-auto md:w-80 md:h-60 "
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className=' bg-clip-text text-transparent bg-gradient-to-t from-[#2e1065] to-[#db2777] text-2xl md:text-6xl flex justify-center'>
        <b>{productName}</b>
      </div>

      {/* Sizes */}
      <span className='flex flex-row flex-wrap gap-2 justify-center mt-8 mb-8'>
        {products.variations.nodes.map((variation, index) => {
          const chestSize = variation.name.match(/Chest Size (\d+)/);
          const price = variation.price; // Assuming price is available in your variation object
          const regularPrice = variation.regularPrice; // Assuming regularPrice is available in your variation object

          return (
            <span key={index} className="flex items-center">
              <span
                className={`border-4 border-[#500724] rounded-md bg-[#ffe4e6] px-3 py-1 shadow-md cursor-pointer ${selectedSize === (chestSize ? chestSize[1] : 'Unknown Size') ? 'bg-[#f3e8ff] text-[#dc2626] text-bold' : ''
                  }`}
                onClick={() => handleOnClick(chestSize ? chestSize[1] : 'Unknown Size', price, regularPrice)}
              >
                {chestSize ? chestSize[1] : 'Unknown Size'}
              </span>
              {index !== products.variations.nodes.length - 1 && (
                <span className="border-l border-black h-6 mx-2 "></span>
              )}
            </span>
          );
        })}
      </span>

      {/* Selected Size and Prices */}
      {selectedSize && (
        <div className='flex flex-col justify-center items-center  text-center mt-4 '>
          {selectedRegularPrice && (
            <p className=' text-[#dc2626] text-xl md:text-3xl'>
              Market Tailoring Cost :  <span style={{ textDecoration: 'line-through' }}>{selectedRegularPrice}</span>
            </p>
          )}
          <p className='text-[#166534] text-2xl md:text-4xl'><b><u>Our Tailoring Cost : {selectedPrice}</u></b></p>
        </div>
      )}
      {/* Product Description */}
      <div className='mx-2 mt-8' dangerouslySetInnerHTML={{ __html: products.shortDescription }} />

      <div className=' bg-clip-text text-transparent bg-gradient-to-t from-[#2e1065] to-[#db2777] text-2xl md:text-6xl flex justify-center mt-20'>
        <b>Personalize your style</b>
      </div>

      {/* Slider for Blouse Sleeves Data */}
      <div className='text-2xl md:text-4xl flex justify-center mt-20'>Select Sleeves designs</div>
      <div className='mx-2 md:mx-6 p-2 mt-6 '>
        <Slider {...carouselSettings}>
          {BlouseSleevesData.map((item, index) => (
            <div key={index} style={{ margin: '10px' }}  onClick={() => handleBlouseSleevesClick (index)}>
              <Image
                src={item.image}
                alt='hh'
                height={200}
                width={180}
                loading='lazy'
                className={`border-2 rounded-md ${selectedBlouseSleevesItem === index ? 'border-solid border-4 border-[#831843] shadow-xl' : 'border-gray-400'}`}
              />
              <div className='text-bold'>
              <p className={`${selectedBlouseSleevesItem === index ? 'text-[#831843] ':'text-[#db2777]'}`} ><b>{item.name}</b></p>
              <p className={`${selectedBlouseSleevesItem === index ? 'text-[#831843]':'text-[#db2777]'}`}><b>Price: ₹ {item.price}/-</b></p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className='flex justify-center mt-4'>
      <button className='border-2 border-black  bg-[#4a044e] text-white  p-2  rounded-md hover:bg-[#a21caf]' onClick={() => handleToRemoveSleeves(selectedBlouseSleevesItem)}>Click To Remove Sleeve</button>
          </div>
    
      {/* Slider for Blouse Details */}
      <div className='text-2xl md:text-4xl flex justify-center mt-20'>Select Blouse Details</div>
      <div className='mx-2 md:mx-6 p-2 mt-6'>
        <Slider {...carouselSettings}>
          {BlouseDetailsData.map((item, index) => (
            <div key={index} style={{ margin: '10px' }}  onClick={() =>handleBlouseDetailsClick (index)}>
              <Image
                src={item.image}
                alt='hh'
                height={200}
                width={180}
                loading='lazy'
                className={`border-2 margin-2 rounded-md ${selectedBlouseDetailsItem === index ? 'border-solid border-4 border-[#831843] shadow-xl' : 'border-gray-400'}`}
              />
              <div className='text-bold'>
              <p className={`${selectedBlouseDetailsItem === index ? 'text-[#831843] ':'text-[#db2777]'}`} ><b>{item.name}</b></p>
              <p className={`${selectedBlouseDetailsItem === index ? 'text-[#831843]':'text-[#db2777]'}`}><b>Price: ₹ {item.price}/-</b></p>
              </div>
            </div>
          ))}
        </Slider>
        
      </div>
      <div className='flex justify-center mt-4'>
      <button className='border-2 border-black  bg-[#4a044e] text-white  p-2  rounded-md hover:bg-[#a21caf]' onClick={() => handleToRemoveDetails(selectedBlouseDetailsItem)}>Click To Remove Detail</button>
      </div>
      {/* Slider for Blouse Extra Data */}
      <div className='text-2xl md:text-4xl flex justify-center mt-20'>Select Blouse Extra </div>
      <div className='mx-2 md:mx-6 p-2 mt-6 '>
        <Slider {...carouselSettings}>
          {BlouseExtraData.map((item, index) => (
            <div key={index} style={{ margin: '10px' }} onClick={() => handleBlouseExtraItemClick(index)}>
              <Image
                src={item.image}
                alt='hh'
                height={200}
                width={180}
                loading='lazy'
                className={`border-2 rounded-md ${selectedBlouseExtraItem === index ? 'border-solid border-4 border-[#831843] shadow-xl' : 'border-gray-400'}`}
              />
              <div className='text-bold'>
                <p className={`${selectedBlouseExtraItem === index ? 'text-[#831843] ':'text-[#db2777]'}`} ><b>{item.name}</b></p>
                <p className={`${selectedBlouseExtraItem === index ? 'text-[#831843]':'text-[#db2777]'}`}><b>Price: ₹ {item.price}/-</b></p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className='flex justify-center mt-4'>
      <button className='border-2 border-black  bg-[#4a044e] text-white  p-2  rounded-md hover:bg-[#a21caf]' onClick={() => handleToRemoveExtra(selectedBlouseExtraItem)}>Click To Remove Extra</button>
          </div>

      <div className='text-2xl md:text-4xl flex justify-center mt-20'>Elevate your designs with our premium fabrics.</div>

  
      <div className='text-xl md:text-2xl flex justify-center mt-20'><strong>Choose the Main Fabric</strong></div>
      <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-[#fff1f2]">
   
      {data && data.products && data.products.edges.map((edge, index) => (
              
            
              <FabricCard
              key={edge.node.id} 
                name={edge.node.name}
                image={edge.node.image.sourceUrl}
                slug={edge.node.slug}
                price={edge.node.price}
                setSingleProduct={setSingleProduct}
              />

            
            ))}
 </div>
    </div>
 <div className='flex justify-center mb-8 mt-8'>
  <Link href='../Fabric_Store'>
      <button className="cursor-pointer text-white font-bold shadow-md hover:scale-[1.2] shadow-purple-400 rounded-full px-5 py-2 bg-gradient-to-bl from-[#F97794] to-[#623AA2]">
  See More Main Fabrics....
</button>
</Link>

</div>




<div className=''>  {localSelectedFabric && (
        <div className='mt-10 text-center'>
          <h2 className='text-2xl md:text-4xl'>Selected Main Fabric:</h2>
          <Image src={localSelectedFabric.image} alt={localSelectedFabric.name} height={100} width={100} className='mt-4 mx-auto' />
          <p className='text-xl'>{localSelectedFabric.name}</p>
          <p className='text-lg text-[#4c0519]'><b>Price:  {localSelectedFabric.price} per meter</b></p>
        </div>
      )}</div>


<div className='text-xl md:text-2xl flex justify-center mt-20'><strong>Choose the Lining Fabric</strong></div>
<div className="container mx-auto ">
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-[#fff1f2] ">
  
      {data2 && data2.products && data2.products.edges.map((edge, index) => (
              
            
              <FabricCard
              key={edge.node.id} 
                name={edge.node.name}
                image={edge.node.image.sourceUrl}
                slug={edge.node.slug}
                price={edge.node.price}
                setSingleProduct={setSingleProduct}
              />

            
            ))}
 </div>
    </div>
   
 <div className='flex justify-center mb-8 mt-8'>
  <Link href='../Lining_Store'>
      <button className="cursor-pointer text-white font-bold shadow-md hover:scale-[1.2] shadow-purple-400 rounded-full px-5 py-2 bg-gradient-to-bl from-[#F97794] to-[#623AA2]">
  See More Lining Fabrics....
</button>
</Link>

</div>





<div className=''>  {localSelectedLinigFabric && (
        <div className='mt-10 text-center'>
          <h2 className='text-2xl md:text-4xl'>Selected Lining Fabric:</h2>
          <Image src={localSelectedLinigFabric.image} alt={localSelectedLinigFabric.name} height={100} width={100} className='mt-4 mx-auto' />
          <p className='text-xl'>{localSelectedLinigFabric.name}</p>
          <p className='text-lg text-[#4c0519]'><b>Price:  {localSelectedLinigFabric.price} per meter</b></p>
        </div>
      )}</div>



      {/* Selected Blouse Data Section */}
<div className='mt-10 text-center flex flex-row gap-4 justify-center'>
 
</div>

<BlousePriceCalTable
  productName={productName}
  productPrice={selectedPrice}
  sleevesName={BlouseSleevesData[selectedBlouseSleevesItem]?.name}
  sleevesPrice={BlouseSleevesData[selectedBlouseSleevesItem]?.price}
  detailsName={BlouseDetailsData[selectedBlouseDetailsItem]?.name}
  detailsPrice={BlouseDetailsData[selectedBlouseDetailsItem]?.price}
  extraName={BlouseExtraData[selectedBlouseExtraItem]?.name}
  extraPrice={BlouseExtraData[selectedBlouseExtraItem]?.price}
  mainFabricName={localSelectedFabric?.name}
  mainFabricPrice={localSelectedFabric?.price}
  liningFabricName={localSelectedLinigFabric?.name}
  liningFabricPrice={localSelectedLinigFabric?.price}
  productImage={products.image.sourceUrl}
  productID={productID}
  RegularPrice={selectedRegularPrice}
/>


   </>
  );
};

export default SingleProductDescriptionPage;


