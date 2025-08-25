import { useNavigate } from 'react-router-dom';
import goldOilImage from '../../assets/Image/body-care.png';
import faceWashImage from '../../assets/Image/skin-care.png';
import   shampooImage from '../../assets/Image/hair-care.png';
import soapbarImage from '../../assets/Image/soap-bars.png';

const careData = [
  {
    id: 1,
    title: 'Body Care',
    description:
      'Indulge in the essence of nature with our nurturing body care range',
    image: goldOilImage,
    type: 'Body Care',
  },
  {
    id: 2,
    title: 'Skin Care',
    description:
      'Reveal your skin’s true radiance with our range of nurturing and homemade skincare products ',
    image: faceWashImage,
    type: 'Skin Care',
  },
  {
    id: 3,
    title: 'Hair Care',
    description:
      'Homemade products designed to combat dandruff, minimize hair loss, reverse premature graying, and enhance hair texture',
    image: shampooImage,
    type: 'Hair Care',
  },
  {
    id: 4,
    title: 'Soap Bars',
    description:
      'Pamper your skin with our daily cleansing Ayurvedic soaps for nourished and revitalized skin',
    image: soapbarImage,
    type: 'Soap Bars',
  },
];

const Care = () => {
  const navigate = useNavigate();

  // Handle category click to pass the category type to the next page
  const handleCategoryClick = (category) => {
    navigate(`/shop`, { state: { category } }); // Pass the category as state to the next page
  };

  return (
    <div className=' py-16 px-4 md:px-6'>
      <div className='max-w-[1240px] mx-auto'>
        <h2 className='text-3xl md:text-5xl lg:text-[40px] tracking-wider font-young-serif  font-medium  xs:text-center leading-[56px]'>
         Find Your Ritual
        </h2>
        <p className='font-medium text-[18px] text-center mb-5 leading-[21px] font-ysabeau-medium'>Explore skincare made for every part of you—face, body, hair & more.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {careData.map((item) => (
            <div
              key={item.id}
              className='relative   overflow-hidden group cursor-pointer'
              onClick={() => handleCategoryClick(item.type)}
            >
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-[220px] md:w-[615px] md:h-[290px] object-cover  transition-opacity duration-300'
              />
              {/* 50% width border line */}
              <div className="w-1/2 border-b-[1px] h-1 border-[#5C3822] py-1"></div>
              {/* Left-aligned text below the border */}
              <div className="py-2 text-left text-[#5C3822] text-lg font-semibold px-1">
               {item.type}
              </div>
              {/* Overlay text without background color */}
              <div className='absolute inset-0 flex items-center'>
                <div className='text-left px-6 md:px-10'>
                  <h3 className='text-xl md:text-5xl text-white mb-2 md:mb-4'>
                    {item.title}
                  </h3>
                  <p className='text-xs md:text-sm text-white'>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Care;
