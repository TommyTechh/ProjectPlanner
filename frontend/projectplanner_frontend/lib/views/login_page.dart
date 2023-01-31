import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xfffff3e3),
        body: Column(children: [
          SizedBox(
              height: 350,
              child: Stack(fit: StackFit.loose, children: [
                Positioned(
                    top: -110,
                    right: -25,
                    child: SvgPicture.asset(
                      'assets/Wave.svg',
                      fit: BoxFit.cover,
                    )),
                const Positioned(
                  top: 170,
                  left: 130,
                  child: Text("Log ind",
                      style: TextStyle(
                          fontSize: 40, fontFamily: '', color: Colors.white)),
                )
              ])),
          SizedBox(
            width: 350,
            child: Column(children: const [
              Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text('Brugernavn'))),
              Material(
                elevation: 10.0,
                shadowColor: Colors.black,
                borderRadius: BorderRadius.all(Radius.circular(90)),
                child: TextField(
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(90)),
                        borderSide: BorderSide.none),
                  ),
                ),
              ),
            ]),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              width: 350,
              child: Column(children: const [
                Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text('Adgangskode'))),
                Material(
                  elevation: 10.0,
                  shadowColor: Colors.black,
                  borderRadius: BorderRadius.all(Radius.circular(90)),
                  child: TextField(
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(90)),
                          borderSide: BorderSide.none),
                    ),
                  ),
                ),
              ]),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(50.0),
            child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(32.0)),
                    minimumSize: const Size(200, 50)),
                onPressed: () {
                  AutoRouter.of(context).pop();
                },
                child: const Text("Log ind")),
          ),
        ]));
  }
}
