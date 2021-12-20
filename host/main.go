package main

import (
	"fmt"
	"os"

	"github.com/andlabs/ui"
	_ "github.com/andlabs/ui/winmanifest"
)

var win *ui.Window

func handle(err error) bool {
	if err != nil {
		ui.QueueMain(func() {
			ui.MsgBoxError(win, "Error!", err.Error())
			fmt.Printf("Error: %s\n", err.Error())
			win.Destroy()
			ui.Quit()
			os.Exit(1)
		})
		return false
	}
	return true
}

func main() {
	ui.Main(host)
}
