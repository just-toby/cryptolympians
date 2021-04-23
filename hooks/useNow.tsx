import { Cryptolympians__factory, Cryptolympians } from "../types";
import { useContext, useEffect, useMemo, useState } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";

export interface Now {
  now: number;
}

function useNow(): Now {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return { now };
}

export { useNow };
