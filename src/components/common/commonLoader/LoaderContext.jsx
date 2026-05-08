import React, { createContext, useContext, useEffect, useState } from "react";

const LoaderContext = createContext();

// Singleton ref so AxiosInstance can stop the loader globally
// without importing hooks (which can't be used outside React components).
export const loaderRef = { current: null };

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Register setIsLoading into the singleton ref when the provider mounts
  useEffect(() => {
    loaderRef.current = { setIsLoading };
    return () => {
      loaderRef.current = null;
    };
  }, [setIsLoading]);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(LoaderContext);
};
