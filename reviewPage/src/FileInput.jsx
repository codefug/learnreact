import { useEffect, useRef, useState } from "react";

export default function FileInput({ name, value, onChange, initialPreview }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initialPreview);
  const handleChange = (e) => {
    onChange(name, e.target.files[0], e.target.type);
  };

  const handlerClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handlerClearClick}>X</button>}
    </>
  );
}
