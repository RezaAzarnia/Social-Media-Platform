"use client";
import React, { createContext, useContext, useState } from "react";

type ContextProps = {
  hideSidebar: Boolean;
  setHideSidebar: React.Dispatch<React.SetStateAction<Boolean>>;
};
type ChildrenProps = {
  children: React.ReactNode;
};

const LayoutContext = createContext<ContextProps | null>(null);

export const LayoutProvider = ({ children }: ChildrenProps) => {
  const [hideSidebar, setHideSidebar] = useState<Boolean>(false);

  return (
    <LayoutContext.Provider value={{ hideSidebar, setHideSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("context doen't exist");
  }
  return context;
};
