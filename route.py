#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
from bottle import route, get, run

@get("/")
def callback():
    f = open("html/index.html")
    contents = f.read()
    f.close()
    return contents

@get("/<js:re:.+\.js$>")
def callback(js):
    f = open("js/" + js)
    contents = f.read()
    f.close()
    return contents


@get("/<media:re:.+\.mp3$>")
def callback(media):
    f = open("media/" + media)
    contents = f.read()
    f.close()
    return contents

run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
