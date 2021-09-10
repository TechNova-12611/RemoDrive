package main

import "google.golang.org/grpc"

func main() {
	_, err := grpc.Dial("rpc.nv7haven.tk:49152", grpc.WithBlock(), grpc.WithInsecure())
	if err != nil {
		panic(err)
	}
}
