import React, { createContext, useContext, useState, ReactNode } from "react";

interface FestivalContextProps {
  isFestival: boolean;
  setIsFestival: (value: boolean) => void;
}

export const FestivalContext = createContext<FestivalContextProps>({
  isFestival: true,
  setIsFestival: () => {},
});

export const FestivalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFestival, setIsFestival] = useState<boolean>(true);

  return (
    <FestivalContext.Provider value={{ isFestival, setIsFestival }}>
      {children}
    </FestivalContext.Provider>
  );
};
