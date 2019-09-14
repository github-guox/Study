# 一个简单的 “Hello World” Node.js

REF: https://k8smeetup.github.io/docs/tutorials/stateless-application/hello-minikube/

### 目录







### 目标

1. 运行一个 “hello world” Node.js 应用，并将应用部署到Minikube
2. 查看应用日志
3. 更新应用镜像

### 开发环境

macOS：

1. 安装minikube、docker、node

2. 安装xhyve 驱动程序并设置其权限：

   ```shell
   brew install docker-machine-driver-xhyve
   #brew link --overwrite --dry-run docker-machine
   sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
   sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
   ```

3. 在不使用代理的情况下，请确认您是否可以直接访问以下站点 https://cloud.google.com/container-registry/，通过打开新终端并使用

   ```shell
   curl --proxy "" https://cloud.google.com/container-registry/
   ```

4. 如果不需要代理，请启动 Minikube 集群

   ```shell
   
   ```

   

5. 

****

1. `minikube start` <br/>

2. 设置 Minikube 上下文。上下文决定了 `kubectl` 与哪一个集群进行交互。您可以在 `~/.kube/config` 文件中看到所有可用的上下文内容。<br/>

   `kubectl config use-context minikube` <br/>

   ```shell
   cat ~/.kube/config
   --------------------------------------------------------------------------
   apiVersion: v1
   clusters:
   - cluster:
       certificate-authority: /Users/xinguo/.minikube/ca.crt
       server: https://192.168.99.100:8443
     name: minikube
   contexts:
   - context:
       cluster: minikube
       user: minikube
     name: minikube
   current-context: minikube
   kind: Config
   preferences: {}
   users:
   - name: minikube
     user:
       client-certificate: /Users/xinguo/.minikube/client.crt
       client-key: /Users/xinguo/.minikube/client.key
   ```

3. 验证 `kubectl` 已经配置为与您的集群通信：

   ```shell
   kubectl cluster-info
   --------------------------------------------------------------------------
   Kubernetes master is running at https://192.168.99.100:8443
   KubeDNS is running at https://192.168.99.100:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
   ```

   



### 创建Node.js应用

编写应用。将此代码使用文件 `server.js` 保存在 `hellonode` 的文件夹中：

```js
var http = require('http');
var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Hello World!');
};
var www = http.createServer(handleRequest);
www.listen(8080);
```

运行应用：

```shell
node server.js
```

通过 http://localhost:8080/ 可以看到 “Hello World!” 的消息。通过按 **Ctrl-C** 停止运行中的 Node.js 服务器。

接下来将应用打包到 Docker 容器中。



### 创建docker容器镜像

在 `hellonode` 文件夹中，创建一个文件 Dockerfile。

```dockerfile
FROM node:6.9.2
EXPOSE 8080
COPY server.js .
CMD node server.js
```

由于本教程使用 Minikube，而不是将 Docker 镜像推送到仓库，您可以使用同一个 Docker 主机作为 Minikube VM 来构建镜像，这样镜像就会自动保存。为此，请确保您使用的是 Minikube Docker 守护进程：

```shell
eval $(minikube docker-env)
```

**注：** 当您不再希望使用这个 Minikube 主机时，您可以通过运行 `eval $(minikube docker-env -u)` 来撤消此更改。<br/>

使用 Minikube Docker 守护程序构建Docker 镜像：

```shell
docker build -t hello-node:v1 .
```

现在 Minikube VM 可以运行构建的镜像了。



### 创建 Deployment

