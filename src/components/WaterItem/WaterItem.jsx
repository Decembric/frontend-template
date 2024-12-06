import s from "./WaterItem.module.css";
import { useLanguage } from "../../locales/langContext.jsx";

const WaterItem = ({ amount, date, onEdit, openDeleteWaterModal }) => {
  const { t } = useLanguage();

  return (
    <div className={s.mainwrapper}>
      <div className={s.wrapper}>
        <svg className={s.waterglass}>
          <use href="/icons/sprite.svg#water-glass"></use>
        </svg>
        <div className={s.timewrapper}>
          <p className={s.amount}>
            {amount} {t("Ml")}
          </p>
          <p className={s.time}>{date}</p>
        </div>
        <div className={s.container}>
          <button onClick={onEdit} className={s.btn}>
            <svg className={s.edit}>
              <use href="/icons/sprite.svg#edit"></use>
            </svg>
          </button>
          <button className={s.btn} onClick={openDeleteWaterModal}>
            <svg className={s.trash}>
              <use href="/icons/sprite.svg#trash"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterItem;
