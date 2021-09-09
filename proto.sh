cd proto
cp "$(go env GOPATH)/src/github.com/Nv7-Github/Nv7haven/proto/remodrive.proto" remodrive.proto
protoc --go_out=. --go-grpc_out=. remodrive.proto
protoc --plugin="protoc-gen-ts=$(go env GOPATH)/src/github.com/Nv7-Github/RemoDrive/remodrive/node_modules/.bin/protoc-gen-ts" --js_out="import_style=commonjs,binary:$(go env GOPATH)/src/github.com/Nv7-Github/RemoDrive/remodrive/pb" --ts_out="service=grpc-web:$(go env GOPATH)/src/github.com/Nv7-Github/RemoDrive/remodrive/pb" remodrive.proto
rm remodrive.proto
cd ..