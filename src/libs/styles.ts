const PX_TO_REM_RATIO = 16;

export const pxToRem = (px: number | string): number => Number(px) / PX_TO_REM_RATIO;
