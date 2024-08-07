
interface AppConfig {
  port: number;
}

interface DbConfig {
  name: string;
  host: string;
  port: number;
}

interface Config {
  app: AppConfig;
  db: DbConfig;
}

const DEV: Config = {
  app: {
    port: Number(process.env.DEV_APP_PORT) || 3000
  },
  db: {
    name: process.env.DEV_DB_NAME || 'TEA-SHOP-BACKEND-DEV',
    host: process.env.DEV_DB_HOST || 'localhost',
    port: Number(process.env.DEV_DB_PORT) || 27017
  }
}

const enviroments = { DEV }
type Enviroment = keyof typeof enviroments
const node_env: Enviroment = (process.env.NODE_ENV as Enviroment) || 'DEV'

export default enviroments[node_env]
