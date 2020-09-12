import { Application } from 'express'
import { familyRouter } from './routes/familyRoutes'
import { userRouter } from './routes/userRoutes'
import { authRouter } from './routes/authRoutes'
import { carbonCategoryRouter } from './routes/carbonCategoryRoutes'
import { carbonRouter } from './routes/carbonRoutes'
import { carRouter } from './routes/carRoutes'

export default (app : Application):void => {
    app.use('/auth', authRouter())
    app.use('/family', familyRouter())
    app.use('/user', userRouter())
    app.use('/carboncategory', carbonCategoryRouter())
    app.use('/carbon', carbonRouter())
    app.use('/car', carRouter())
}