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
}
