import React, { createContext, useContext } from 'react';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children, value }) {
	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	);
}

export function useGlobalContext() {
	return useContext(GlobalContext);
}
