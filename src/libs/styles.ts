const PX_TO_REM_RATIO = 16

export const pxToRem = (px: number | string): number =>
	Number(px) / PX_TO_REM_RATIO

export const getRandomColor = () => {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
