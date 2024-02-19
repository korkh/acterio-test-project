import { useEffect } from "react";
import { NavigateFunction } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ErrorPage.module.scss";

interface PageErrorProps {
  className?: string;
  error?: Error | null;
}

export const ErrorPage = ({ className, error }: PageErrorProps) => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleBack = () => {
    navigate(from, { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    if (error != null || undefined) {
      console.log("Error", error);
    }
  }, [error]);

  return (
    <div role="alert" className={classNames(cls.pageerror, [className], {})}>
      <h3>Oops.. Something went wrong</h3>
      {error && (
        <>
          <h6>{error.name}</h6>
          <p>{error.message}</p>
        </>
      )}
      <button className={cls.btnBack} onClick={handleBack}>
        Refresh page
      </button>
    </div>
  );
};
