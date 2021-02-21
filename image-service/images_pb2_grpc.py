# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import images_pb2 as images__pb2


class ImageServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.getImage = channel.unary_unary(
                '/img.ImageService/getImage',
                request_serializer=images__pb2.ImageLocation.SerializeToString,
                response_deserializer=images__pb2.Image.FromString,
                )
        self.getImages = channel.unary_unary(
                '/img.ImageService/getImages',
                request_serializer=images__pb2.ImageLocation.SerializeToString,
                response_deserializer=images__pb2.Image.FromString,
                )


class ImageServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def getImage(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getImages(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ImageServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'getImage': grpc.unary_unary_rpc_method_handler(
                    servicer.getImage,
                    request_deserializer=images__pb2.ImageLocation.FromString,
                    response_serializer=images__pb2.Image.SerializeToString,
            ),
            'getImages': grpc.unary_unary_rpc_method_handler(
                    servicer.getImages,
                    request_deserializer=images__pb2.ImageLocation.FromString,
                    response_serializer=images__pb2.Image.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'img.ImageService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class ImageService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def getImage(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/img.ImageService/getImage',
            images__pb2.ImageLocation.SerializeToString,
            images__pb2.Image.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def getImages(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/img.ImageService/getImages',
            images__pb2.ImageLocation.SerializeToString,
            images__pb2.Image.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)