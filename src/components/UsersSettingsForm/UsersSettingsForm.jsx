import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import css from "./UsersSettingsForm.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectUser,
} from "../../redux/settings/selectors";
import { editUser } from "../../redux/settings/operations";
import { FcDecision } from "react-icons/fc";
import { useLanguage } from "../../locales/LangContext.jsx";

const validationSettingSchema = Yup.object().shape({
  avatarUrl: Yup.mixed().default(""),
  gender: Yup.string().oneOf(["woman", "man"]),
  name: Yup.string(),
  email: Yup.string().email("Invalid email"),
  weight: Yup.number().positive("Weight must be a positive number"),
  activeTime: Yup.number().min(0, "Active time cannot be negative"),
  dailyNorm: Yup.number().positive("Water norm must be a positive number"),
});

const UsersSettingsForm = () => {
  const { t } = useLanguage();

  const dispatch = useDispatch();

  const userName = useSelector(selectName);
  const userEmail = useSelector(selectEmail);
  const user = useSelector(selectUser);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [waterNorm, setWaterNorm] = useState("1.5");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userName,
      email: "",
      weight: 0,
      activeTime: 0,
      gender: "woman",
      dailyNorm: 1.5,
    },
    resolver: yupResolver(validationSettingSchema),
  });

  const weight = watch("weight");
  const activeTime = watch("activeTime");
  const gender = watch("gender");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatarUrl", file);
    } else if (!file) {
      setAvatarPreview(null);
      setValue("avatarUrl", "");
    } else {
      alert("Please select a valid image file.");
    }
  };

  useEffect(() => {
    if (userEmail) {
      const emailNamePart = userEmail.split("@")[0];
      setValue("name", emailNamePart);
    }
    setValue("email", userEmail);
  }, [userEmail, setValue]);

  useEffect(() => {
    if (user.avatarUrl) {
      setAvatarPreview(user.avatarUrl);
    } else if (userName) {
      setAvatarPreview(userName.charAt(0).toUpperCase());
    }
  }, [user.avatarUrl, userName]);

  useEffect(() => {
    if (weight && activeTime && gender) {
      let calculatedNorm = 1.5; // По умолчанию
      if (gender === "woman") {
        calculatedNorm = Math.max(weight * 0.03 + activeTime * 0.4, 0).toFixed(
          1
        );
      } else if (gender === "man") {
        calculatedNorm = Math.max(weight * 0.04 + activeTime * 0.6, 0).toFixed(
          1
        );
      }
      setWaterNorm(calculatedNorm);
    }
  }, [weight, activeTime, gender]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log("1", data);

    Object.entries(data).forEach(([key, value]) => {
      if (
        key === "avatarUrl" &&
        (!value || (value instanceof FileList && value.length === 0))
      ) {
        return;
      }
      formData.append(key, value instanceof FileList ? value[0] : value);
    });

    console.log("2", formData);

    try {
      dispatch(editUser(formData));
      // alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      // alert("Failed to update user. Please try again.");
    }
  };

  return (
    <form className={css.settingForm} onSubmit={handleSubmit(onSubmit)}>
      {/* Avatar */}
      <div className={css.settingFormAvatar}>
        {avatarPreview ? (
          <img
            className={css.settingAvatarImg}
            src={avatarPreview}
            alt="User Avatar"
          />
        ) : (
          <div className={css.avatarPlaceholder}>
            <FcDecision className={css.settingAvatarSecondIcon} />
          </div>
        )}
        <div>
          <button
            className={css.settingModalButton}
            type="button"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            <svg width="18" height="18" className={css.settingAvatarIcon}>
              <use href="/icons/sprite.svg#upload"></use>
            </svg>

            <span className={css.avatarButtonText}>{t("UploadAPhoto")}</span>
          </button>
          <input
            type="file"
            id="avatarInput"
            {...register("avatarUrl")}
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className={css.settingAllForms}>
        {/* Gender Form */}
        <div className={css.settingGenderForm}>
          <div>
            <label className={css.settingLabel}>{t("YourGender")}</label>
          </div>
          <div className={css.settingRadioButton}>
            <label className={css.settingRadioLabel}>
              <input
                type="radio"
                value="woman"
                {...register("gender")}
                className={css.settingRadioInput}
              />
              <span className={css.settingRadioCustom}></span>
              <span className={css.settingRadioText}>{t("Woman")}</span>
            </label>
            <label className={css.settingRadioLabel}>
              <input
                type="radio"
                value="man"
                {...register("gender")}
                className={css.settingRadioInput}
              />
              <span className={css.settingRadioCustom}></span>
              <span className={css.settingRadioText}>{t("Man")}</span>
            </label>
          </div>
          {errors.gender && (
            <p className={css.settingError}>{errors.gender.message}</p>
          )}
        </div>
        <div className={css.settingAllFormsDesctop}>
          <div>
            {/* Name and Email */}
            <div className={css.settingNameForm}>
              <div className={css.settingNameFormLabels}>
                <label className={css.settingLabel}>{t("YourName")}</label>
                <input
                  type="text"
                  {...register("name")}
                  className={css.settingFormInput}
                />
                {errors.name && (
                  <p className={css.settingError}>{errors.name.message}</p>
                )}
              </div>

              <div className={css.settingNameFormLabels}>
                <label className={css.settingLabel}>{t("Email")}</label>
                <input
                  type="email"
                  {...register("email")}
                  className={css.settingFormInput}
                />
                {errors.email && (
                  <p className={css.settingError}>{errors.email.message}</p>
                )}
              </div>
            </div>
            {/* Daily Norm Context */}
            <div className={css.settingDailyForm}>
              <label className={css.settingLabel}>{t("MyDailyNorma")}</label>
              <div className={css.settingDailyAllCard}>
                <div className={css.settingDailyCard}>
                  <p className={css.settingDailyContext}>{t("ForWoman")}:</p>
                  <p className={css.settingDailyFormula}>
                    V=(M*0.03) + (T*0.4)
                  </p>
                </div>
                <div className={css.settingDailyCard}>
                  <p className={css.settingDailyContext}>{t("ForMan")}:</p>
                  <p className={css.settingDailyFormula}>
                    V=(M*0.04) + (T*0.6)
                  </p>
                </div>
              </div>
              <div className={css.settingDailyDescription}>
                <p className={css.settingDailyDescrText}>
                  <span className={css.settingDailyDescriptionSpan}>*</span>
                  {t("Information")}
                </p>
              </div>
              <div>
                <p className={css.settingDailyRemark}>
                  <span className={css.settingDailyRemarkSpan}>!</span>
                  {t("ActiveTime")}
                </p>
              </div>
            </div>
          </div>
          <div className={css.settingAllFormsSecond}>
            {/* Weight and Time active */}
            <div className={css.settingWeightTimeForm}>
              <div className={css.settingWeightLabel}>
                <label className={css.settingWeightContext}>
                  {t("YourWeight")}
                </label>
                <input
                  type="number"
                  {...register("weight")}
                  className={css.settingFormInput}
                />
              </div>
              <div className={css.settingWeightLabel}>
                <label className={css.settingWeightContext}>
                  {t("TimeOfActive")}
                </label>
                <input
                  type="number"
                  {...register("activeTime")}
                  className={css.settingFormInput}
                />
              </div>
            </div>
            {/* Calculate Form */}
            <div className={css.settingCalculateForm}>
              <div className={css.settingCalculate}>
                <p className={css.settingCalculateText}>
                  {t("RequiredAmount")}
                </p>
                <p className={css.settingCalculateTextSpan}>{waterNorm}</p>
              </div>
              <div>
                <label className={clsx(css.settingLabel, css.settingLabelText)}>
                  {t("WriteDown")}
                </label>

                <input
                  type="number"
                  {...register("dailyNorm")}
                  className={css.settingFormInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className={css.settingFormButton}>
        {t("Save")}
      </button>
    </form>
  );
};

export default UsersSettingsForm;
