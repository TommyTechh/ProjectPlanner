import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:projectplanner_frontend/routing/routes.gr.dart';

class FrontPage extends StatelessWidget {
  const FrontPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xfffff3e3),
        body: Column(children: [
          SizedBox(
              height: 500,
              child: Stack(fit: StackFit.loose, children: [
                Positioned(
                    top: -70,
                    right: -1,
                    child: SvgPicture.asset(
                      'assets/Wave.svg',
                      fit: BoxFit.cover,
                    )),
                const Positioned(
                  top: 70,
                  left: 20,
                  child: Text("LittleGiants",
                      style: TextStyle(
                          fontSize: 20, fontFamily: '', color: Colors.white)),
                ),
                const Positioned(
                  top: 100,
                  left: 20,
                  child: Text("Project Planner",
                      style: TextStyle(
                          fontSize: 40, fontFamily: '', color: Colors.white)),
                ),
                Positioned(
                    top: 200,
                    right: 70,
                    child: SvgPicture.asset(
                      'assets/Social Media.svg',
                      fit: BoxFit.cover,
                    )),
              ])),
          const SizedBox(height: 30),
          ElevatedButton(
              style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(32.0)),
                  minimumSize: const Size(200, 50)),
              onPressed: () {},
              child: const Text("Opret bruger")),
          const SizedBox(height: 15),
          ElevatedButton(
              style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(32.0)),
                  minimumSize: const Size(200, 50)),
              onPressed: () {
                AutoRouter.of(context).push(const LoginRoute());
              },
              child: const Text("Log ind")),
        ]));
  }
}
