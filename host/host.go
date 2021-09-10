package main

import (
	"context"
	"io"
	"net"

	"github.com/Nv7-Github/RemoDrive/pb"
	"github.com/andlabs/ui"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

var isHosting = false
var prt int

var conn net.Conn
var stream pb.RemoDrive_HostClient
var room string

var grpconn *grpc.ClientConn = nil
var remodrive pb.RemoDriveClient

func cleanup() {
	isHosting = false

	remodrive.CloseRoom(context.Background(), &wrapperspb.StringValue{Value: room})

	err := conn.Close()
	handle(err)
}

func host() {

	// Create window
	win = ui.NewWindow("RemoDrive", 0, 0, false)
	win.OnClosing(func(*ui.Window) bool {
		if isHosting {
			cleanup()
		}
		ui.Quit()
		return true
	})
	ui.OnShouldQuit(func() bool {
		win.Destroy()
		return true
	})
	win.SetMargined(true)

	// Create form
	vbox := ui.NewVerticalBox()
	vbox.SetPadded(true)
	group := ui.NewGroup("Settings")
	group.SetMargined(true)
	form := ui.NewForm()
	form.SetPadded(true)

	// Create form items
	roomname := ui.NewEntry()
	form.Append("Room", roomname, false)

	hostname := ui.NewEntry()
	hostname.SetText("192.168.43.1")
	form.Append("Host", hostname, false)

	port := ui.NewSpinbox(0, 65535)
	port.SetValue(11039)
	port.OnChanged(func(spin *ui.Spinbox) {
		// Make readonly
		if isHosting {
			spin.SetValue(prt)
		}
	})
	form.Append("Port", port, false)

	// Create listen btn
	btn := ui.NewButton("Host")

	// Disable if empty
	if len(roomname.Text()) == 0 {
		btn.Disable()
	}
	roomname.OnChanged(func(*ui.Entry) {
		if len(roomname.Text()) > 0 && !btn.Enabled() {
			btn.Enable()
		} else if len(roomname.Text()) == 0 && btn.Enabled() {
			btn.Disable()
		}
	})

	// onclick
	btn.OnClicked(func(*ui.Button) {
		if !isHosting {
			hostname.SetReadOnly(true)
			roomname.SetReadOnly(true)

			prt = port.Value()
			room = roomname.Text()

			btn.Disable()
			btn.SetText("Connecting")

			go func() {
				// Connect
				var err error
				conn, err = net.Dial("udp", "192.168.43.1:11039")
				handle(err)

				if grpconn == nil {
					grpconn, err = grpc.Dial("73.19.90.94:49152", grpc.WithBlock(), grpc.WithInsecure())
					handle(err)
					remodrive = pb.NewRemoDriveClient(grpconn)
				}

				stream, err = remodrive.Host(context.Background(), &wrapperspb.StringValue{Value: room})
				handle(err)

				// Listen
				go func() {
					for {
						msg, err := stream.Recv()
						if err == io.EOF {
							break
						}
						if err != nil {
							panic(err)
						}

						conn.Write([]byte(msg.Command))
					}
				}()

				isHosting = true

				ui.QueueMain(func() {
					btn.Enable()
					btn.SetText("Stop")
				})
			}()
			return
		}

		hostname.SetReadOnly(false)
		roomname.SetReadOnly(false)
		cleanup()

		btn.SetText("Host")
	})

	// Make UI
	group.SetChild(form)
	vbox.Append(group, true)
	vbox.Append(btn, false)
	win.SetChild(vbox)
	win.Show()
}
