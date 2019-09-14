# minikube usage

### 目录





#### 查看初始集群信息

使用 `kubectl get -h`可以看到更多关于`kubectl get`的用法：<br/>

1. 查看node信息: `kubectl get nodes`
2. 查看services信息: `kubectl get services`
3. 查看deployment信息: `kubectl get deployments`
4. 查看pod信息: `kubectl get pods`

因为是本地运行minikube，所以只会有一个主节点，默认会有一个名为**kubernetes**的服务，其类型是 **ClusterIP**，只能从集群内部访问，且其访问端口为443。<br/>

### 注意

#### 使用service创建nginx服务

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 30009
  externalIPs:
    - 公网IP
```

该service的类型是NodePort，🔥更值得推荐的类型是负载均衡器 **LoadBalance**，但是Minikube无法使用该类型🔥，而默认类型**ClusterIP**不对外开放，这里不予考虑。<br/>

🛑另外需要注意一下port,targetPort和nodePort的区别：<br/>

```wiki
port : 表示service暴露在cluster ip 上的端口,集群内部用户可以通过<cluster ip>:port访问该service
targetPort: 目标端口,即pod上的端口,service接收到的数据会经由kube-proxy流入后端pod的targetPort端口进入容器,故该端口应与pod的containerPort对应.
nodePort: 表示service暴露在node ip上的端口,集群外部的用户可以通过<node ip>:nodePort访问该service
```

访问 `<external-ip>:nodePort` 即可打开访问nginx的默认首页<br/>