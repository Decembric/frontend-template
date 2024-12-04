import { useDispatch, useSelector } from "react-redux";

import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import WaterItem from "../WaterItem/WaterItem";
import s from "./WaterList.module.css";
// import { useSelector } from "react-redux";
import { selectWaterItems } from "../../redux/water/selectors";
import { useEffect } from "react";
import { fetchWaterItems } from "../../redux/water/operations";
const WaterList = () => {
  const items = useSelector(selectWaterItems());

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWaterItems());
  }, [dispatch]);
  return (
    <ul className={s.wrapper}>
      <Swiper
        // install Swiper modules
        modules={[Scrollbar]}
        spaceBetween={8}
        slidesPerView={2}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {items.map((item) => {
          return (
            <li key={item._id}>
              <SwiperSlide>
                <WaterItem
                  id={item._id}
                  amount={item.amount}
                  createdAt={item.createdAt}
                />
              </SwiperSlide>
            </li>
          );
        })}

        {/* <SwiperSlide>
          <WaterItem />
        </SwiperSlide>
        <SwiperSlide>
          <WaterItem />
        </SwiperSlide>
        <SwiperSlide>
          <WaterItem />
        </SwiperSlide>
        <SwiperSlide>
          <WaterItem />
        </SwiperSlide> */}
      </Swiper>
      {/* <WaterItem />
      <WaterItem />
      <WaterItem /> */}
      {/* {items.map((item) => {
        return (
          <li key={item._id}>
            <WaterItem
              id={item._id}
              amount={item.amount}
              createdAt={createdAt}
            />
          </li>
        );
      })} */}
    </ul>
  );
};

export default WaterList;
