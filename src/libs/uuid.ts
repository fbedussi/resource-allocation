export const generateUID = (): string =>
	window.btoa(Date.now().toString() + Math.random().toString());
