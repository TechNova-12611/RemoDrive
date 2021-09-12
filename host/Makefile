CHDIR_SHELL := $(SHELL)
define chdir
   $(eval _D=$(firstword $(1) $(@D)))
   $(info $(MAKE): cd $(_D)) $(eval SHELL = cd $(_D); $(CHDIR_SHELL))
endef

install:
	docker pull x1unix/go-mingw:latest
	go install fyne.io/fyne/cmd/fyne@latest

build-exec:
	go build -o RemoDrive -ldflags="-s -w"

build-linux: build-exec
	fyne package -os linux -icon ../remodrive/public/favicon.png -executable RemoDrive -name RemoDrive

build-mac: build-exec
	fyne package -os darwin -icon ../remodrive/public/favicon.png -executable RemoDrive -name RemoDrive

build-windows-cross:
	cd .. &&  docker run --rm -it -v "$(shell pwd):/go/work" -w /go/work x1unix/go-mingw pwd && cd host && go build -o RemoDrive.exe -ldflags="-s -w"

clean:
	rm RemoDrive