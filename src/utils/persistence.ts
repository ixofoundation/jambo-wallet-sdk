declare const window: any;
declare const global: any;
declare const globalThis: any;
const g =
	typeof globalThis === 'object'
		? globalThis
		: typeof window === 'object'
		? window
		: typeof global === 'object'
		? global
		: null;

// Local storage (persisted) management
export const setLocalStorage = <T>(key: string, value: T) => {
	if (typeof g !== 'undefined' && g?.localStorage) {
		g.localStorage.setItem(key, JSON.stringify(value));
	}
};

export const getLocalStorage = <T>(key: string) => {
	if (typeof g !== 'undefined' && g?.localStorage) {
		const value = g.localStorage.getItem(key);
		if (!value) return;
		return JSON.parse(value) as T;
	}
};

export const removeLocalStorage = (key: string) => {
	if (typeof g !== 'undefined' && g?.localStorage) {
		g.localStorage.removeItem(key);
	}
};

// Session storage (non-persisted) management
export const setSessionStorage = <T>(key: string, value: T) => {
	if (typeof g !== 'undefined' && g?.localStorage) {
		g.sessionStorage.setItem(key, JSON.stringify(value));
	}
};

export const getSessionStorage = <T>(key: string) => {
	if (typeof g !== 'undefined' && g?.localStorage) {
		const value = g.sessionStorage.getItem(key);
		if (!value) return;
		return JSON.parse(value) as T;
	}
};

export const removeSessionStorage = (key: string) => {
	if (typeof g !== 'undefined' && g?.localStorage) {
		g.sessionStorage.removeItem(key);
	}
};
