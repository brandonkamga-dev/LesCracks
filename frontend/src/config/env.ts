export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  MODE: import.meta.env.MODE as 'development' | 'production',
  IS_PROD: import.meta.env.PROD as boolean,
  IS_DEV: import.meta.env.DEV as boolean,
} as const;

if (ENV.IS_DEV) {
  console.log('🔧 Config:', ENV);
}

export default ENV;