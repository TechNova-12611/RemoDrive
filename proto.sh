cd proto
cp "$(go env GOPATH)/src/github.com/Nv7-Github/Nv7haven/proto/remodrive.proto" remodrive.proto
protoc --go_out=. --go-grpc_out=. remodrive.proto
rm remodrive.proto
cd ..