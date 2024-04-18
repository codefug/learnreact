import { useRef, useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput.jsx";
import RatingInput from "./RatingInput.jsx";
import useAsync from "./hooks/useAsync.jsx";
import useTranslate from "./hooks/useTranslate.jsx";

const BASEVALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  initialPreview,
  initialValues = BASEVALUES,
  onSubmitSuccess,
  onSubmit,
  onCancel,
}) {
  const t = useTranslate();
  const [submittingError, isSubmitting, onSubmitAsync] = useAsync(onSubmit);
  const inputRef = useRef();
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result = await onSubmitAsync(formData);
    if (!result) return;
    const { review } = result;
    onSubmitSuccess(review);
    setValues(BASEVALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <h1>{values.title}</h1>
      <input
        name="title"
        type="text"
        value={values.title}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit" disabled={isSubmitting}>
        {t("confirm button")}
      </button>
      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      {submittingError?.message && <span>{submittingError.message}</span>}
    </form>
  );
}

export default ReviewForm;
