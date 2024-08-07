import app from "./src/app";

const port: number = Number(process.env.PORT) || 3000
const host: string = process.env.HOST || 'localhost'

app.listen(port, host, () => {
  console.log(`TEA SHOP BACKEND running at http://${host}:${port}`)
})

