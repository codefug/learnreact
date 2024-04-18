import { useLocale, useSetLocale } from "./contexts/LocaleContext";
import useTranslate from "./hooks/useTranslate";

export default function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = useTranslate();

  const handleClickOption = (e) => {
    setLocale(e.target.value);
  };

  return (
    <select value={locale} onChange={handleClickOption}>
      <option value="ko">{t("koname")}</option>
      <option value="en">{t("enname")}</option>
    </select>
  );
}
