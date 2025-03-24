import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type AlertType = "success" | "error" | "info" | "warning";

interface AlertContextType {
  notify: (type: AlertType, title: string, message?: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert debe estar dentro de AlertProvider");
  return context;
};

// Portal para alertas (si queremos escalar luego con toast personalizados)
const AlertPortal = ({ children }: { children: React.ReactNode }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const alertRoot = document.getElementById("alert-root");
    if (alertRoot) {
      alertRoot.appendChild(el.current);
    }
    return () => {
      if (alertRoot) {
        alertRoot.removeChild(el.current);
      }
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notify = (type: AlertType, title: string, message?: string) => {
    MySwal.fire({
      icon: type,
      title,
      text: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <AlertContext.Provider value={{ notify }}>
      <>
        {children}
        <div id="alert-root"></div> {/* contenedor físico en el HTML */}
      </>
    </AlertContext.Provider>
  );
};