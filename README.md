## Issue 7247

```
$ make up
PORT=10000 docker-compose up
Starting fix-7247_dump_1  ... done
Starting fix-7247_proxy_1 ... done
Attaching to fix-7247_dump_1, fix-7247_proxy_1
proxy_1  | [2019-06-14 11:39:52.193][1][info][main] [source/server/server.cc:205] initializing epoch 0 (hot restart version=10.200.16384.127.options=capacity=16384, num_slots=8209 hash=228984379728933363 size=2654312)
proxy_1  | [2019-06-14 11:39:52.193][1][info][main] [source/server/server.cc:207] statically linked extensions:
proxy_1  | [2019-06-14 11:39:52.194][1][info][main] [source/server/server.cc:209]   access_loggers: envoy.file_access_log,envoy.http_grpc_access_log
proxy_1  | [2019-06-14 11:39:52.194][1][info][main] [source/server/server.cc:212]   filters.http: envoy.buffer,envoy.cors,envoy.ext_authz,envoy.fault,envoy.filters.http.grpc_http1_reverse_bridge,envoy.filters.http.header_to_metadata,envoy.filters.http.jwt_authn,envoy.filters.http.rbac,envoy.filters.http.tap,envoy.grpc_http1_bridge,envoy.grpc_json_transcoder,envoy.grpc_web,envoy.gzip,envoy.health_check,envoy.http_dynamo_filter,envoy.ip_tagging,envoy.lua,envoy.rate_limit,envoy.router,envoy.squash
proxy_1  | [2019-06-14 11:39:52.194][1][info][main] [source/server/server.cc:215]   filters.listener: envoy.listener.original_dst,envoy.listener.original_src,envoy.listener.proxy_protocol,envoy.listener.tls_inspector
proxy_1  | [2019-06-14 11:39:52.195][1][info][main] [source/server/server.cc:218]   filters.network: envoy.client_ssl_auth,envoy.echo,envoy.ext_authz,envoy.filters.network.dubbo_proxy,envoy.filters.network.mysql_proxy,envoy.filters.network.rbac,envoy.filters.network.sni_cluster,envoy.filters.network.thrift_proxy,envoy.filters.network.zookeeper_proxy,envoy.http_connection_manager,envoy.mongo_proxy,envoy.ratelimit,envoy.redis_proxy,envoy.tcp_proxy
proxy_1  | [2019-06-14 11:39:52.195][1][info][main] [source/server/server.cc:220]   stat_sinks: envoy.dog_statsd,envoy.metrics_service,envoy.stat_sinks.hystrix,envoy.statsd
proxy_1  | [2019-06-14 11:39:52.195][1][info][main] [source/server/server.cc:222]   tracers: envoy.dynamic.ot,envoy.lightstep,envoy.tracers.datadog,envoy.zipkin
proxy_1  | [2019-06-14 11:39:52.195][1][info][main] [source/server/server.cc:225]   transport_sockets.downstream: envoy.transport_sockets.alts,envoy.transport_sockets.tap,raw_buffer,tls
proxy_1  | [2019-06-14 11:39:52.196][1][info][main] [source/server/server.cc:228]   transport_sockets.upstream: envoy.transport_sockets.alts,envoy.transport_sockets.tap,raw_buffer,tls
proxy_1  | [2019-06-14 11:39:52.196][1][info][main] [source/server/server.cc:234] buffer implementation: old (libevent)
proxy_1  | [2019-06-14 11:39:52.208][1][info][main] [source/server/server.cc:281] admin address: 127.0.0.1:9901
proxy_1  | [2019-06-14 11:39:52.214][1][info][config] [source/server/configuration_impl.cc:50] loading 0 static secret(s)
proxy_1  | [2019-06-14 11:39:52.217][1][info][config] [source/server/configuration_impl.cc:56] loading 2 cluster(s)
proxy_1  | [2019-06-14 11:39:52.224][1][info][config] [source/server/configuration_impl.cc:60] loading 1 listener(s)
proxy_1  | [2019-06-14 11:39:52.225][1][info][config] [source/server/configuration_impl.cc:85] loading tracing configuration
proxy_1  | [2019-06-14 11:39:52.226][1][info][config] [source/server/configuration_impl.cc:105] loading stats sink configuration
proxy_1  | [2019-06-14 11:39:52.227][1][info][main] [source/server/server.cc:478] starting main dispatch loop
proxy_1  | [2019-06-14 11:39:52.416][1][info][upstream] [source/common/upstream/cluster_manager_impl.cc:137] cm init: all clusters initialized
proxy_1  | [2019-06-14 11:39:52.417][1][info][main] [source/server/server.cc:462] all clusters initialized. initializing init manager
```

Then `curl` to the proxy from another tab (please wait for a while to let the proxy and the dump container processes up):

```
$ # on macOS use $(docker-machine ip) as target
$ curl -X PUT -d 'ok=true' $(docker-machine ip):10000
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>302 Moved</TITLE></HEAD><BODY>
<H1>302 Moved</H1>
The document has moved
<A HREF="https://www.google.com/sorry/index?continue=https://www.google.com/&amp;q=EgR1NmryGI6QjugFIhkA8aeDS75aSqln1LodbUedVvtSMzTyPFWxMgFy">here</A>.
</BODY></HTML>
```

And inspect the log of the compose deployment, you will see something like:

```
dump_1   | [11:44:36] PUT {
dump_1   |   host: '192.168.99.100:10000',
dump_1   |   'content-length': '7',
dump_1   |   'x-envoy-internal': 'true',
dump_1   |   'x-forwarded-for': '172.21.0.3',
dump_1   |   'x-envoy-expected-rq-timeout-ms': '5000'
dump_1   | } body=ok=true
```
