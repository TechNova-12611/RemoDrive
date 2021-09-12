package main

import (
	"fmt"
	"net"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
)

var conn net.Conn
var stream *websocket.Conn
var room string

func listen() {
	var err error
	conn, err = net.Dial("udp", "192.168.43.1:11039")
	handle(err)

	// Create Room
	_, err = http.Post("http://localhost:8080/new_room", "text/plain", strings.NewReader(room))
	handle(err)

	// Connect
	stream, _, err = websocket.DefaultDialer.Dial("ws://http.nv7haven.tk/host", nil)
	handle(err)

	err = stream.WriteMessage(websocket.TextMessage, []byte(room))
	handle(err)

	// Listen
	go func() {
		for {
			_, msg, err := stream.ReadMessage()
			if err != nil {
				cleanup()
				return
			}

			fmt.Println(string(msg))
			conn.Write(msg)
		}
	}()

	isHosting = true
}

func cleanup() {
	isHosting = false

	_, err := http.Post("http://localhost:8080/close_room", "text/plain", strings.NewReader(room))
	handle(err)

	err = conn.Close()
	handle(err)
}
