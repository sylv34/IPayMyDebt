import {createConnection} from 'typeorm'
import * as express from 'express'
import {json} from 'body-parser'
import createRoute from './routes'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')

const app = express()

const corsOptions = {
    'origin': process.env.URL_ALLOWED,
    'optionsSuccessStatus': 200,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
}

app.use(json())
app.use(cors(corsOptions))

createRoute(app)
createConnection(process.env.NODE_ENV).then(() => {
    app.listen(5555, () => console.log(`listening on port 5555 in ${  process.env.NODE_ENV  } allowed :${  process.env.URL_ALLOWED}`))
}).catch((reason => console.log(reason)))
