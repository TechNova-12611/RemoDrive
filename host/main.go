package main

import (
	"fmt"
	"os"

	"github.com/andlabs/ui"
	_ "github.com/andlabs/ui/winmanifest"
)

var win *ui.Window

func handle(err error) {
	if err != nil {
		ui.QueueMain(func() {
			ui.MsgBoxError(win, "Error!", err.Error())
			fmt.Printf("Error: %s\n", err.Error())
			win.Destroy()
			ui.Quit()
			os.Exit(1)
		})
	}
}

func main() {
	ui.Main(host)
	/*conn, err := net.Dial("udp", "192.168.43.1:11039")
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	for i := 0; i < 10000; i++ {
		_, err = conn.Write([]byte("Test Message"))
		if err != nil {
			panic(err)
		}
	}*/

	/*conn, err := grpc.Dial("localhost:49152", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	client := pb.NewRemoDriveClient(conn)
	host, err := client.Host(context.Background(), &wrapperspb.StringValue{
		Value: "Test Room",
	})
	if err != nil {
		panic(err)
	}

	driver, err := client.Drive(context.Background())
	if err != nil {
		panic(err)
	}

	fmt.Println("Listening...")

	for {
		err = driver.Send(&pb.DriverMessage{
			Room:    "Test Room",
			Command: "Test Command ABC",
		})
		if err != nil {
			panic(err)
		}

		msg, err := host.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(err)
		}

		fmt.Println(msg)

		time.Sleep(time.Second)
	}*/
}
