#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
from bottle import route, get, run

@get("/")
def hello_world():
    f = open('html/index.html')
    contents = f.read()
    f.close()
    return contents

@get("/main.js")
def open_main():
    f = open('js/main.js')
    contents = f.read()
    f.close()
    return contents

@get("/common.js")
def open_common():
    f = open('js/common.js')
    contents = f.read()
    f.close()
    return contents

@get("/sound.js")
def open_main():
    f = open('js/sound.js')
    contents = f.read()
    f.close()
    return contents

@get("/tablebell.mp3")
def open_main():
    f = open('media/TableBell.mp3')
    contents = f.read()
    f.close()
    return contents

run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
