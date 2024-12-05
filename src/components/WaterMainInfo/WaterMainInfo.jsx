import { useEffect } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import LangSwitch from "../LangSwitch/LangSwitch.jsx";
import { getWaterPerDay } from "../../redux/water/operations.js";
import { getUserInfo } from "../../redux/settings/operations.js";
import { useDispatch } from "react-redux";
import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    dispatch(getWaterPerDay(today));
  }, [dispatch]);

  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>aquatrack</h2>
        <LangSwitch />
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
      </div>
    </>
  );
};

export default WaterMainInfo;