Kubernetes [*Pod*](https://k8smeetup.github.io/docs/concepts/workloads/pods/pod/) 是由一个或多个容器为了管理和联网的目的而绑定在一起构成的组。本教程中的 Pod 只有一个容器。Kubernetes [*Deployment*](https://k8smeetup.github.io/docs/concepts/workloads/controllers/deployment/) 检查 Pod 的健康状况，并在 Pod 中的容器终止的情况下重新启动新的容器。Deployment 是管理 Pod 创建和伸缩的推荐方法。<br/>

使用 `kubectl run` 命令创建一个管理 Pod 的 Deployment。该 Pod 基于镜像 `hello-node:v1` 运行了一个容器：

```shell
kubectl run hello-node --image=hello-node:v1 --port=8080
```

查看 Deployment：

```shell
kubectl get deployments
--------------------------------------------------------------------------
输出：
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   0/1     1            0           13s
```

查看 Pod：

```shell
kubectl get pods
--------------------------------------------------------------------------
输出：
NAME                          READY   STATUS             RESTARTS   AGE
hello-node-84d6886696-8q24f   0/1     ImagePullBackOff   0          84s
```

`ImagePullBackOff` 状态不对<br/>

```shell
kubectl describe pod hello-node-84d6886696-8q24f
--------------------------------------------------------------------------
输出：
Events:
  Type     Reason     Age                  From               Message
  ----     ------     ----                 ----               -------
  Normal   Scheduled  26m                  default-scheduler  Successfully assigned default/hello-node-84d6886696-8q24f to minikube
  Normal   Pulling    24m (x4 over 26m)    kubelet, minikube  Pulling image "hello-node:v1"
  Warning  Failed     24m (x4 over 26m)    kubelet, minikube  Failed to pull image "hello-node:v1": rpc error: code = Unknown desc = Error response from daemon: pull access denied for hello-node, repository does not exist or may require 'docker login'
  Warning  Failed     24m (x4 over 26m)    kubelet, minikube  Error: ErrImagePull
  Normal   BackOff    11m (x61 over 26m)   kubelet, minikube  Back-off pulling image "hello-node:v1"
  Warning  Failed     66s (x105 over 26m)  kubelet, minikube  Error: ImagePullBackOff
```

从describe的信息看，k8s一直从远端拉取。实际上，k8s默认会从远端拉取镜像，其配置参数imagePullPolicy为Always。可以通过将该参数显示设置为Never或者IfNotPresent，k8s就会从本地拉取镜像了。

```wiki
IfNotPresent ：如果本地存在镜像就优先使用本地镜像。
Never：直接不再去拉取镜像了，使用本地的；如果本地不存在就报异常了。

spec: 
  containers: 
    - name: nginx 
      image: image: reg.docker.lc/share/nginx:latest 
      imagePullPolicy: IfNotPresent   #或者使用Never
```



查看集群事件：

```shell
kubectl get events
--------------------------------------------------------------------------
输出：
LAST SEEN   TYPE      REASON                    OBJECT                             MESSAGE
2m9s        Normal    Scheduled                 pod/hello-node-84d6886696-8q24f    Successfully assigned default/hello-node-84d6886696-8q24f to minikube
38s         Normal    Pulling                   pod/hello-node-84d6886696-8q24f    Pulling image "hello-node:v1"
34s         Warning   Failed                    pod/hello-node-84d6886696-8q24f    Failed to pull image "hello-node:v1": rpc error: code = Unknown desc = Error response from daemon: pull access denied for hello-node, repository does not exist or may require 'docker login'
34s         Warning   Failed                    pod/hello-node-84d6886696-8q24f    Error: ErrImagePull
0s          Normal    BackOff                   pod/hello-node-84d6886696-8q24f    Back-off pulling image "hello-node:v1"
12s         Warning   Failed                    pod/hello-node-84d6886696-8q24f    Error: ImagePullBackOff
2m9s        Normal    SuccessfulCreate          replicaset/hello-node-84d6886696   Created pod: hello-node-84d6886696-8q24f
2m9s        Normal    ScalingReplicaSet         deployment/hello-node              Scaled up replica set hello-node-84d6886696 to 1
16m         Normal    NodeHasSufficientMemory   node/minikube                      Node minikube status is now: NodeHasSufficientMemory
16m         Normal    NodeHasNoDiskPressure     node/minikube                      Node minikube status is now: NodeHasNoDiskPressure
16m         Normal    NodeHasSufficientPID      node/minikube                      Node minikube status is now: NodeHasSufficientPID
16m         Normal    RegisteredNode            node/minikube                      Node minikube event: Registered Node minikube in Controller
16m         Normal    Starting                  node/minikube                      Starting kube-proxy.
```

查看 `kubectl` 配置：

```shell
kubectl config view
```

有关 `kubectl` 命令的更多信息，请参阅 [kubectl 概述](https://k8smeetup.github.io/docs/user-guide/kubectl-overview/)。



### 创建 Service

```shell
kubectl get services
--------------------------------------------------------------------------
输出：
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   25m
```

默认情况下，Pod 只能通过 Kubernetes 集群中的内部 IP 地址访问。要使得 `hello-node` 容器可以从 Kubernetes 虚拟网络的外部访问，您必须将 Pod 暴露为 Kubernetes [*Service*](https://k8smeetup.github.io/docs/concepts/services-networking/service/)。<br/>

使用 `kubectl expose` 命令将 Pod 暴露给公网：

```shell
kubectl expose deployment hello-node --type=LoadBalancer
```

查看刚刚创建的服务

```shell
kubectl get services
--------------------------------------------------------------------------
输出：
NAME         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
hello-node   LoadBalancer   10.104.199.124   <pending>     8080:31297/TCP   23s
kubernetes   ClusterIP      10.96.0.1        <none>        443/TCP          27m
```

`--type=LoadBalancer` 表示要在集群之外公开您的服务。在支持负载均衡器的云服务提供商上，将提供一个外部 IP（external IP） 来访问该服务。在 Minikube 上，`LoadBalancer` 使得服务可以通过命令 `minikube service` 访问。

```shell
minikube service hello-node
--------------------------------------------------------------------------
输出：
|-----------|------------|-----------------------------|
| NAMESPACE |    NAME    |             URL             |
|-----------|------------|-----------------------------|
| default   | hello-node | http://192.168.99.100:31297 |
|-----------|------------|-----------------------------|
🎉  Opening kubernetes service  default/hello-node in default browser...

```











```shell
minikube delete
```



