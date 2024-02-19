import { useField } from "formik";
import ErrorLabel from "../ErrorLabel/ErrorLabel";

// export const categoryOptions = [
//   { text: "Seminars", value: "seminars" },
//   { text: "Lectures", value: "lectures" },
//   { text: "Webinars", value: "webinars" },
//   { text: "Courses", value: "courses" },
//   { text: "Bootcamps", value: "bootcamps" },
// ];

interface Option {
  text: string;
  value: string;
}

interface Props {
  placeholder: string;
  name: string;
  options: Option[];
  label?: string;
}

const selectStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  outline: "none",
  margin: "15px 0",
};

// Style for the focused (onBlur) state
const focusStyle = {
  borderColor: "teal",
};

const SelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <>
      {props.label && <label>{props.label}</label>}
      <select
        style={{ ...selectStyle, ...(meta.touched ? focusStyle : {}) }}
        name={props.name}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <ErrorLabel>{meta.error}</ErrorLabel>
      ) : null}
    </>
  );
};

export default SelectInput;
