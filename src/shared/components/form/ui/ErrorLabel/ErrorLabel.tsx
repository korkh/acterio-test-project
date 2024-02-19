import { CSSProperties } from "react";

interface Props {
  styles?: CSSProperties;
  children?: React.ReactNode;
}

const ErrorLabel = ({ styles, children }: Props) => {
  const errorStyles: CSSProperties = {
    color: "red",
    border: "2px solid red",
    marginBottom: 15,
    marginTop: -8,
    padding: "5px 0",
    width: "100%",
    textAlign: "left",
    backgroundColor: "lavenderblush",
  };

  return <div style={{ ...errorStyles, ...styles }}>{children}</div>;
};

export default ErrorLabel;
