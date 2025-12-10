import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notificaciones, setNotificaciones] = useState([]);
  const [contador, setContador] = useState(0);
  const agregarNotificacion = (mensaje) => {
    setNotificaciones((prev) => [
      { id: Date.now(), mensaje, leida: false },
      ...prev,
    ]);
    setContador((c) => c + 1);
  };

  const marcarLeidas = () => {
    setNotificaciones((prev) =>
      prev.map((n) => ({ ...n, leida: true }))
    );
    setContador(0);
  };

  return (
    <NotificationContext.Provider
      value={{ notificaciones, contador, agregarNotificacion, marcarLeidas}}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificaciones = () => useContext(NotificationContext);
