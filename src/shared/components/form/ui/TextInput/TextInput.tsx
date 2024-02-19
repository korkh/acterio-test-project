import { useField } from "formik";

import { CSSProperties } from "react";
import ErrorLabel from "../ErrorLabel/ErrorLabel";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
  style?: CSSProperties;
}

const inputStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  outline: "none",
  margin: "10px 0",
};

// Style for the focused (onBlur) state
const focusStyle = {
  borderColor: "teal",
};

const TextInput = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        {...props}
        {...field}
        style={{
          ...inputStyle,
          ...(meta.touched ? focusStyle : {}),
          ...props.style,
        }}
      />
      {meta.touched && meta.error ? (
        <ErrorLabel>{meta.error}</ErrorLabel>
      ) : null}
    </>
  );
};

export default TextInput;
