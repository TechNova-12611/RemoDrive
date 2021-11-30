package main

import (
	"io"
	"net"
	"net/http"
	"strings"

	"github.com/andlabs/ui"
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
	resp, err := http.Post("https://api.nv7haven.com/new_room", "text/plain", strings.NewReader(room))
	handle(err)
	defer resp.Body.Close()

	_, err = io.ReadAll(resp.Body)
	handle(err)

	// Connect
	stream, _, err = websocket.DefaultDialer.Dial("wss://http.nv7haven.com/host", nil)
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

			conn.Write(msg)
		}
	}()

	isHosting = true
}

func cleanup() {
	ui.QueueMain(func() {
		btn.SetText("Stopping...")
		btn.Disable()
	})

	go func() {
		resp, err := http.Post("https://api.nv7haven.com/close_room", "text/plain", strings.NewReader(room))
		handle(err)
		defer resp.Body.Close()

		_, err = io.ReadAll(resp.Body)
		handle(err)

		err = conn.Close()
		handle(err)

		isHosting = false

		ui.QueueMain(func() {
			hostname.SetReadOnly(false)
			roomname.SetReadOnly(false)
			btn.SetText("Host")
			btn.Enable()
		})
	}()
}
