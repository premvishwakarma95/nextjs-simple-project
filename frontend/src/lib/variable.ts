export const token: string | null = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const userId: string | null = typeof window !== "undefined" ? localStorage.getItem('userId') : null;