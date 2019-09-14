# Deployment nginx by yaml

ref: 1) https://kubernetes.io/zh/docs/tasks/run-application/run-stateless-application-deployment/ <br/>

​		2)https://blog.51cto.com/lookingdream/2104561 <br/>

### 目录

[部署nginx](#部署nginx)
[部署service](#部署service)
[回滚操作](#回滚操作)

### 部署nginx

1. 创建一个nginx deployent

   通过创建一个Kubernetes Deployment对象来运行一个应用，在一个YAML文件中描述Deployment.<br/>

   例如，通过下面的YAML文件描述了一个运行nginx:1.7.9 Docker镜像的Deployment:

   ```yaml
   #deployment.yaml
   apiVersion: apps/v1beta1
   kind: Deployment
   metadata:
     name: nginx-deployment
   spec:
     replicas: 2 # tells deployment to run 2 pods matching the template
     template: # create pods using pod definition in this template
       metadata:
         # unlike pod-nginx.yaml, the name is not included in the meta data as a unique name is
         # generated from the deployment name
         labels:
           app: nginx
       spec:
         containers:
         - name: nginx
           image: nginx:1.7.9
           ports:
           - containerPort: 80
   ```

   1. 通过YAML文件创建一个Deployment:

      ```wiki
      kubectl create -f deployment.yaml
      kubectl create -f nginx-deployment.yaml --record  
      （--record会记录操作历史，以便于后面回滚操作）
      报错
      The connection to the server localhost:8080 was refused - did you specify the right host or port?
      解决办法：
      minikube start  #要先启动minikube
      kubectl create -f deployment.yaml
      返回
      deployment.apps/nginx-deployment created
      ```

   2. 展示Deployment相关信息:

      ```wiki
      kubectl describe deployment nginx-deployment
      返回：
      Name:                   nginx-deployment
      Namespace:              default
      CreationTimestamp:      Mon, 09 Sep 2019 10:30:25 +0800
      Labels:                 app=nginx
      Annotations:            deployment.kubernetes.io/revision: 1
      Selector:               app=nginx
      Replicas:               2 desired | 2 updated | 2 total | 2 available | 0 unavailable
      StrategyType:           RollingUpdate
      MinReadySeconds:        0
      RollingUpdateStrategy:  25% max unavailable, 25% max surge
      Pod Template:
        Labels:  app=nginx
        Containers:
         nginx:
          Image:        nginx:1.7.9
          Port:         80/TCP
          Host Port:    0/TCP
          Environment:  <none>
          Mounts:       <none>
        Volumes:        <none>
      Conditions:
        Type           Status  Reason
        ----           ------  ------
        Available      True    MinimumReplicasAvailable
        Progressing    True    NewReplicaSetAvailable
      OldReplicaSets:  <none>
      NewReplicaSet:   nginx-deployment-5754944d6c (2/2 replicas created)
      Events:
        Type    Reason             Age    From                   Message
        ----    ------             ----   ----                   -------
        Normal  ScalingReplicaSet  4m10s  deployment-controller  Scaled up replica set nginx-deployment-5754944d6c to 2
      ```

   3. 列出deployment创建的pods:

      ```wiki
      kubectl get pods -l app=nginx
      返回
      NAME                                READY   STATUS    RESTARTS   AGE
      nginx-deployment-5754944d6c-lvmxg   1/1     Running   0          6m44s
      nginx-deployment-5754944d6c-n6zs2   1/1     Running   0          6m44s
      ```

   4. 展示某一个pod信息:

      ```wiki
      kubectl describe pod <pod-name>
      eg:
      kubectl describe pod nginx-deployment-5754944d6c-lvmxg
      返回
      Name:               nginx-deployment-5754944d6c-lvmxg
      Namespace:          default
      Priority:           0
      PriorityClassName:  <none>
      Node:               minikube/10.0.2.15
      Start Time:         Mon, 09 Sep 2019 10:30:25 +0800
      Labels:             app=nginx
                          pod-template-hash=5754944d6c
      Annotations:        <none>
      Status:             Running
      IP:                 172.17.0.5
      Controlled By:      ReplicaSet/nginx-deployment-5754944d6c
      Containers:
        nginx:
          Container ID:   docker://49e62a53a4f80bd52ffb9c1ebf0c4c4f53d2ad9d383e69a354d020f9e7a741bb
          Image:          nginx:1.7.9
          Image ID:       docker-pullable://nginx@sha256:e3456c851a152494c3e4ff5fcc26f240206abac0c9d794affb40e0714846c451
          Port:           80/TCP
          Host Port:      0/TCP
          State:          Running
            Started:      Mon, 09 Sep 2019 10:31:13 +0800
          Ready:          True
          Restart Count:  0
          Environment:    <none>
          Mounts:
            /var/run/secrets/kubernetes.io/serviceaccount from default-token-jfhr5 (ro)
      Conditions:
        Type              Status
        Initialized       True
        Ready             True
        ContainersReady   True
        PodScheduled      True
      Volumes:
        default-token-jfhr5:
          Type:        Secret (a volume populated by a Secret)
          SecretName:  default-token-jfhr5
          Optional:    false
      QoS Class:       BestEffort
      Node-Selectors:  <none>
      Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                       node.kubernetes.io/unreachable:NoExecute for 300s
      Events:
        Type    Reason     Age    From               Message
        ----    ------     ----   ----               -------
        Normal  Scheduled  8m19s  default-scheduler  Successfully assigned default/nginx-deployment-5754944d6c-lvmxg to minikube
        Normal  Pulling    8m18s  kubelet, minikube  Pulling image "nginx:1.7.9"
        Normal  Pulled     7m31s  kubelet, minikube  Successfully pulled image "nginx:1.7.9"
        Normal  Created    7m31s  kubelet, minikube  Created container nginx
        Normal  Started    7m31s  kubelet, minikube  Started container nginx
      ```

   5. 查询追踪部署情况

      ```wiki
      kubectl rollout status deployment/nginx-deployment
      返回
      deployment "nginx-deployment" successfully rolled out
      # 这是部署完成的状态
      
      # 未完成的会显示当前部署哪一步了
      Waiting for rollout to finish: 2 out of 3 new replicas have been updated... 
      deployment "nginx-deployment" successfully rolled out
      #过一会我们再查看，就全了
      ```

      注意如果定义了.spec.minReadySeconds，那么必须经过定义的时间才会达到AVAILABLE 状态

   6. 查看Deployment创建的ReplicaSet（rs）

      ```wiki
      kubectl get rs
      返回
      NAME                          DESIRED   CURRENT   READY   AGE
      nginx-deployment-6f655f5d99   2         2         2       21m
      ```

      注意ReplicaSet的名称格式为[DEPLOYMENT-NAME]-[POD-TEMPLATE-HASH-VALUE]，后面的hash值是由Deployment自动创建的

   7. 查看Pods

      ```wiki
      kubectl get pods --show-labels
      ```

      

2. 更新deployment：

   通过更新一个新的YAML文件来更新deployment. 下面的YAML文件指定该deployment镜像更新为nginx 1.8.

   ```yaml
   #deployment-update.yaml
   apiVersion: apps/v1beta1
   kind: Deployment
   metadata:
     name: nginx-deployment
   spec:
     replicas: 2
     template:
       metadata:
         labels:
           app: nginx
       spec:
         containers:
         - name: nginx
           image: nginx:1.8 # Update the version of nginx from 1.7.9 to 1.8
           ports:
           - containerPort: 80
   ```

   1. 应用新的YAML:

      ```wiki
      kubectl apply -f deployment-update.yaml
      输出：
      Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
      deployment.apps/nginx-deployment configured
      ```

   2. 查看该deployment创建的pods以新的名称同时删除旧的pods:

      ```wiki
      kubectl get pods -l app=nginx
      返回
      NAME                                READY   STATUS              RESTARTS   AGE
      nginx-deployment-5754944d6c-lvmxg   1/1     Running             0          14m
      nginx-deployment-5754944d6c-n6zs2   1/1     Running             0          14m
      nginx-deployment-6f655f5d99-jpl8w   0/1     ContainerCreating   0          74s
      ```

      这是部署为完成，在过渡阶段。过一段时间再运行该命令：

      ```wiki
      kubectl get pods -l app=nginx
      返回
      NAME                                READY   STATUS    RESTARTS   AGE
      nginx-deployment-6f655f5d99-jpl8w   1/1     Running   0          23m
      nginx-deployment-6f655f5d99-x6k28   1/1     Running   0          21m
      ```

      

3. 通过增加副本数来弹缩应用

   **方法一、通过yaml文件** <br/>

   通过应用新的YAML文件来增加Deployment中pods的数量. 该YAML文件将`replicas`设置为4, 指定该Deployment应有4个pods:

   ```yaml
   #deployment-scale.yaml
   apiVersion: apps/v1beta1
   kind: Deployment
   metadata:
     name: nginx-deployment
   spec:
     replicas: 4 # Update the replicas from 2 to 4
     template:
       metadata:
         labels:
           app: nginx
       spec:
         containers:
         - name: nginx
           image: nginx:1.8
           ports:
           - containerPort: 80
   ```

   1. 应用新的yaml文件

      ```wiki
      kubectl apply -f deployment-scale.yaml
      ```

   2. 验证Deployment有4个pods:

      ```wiki
      kubectl get pods -l app=nginx
      返回
      NAME                                READY   STATUS    RESTARTS   AGE
      nginx-deployment-6f655f5d99-8ptht   1/1     Running   0          79s
      nginx-deployment-6f655f5d99-jpl8w   1/1     Running   0          29m
      nginx-deployment-6f655f5d99-vzmk5   1/1     Running   0          79s
      nginx-deployment-6f655f5d99-x6k28   1/1     Running   0          27m
      ```

   **方法二、通过命令** <br/>

   ```wiki
   kubectl scale deployment nginx-deployment --replicas=5
   ```

   使用autoscale还可设置自动水平扩展（[hpa](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)），可根据机器负载之类的信息自动扩展或缩减

   ```wiki
   kubectl autoscale deployment nginx-deployment --min=10 --max=15 --cpu-percent=80
   ```

4. 暂停和恢复deployment

   有时需要修改多个部分，而不是只修改image，这样的话每次改完都自动部署，显然不好，通过pause即可暂停Deployment，更改完了，通过resume即可恢复部署

   1. 暂停

      ```shell
      kubectl rollout pause deployment/nginx-deployment
      ```

   2. 修改

      ```shell
      kubectl set image deploy/nginx-deployment nginx=nginx:1.7.9
      ```

   3. 恢复

      ```shell
      kubectl rollout resume deploy/nginx-deployment
      ```

5. 删除deployment

   ```wiki
   #通过名称删除deployment:
   kubectl delete deployment nginx-deployment
   ```



### 部署service

把nginx服务暴露到外面，服务的暴露需要Service，它是Pod的抽象代理。<br/>

```yaml
#nginx-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  sessionAffinity: ClientIP
  selector:
    app: nginx
  ports:
    - port: 80
      nodePort: 30080
```

- kind：Service代表是一个服务
- type：NodePort k8s将会在每个Node上打开一个端口并且每个Node的端口都是一样的，通过<NodeIP>:NodePort的方式Kubernetes集群外部的程序可以访问Service。
- selector：哪个服务需要暴露
- port：service暴露的端口
- TargetPort：pod的端口
- nodePort：对外暴露的端口，不设置会默认分配，范围：30000－32767
- 转发逻辑是：
  <NodeIP>:<nodeport> => <ServiceVIP>:<port>=> <PodIP>:<targetport>

部署service服务: <br/>

```shell
kubectl create -f nginx-service.yaml
```

查看服务：<br/>

```wiki
kubectl get services
返回
NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.96.0.1      <none>        443/TCP        3h4m
nginx-service   NodePort    10.101.75.75   <none>        80:30080/TCP   2m22s
```

查询ip: <br/>

```shell
minikube ip
返回
192.168.99.100
```

因此在浏览器输入：<br/>

```wiki
http://192.168.99.100:30080/
会看到nginx的welcome页面
```

也可以使用curl命令：<br/>

```shell
curl $(minikube service nginx-service --url)
返回
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

或者使用以下命令访问：<br/>

```shell
minikube service nginx-service
返回
|-----------|---------------|-----------------------------|
| NAMESPACE |     NAME      |             URL             |
|-----------|---------------|-----------------------------|
| default   | nginx-service | http://192.168.99.100:30080 |
|-----------|---------------|-----------------------------|
🎉  Opening kubernetes service  default/nginx-service in default browser...
浏览器会自动打开http://192.168.99.100:30080页面
```



****

#### 更新deployment的3种方法

例子: 把nginx从1.7.9更新到1.9.1

1. 直接set命令设置变更的部分

   ```shell
   kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
   ```

   通过describe即可查看所有的细节

   ```shell
   kubectl describe deployment/nginx-deployment
   ```

   停止和新建的比例在这里体现RollingUpdateStrategy:  25% max unavailable, 25% max surge，25% max unavailable确保在更新时只有部分会关闭（这里是pod数的25%会关闭）。25% max surge确保创建新的pod也在一定比例上（这里默认也是25%）

2. 直接修改线上的配置

   ```shell
   kubectl edit deployment/nginx-deployment
   ```

   会打开一个编辑器，修改指定的部分即可，这里是.spec.template.spec.containers[0].image

3. 修改yaml文件，通过apply重新部署

****

#### 回滚操作

1. 查看操作历史

   ```shell
   kubectl rollout history deployment/nginx-deployment
   返回
   deployment.extensions/nginx-deployment
   REVISION  CHANGE-CAUSE
   1         <none>
   2         <none>
   ```

2. 要查看每个版本的详细情况，指定--revision

   ```shell
   kubectl rollout history deployment/nginx-deployment --revision=2
   返回
   deployment.extensions/nginx-deployment with revision #1
   Pod Template:
     Labels:	app=nginx
   	pod-template-hash=5754944d6c
     Containers:
      nginx:
       Image:	nginx:1.7.9
       Port:	80/TCP
       Host Port:	0/TCP
       Environment:	<none>
       Mounts:	<none>
     Volumes:	<none>
   ```

3. 不指定版本，默认回滚到上一个版本

   ```shell
   kubectl rollout undo deployment/nginx-deployment
   ```

4. 指定版本，通过--to-revision指定

   ```shell
   kubectl rollout undo deployment/nginx-deployment --to-revision=2
   ```

****



#### 一些知识点

1. pod的STATUS为ImagePullBackOff，即表明镜像不存在

   