import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../Card';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CardSkeleton from '../skeletons/Cardskeleton';
import loadingGif from "../../assets/loader/loader.png";

const Winter = () => {
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        const prods = data.products || data;
        setProducts(
          prods.map(product => ({
            ...product,
            image: product.image.startsWith('http') ? product.image : `${API_URL}/${product.image}`,
          }))
        );
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => setShowLoader(false), 500);
    };

    window.addEventListener("load", handlePageLoad);
    if (document.readyState === "complete") handlePageLoad();

    if (!loading) setTimeout(() => setShowLoader(false), 300);

    return () => window.removeEventListener("load", handlePageLoad);
  }, [loading]);

  const calculateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1440) setSlidesToShow(4);
    else if (width >= 1024) setSlidesToShow(3);
    else if (width >= 768) setSlidesToShow(2);
    else setSlidesToShow(1);
  };

  useEffect(() => {
    calculateSlidesToShow();
    window.addEventListener('resize', calculateSlidesToShow);
    return () => window.removeEventListener('resize', calculateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    beforeChange: (_old, newIndex) => setCurrentSlide(newIndex),
  };

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide + slidesToShow >= products.length;

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (showLoader) {
    return (
      <div className="loading-screen">
        <img src={loadingGif} alt="Loading..." />
        <p>Loading...</p>
        <p>Discover our exclusive monsoon collection, crafted for Nidaspur's lush season—formulated to keep your skin fresh, healthy, and protected from humidity and rain.</p>
        {error && <p className="error-text">Error: {error}</p>}
      </div>
    );
  }

  return (
    <div className="winter-slider-wrapper">
      <Slider ref={sliderRef} {...settings}>
        {!loading && !error
          ? products.map(product => (
              <div key={product.id} onClick={() => handleProductClick(product)} className="card-wrapper">
                <Card product={product} />
              </div>
            ))
          : [...Array(slidesToShow)].map((_, i) => <CardSkeleton key={i} />)}
      </Slider>
      <button disabled={isPrevDisabled} onClick={() => sliderRef.current.slickPrev()} className="slider-arrow prev">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button disabled={isNextDisabled} onClick={() => sliderRef.current.slickNext()} className="slider-arrow next">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Winter;
