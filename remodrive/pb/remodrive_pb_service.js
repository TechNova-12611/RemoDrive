// package: remodrive
// file: remodrive.proto

var remodrive_pb = require("./remodrive_pb");
var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RemoDrive = (function () {
  function RemoDrive() {}
  RemoDrive.serviceName = "remodrive.RemoDrive";
  return RemoDrive;
}());

RemoDrive.Drive = {
  methodName: "Drive",
  service: RemoDrive,
  requestStream: true,
  responseStream: false,
  requestType: remodrive_pb.DriverMessage,
  responseType: google_protobuf_empty_pb.Empty
};

RemoDrive.Host = {
  methodName: "Host",
  service: RemoDrive,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: remodrive_pb.DriverMessage
};

RemoDrive.CloseRoom = {
  methodName: "CloseRoom",
  service: RemoDrive,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.StringValue,
  responseType: google_protobuf_empty_pb.Empty
};

exports.RemoDrive = RemoDrive;

function RemoDriveClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RemoDriveClient.prototype.drive = function drive(metadata) {
  var listeners = {
    end: [],
    status: []
  };
  var client = grpc.client(RemoDrive.Drive, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      if (!client.started) {
        client.start(metadata);
      }
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

RemoDriveClient.prototype.host = function host(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(RemoDrive.Host, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

RemoDriveClient.prototype.closeRoom = function closeRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemoDrive.CloseRoom, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.RemoDriveClient = RemoDriveClient;

