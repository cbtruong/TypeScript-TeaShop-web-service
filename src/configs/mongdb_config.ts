
interface AppConfig {
  port: number;
}

interface DbConfig {
  url: string
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
    url: `mongodb+srv://xyzteashop:${process.env.MONGODB_PASSWORD_DEV}@dev.tuaej.mongodb.net/?retryWrites=true&w=majority&appName=dev`
  }
}

const enviroments = { DEV }
type Enviroment = keyof typeof enviroments
const node_env: Enviroment = (process.env.NODE_ENV as Enviroment) || 'DEV'

export default enviroments[node_env]
