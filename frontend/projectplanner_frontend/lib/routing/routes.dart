                        
import 'package:auto_route/auto_route.dart';
import 'package:projectplanner_frontend/views/front_page.dart';
import 'package:projectplanner_frontend/views/login_page.dart';

@MaterialAutoRouter(              
  replaceInRouteName: 'Page,Route',              
  routes: <AutoRoute>[              
    AutoRoute(page: FrontPage, initial: true),              
    AutoRoute(page: LoginPage),              
  ],              
)              
class $AppRouter {}  