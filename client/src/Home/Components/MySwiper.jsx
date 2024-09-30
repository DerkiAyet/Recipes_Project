import React, { useContext } from 'react'
import '../Styles/HomePage.css'
import CakeImg from '../../Assets/cake.jpeg';
import Chef from '../../Assets/Chef.jpeg';
import Instructions from '../../Assets/instructions.jpeg';
import Savings from '../../Assets/Savings.jpeg';
import Rating from '../../Assets/rating.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../Styles/MySwiper.css';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";
import { AppContext } from '../../App';

export const MySwiper = () => {

  const { t } = useTranslation();

  const { isRtl } = useContext(AppContext);

  return (
    <div className="slider">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={false}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3500, disableOnInteraction: false, stopOnLastSlide: true }}
        speed={1800}
      >
        <SwiperSlide>
          <div className="item">

            <div className="slide-img-box">
              <img src={CakeImg} alt="" />
            </div>
            <div className="slide-content-box">
              <div className=" swiper-arrow swiper-arrow-left">
                <i class={isRtl ? "ri-arrow-left-line" : "ri-arrow-right-line"}></i>
              </div>
              <div className="text">
                <h1 style={{ textTransform: 'capitalize' }}>
                  {t('swiper1Title')}
                </h1>
                <p>
                  {t('swiper1Desc')}
                </p>
              </div>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">

            <div className="slide-content-box">
              <div className="swiper-arrow swiper-arrow-right">
                <i class={isRtl ? "ri-arrow-right-line" : "ri-arrow-left-line"}></i>
              </div>
              <div className="text">
                <h1 style={{ textTransform: 'capitalize' }}>
                  {t('swiper2Title')}
                </h1>
                <p>
                  {t('swiper2Desc')}
                </p>
              </div>
            </div>
            <div className="slide-img-box">
              <img src={Chef} alt="" />
              <div className="swiper-arrow swiper-arrow-left">
                <i class={isRtl ? "ri-arrow-left-line" : "ri-arrow-right-line"}></i>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">

            <div className="slide-img-box">
              <img src={Instructions} alt="" />
              <div className="swiper-arrow swiper-arrow-right">
                <i class={isRtl ? "ri-arrow-right-line" : "ri-arrow-left-line"}></i>
              </div>
            </div>
            <div className="slide-content-box">
              <div className="swiper-arrow swiper-arrow-left">
                <i class={isRtl ? "ri-arrow-left-line" : "ri-arrow-right-line"}></i>
              </div>
              <div className="text">
                <h1 style={{ textTransform: 'capitalize' }}>
                  {t('swiper3Title')}
                </h1>
                <p>
                  {t('swiper3Desc')}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">

            <div className="slide-content-box">
              <div className="swiper-arrow swiper-arrow-right">
                <i class={isRtl ? "ri-arrow-right-line" : "ri-arrow-left-line"}></i>
              </div>
              <div className="text">
                <h1 style={{ textTransform: 'capitalize' }}>
                  {t('swiper4Title')}
                </h1>
                <p>
                  {t('swiper4Desc')}
                </p>
              </div>
            </div>
            <div className="slide-img-box">
              <img src={Savings} alt="" />
              <div className="swiper-arrow swiper-arrow-left">
                <i class={isRtl ? "ri-arrow-left-line" : "ri-arrow-right-line"}></i>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="slide-img-box">
              <img src={Rating} alt="" />
              <div className="swiper-arrow swiper-arrow-right">
                <i class={isRtl ? "ri-arrow-right-line" : "ri-arrow-left-line"}></i>
              </div>
            </div>

            <div className="slide-content-box">
              <div className="text">
                <h1 style={{ textTransform: 'capitalize' }}>
                  {t('swiper5Title')}
                </h1>
                <p>
                  {t('swiper5Desc')}
                </p>
              </div>
            </div>

          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}