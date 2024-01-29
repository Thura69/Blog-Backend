import { Express, Router } from 'express';
import { CategoriesRoute } from './routes/categories.routes';
import { PostsRoute } from './routes/posts.routes';
import { UsersRoute } from './routes/users.routes';


export function Routes(app: Router) {
    
    //user Route
    UsersRoute(app);

    //post Route
    PostsRoute(app);

    //user Route
    UsersRoute(app);

    //category Route
    CategoriesRoute(app);
    
}