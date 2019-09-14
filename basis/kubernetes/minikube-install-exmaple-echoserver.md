# minikube for Mac OS

Install <br/>

```shell
1. brew cask install minikube
2. curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64 \
  && sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

https://minikube.sigs.k8s.io/docs/start/macos/ <br/>

```shell
HyperKit安装
brew install hyperkit
驱动安装
curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-hyperkit \
&& sudo install -o root -m 4755 docker-machine-driver-hyperkit /usr/local/bin/
-------------------------------------------------------------------------------------------
brew install docker-machine-driver-parallels
或者
r=https://api.github.com/repos/Parallels/docker-machine-parallels
curl -LO $(curl -s $r/releases/latest | grep -o 'http.*parallels' | head -n1) \
 && install docker-machine-driver-parallels /usr/local/bin/
-------------------------------------------------------------------------------------------
brew install docker-machine-driver-vmware
或者
r=https://api.github.com/repos/machine-drivers/docker-machine-driver-vmware
curl -LO $(curl -s $r/releases/latest | grep -o 'http.*darwin_amd64' | head -n1) \
 && install docker-machine-driver-vmware_darwin_amd64 \
  /usr/local/bin/docker-machine-driver-vmware
```



#### Examples

https://minikube.sigs.k8s.io/docs/examples/



1. `minikube start` <br/>

   ```wiki
   😄  minikube v1.3.1 on Darwin 10.14.3<br/>
   💿  Downloading VM boot image ...<br/>
   minikube-v1.3.0.iso.sha256: 65 B / 65 B [--------------------] 100.00% ? p/s 0s<br/>
   minikube-v1.3.0.iso: 131.07 MiB / 131.07 MiB [-------] 100.00% 2.24 MiB p/s 59s<br/>
   🔥  Creating virtualbox VM (CPUs=2, Memory=4096MB, Disk=20000MB) ...<br/>
   E0906 11:16:25.644898   84431 start.go:723] StartHost: create: precreate: VBoxManage not found. Make sure VirtualBox is installed and VBoxManage is in the path<br/>
   
   💣  Unable to start VM<br/>
   ❌  Error: [VBOX_NOT_FOUND] create: precreate: VBoxManage not found. Make sure VirtualBox is installed and VBoxManage is in the path<br/>
   💡  Suggestion: Install VirtualBox, ensure that VBoxManage is executable and in path, or select an alternative value for --vm-driver<br/>
   📘  Documentation: https://www.virtualbox.org/wiki/Downloads<br/>
   ⁉️   Related issues:<br/>
       ▪ https://github.com/kubernetes/minikube/issues/3784<br/>
       ▪ https://github.com/kubernetes/minikube/issues/3776<br/>
   
   😿  If the above advice does not help, please let us know:<br/>
   👉  https://github.com/kubernetes/minikube/issues/new/choose<br/>
   ```

2. 安装[VirutalBox](https://download.virtualbox.org/virtualbox/5.2.18/VirtualBox-5.2.18-124319-OSX.dmg)

   https://download.virtualbox.org/virtualbox/5.2.18/VirtualBox-5.2.18-124319-OSX.dmg

   ```wiki
   minikube 依赖虚拟化hypervisor，macOS可以安装VirtualBox和VMWare等
   minikube运行在虚拟机里面
   ```

3. minikube start仍然报错

   ```wiki
   Error: [VBOX_HOST_ADAPTER] start: Error setting up host only network on machine start: The host-only adapter we just created is not visible. This is a well known VirtualBox bug. You might want to uninstall it and reinstall at least version 5.0.12 that is is supposed to fix this issue
   ```

   `sudo /Library/Application\ Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh restart` <br/>

   `minikube delete` <br/>

4. minikube start正常运行

   ```wiki
   😄  minikube v1.3.1 on Darwin 10.14.3
   🔥  Creating virtualbox VM (CPUs=2, Memory=4096MB, Disk=20000MB) ...
   🐳  Preparing Kubernetes v1.15.2 on Docker 18.09.8 ...
   💾  Downloading kubeadm v1.15.2
   💾  Downloading kubelet v1.15.2
   🚜  Pulling images ...
   🚀  Launching Kubernetes ...
   ⌛  Waiting for: apiserver proxy etcd scheduler controller dns
   🏄  Done! kubectl is now configured to use "minikube"
   ```

   不需要提前安装kubectl，minikube会自动下载安装

5. `minikube dashboard` <br/>

   minikube会自动在浏览器中打开界面

   ![kubernetes-dashbord](../images/kubernetes-dashbord.png)

6. 部署一个简单的应用 ref: https://www.jianshu.com/p/3b419cc7d290

   ****

   1. **部署**：启动一个镜像，hello-minikube。从网站上下载echoserver镜像1.14版，发布到的容器(Pod)端口8080。<br/>

      `kubectl run hello-minikube --image=k8s.gcr.io/echoserver:1.4 --port=8080` <br/>

   2. 部署完毕后，可以通过以下命令查看<br/>

      ```wiki
      kubectl get pods
      ---------------------------output---------------------------------
      NAME                             READY   STATUS    RESTARTS   AGE
      hello-minikube-64c7df9db-wmhjb   1/1     Running   0          2m22s
      ```

   3. 将之前部署的应用，**发布**为可以访问的服务。并把容器(Pod)的8080端口，在节点（当前mac）中映射物理端口NodePort。

      ```wiki
      kubectl expose deployment hello-minikube --type=NodePort
      ---------------------------output---------------------------------
      service/hello-minikube exposed
      ```

   4. 发布后，通过命令查看已经发布的内容

      ```wiki
      kubectl get services
      ---------------------------output---------------------------------
      NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
      hello-minikube   NodePort    10.96.133.160   <none>        8080:31645/TCP   3m5s
      kubernetes       ClusterIP   10.96.0.1       <none>        443/TCP          28m
      ```

      服务的集群ip每人是不同的；可以**通过虚拟的ip地址cluster-ip（10.96.133.160）访问服务**。

   5. 访问服务（两种访问方式）

      - 通过minikube service命令访问

        ```wiki
        minikube service hello-minikube
        
        ********************************** command output ****************************
        |-----------|----------------|-----------------------------|
        | NAMESPACE |      NAME      |             URL             |
        |-----------|----------------|-----------------------------|
        | default   | hello-minikube | http://192.168.99.101:31645 |
        |-----------|----------------|-----------------------------|
        🎉  Opening kubernetes service  default/hello-minikube in default browser...
        ********************************** Browser output ****************************
        CLIENT VALUES:
        client_address=172.17.0.1
        command=GET
        real path=/
        query=nil
        request_version=1.1
        request_uri=http://192.168.99.101:8080/
        
        SERVER VALUES:
        server_version=nginx: 1.10.0 - lua: 10001
        
        HEADERS RECEIVED:
        accept=text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
        accept-encoding=gzip, deflate
        accept-language=en-US,en;q=0.9
        connection=keep-alive
        host=192.168.99.101:31645
        upgrade-insecure-requests=1
        user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36
        BODY:
        -no body in request-
        ```

        ```wiki
        curl $(minikube service hello-minikube --url)
        ********************************** command output ****************************
        CLIENT VALUES:
        client_address=172.17.0.1
        command=GET
        real path=/
        query=nil
        request_version=1.1
        request_uri=http://192.168.99.101:8080/
        
        SERVER VALUES:
        server_version=nginx: 1.10.0 - lua: 10001
        
        HEADERS RECEIVED:
        accept=*/*
        host=192.168.99.101:31645
        user-agent=curl/7.54.0
        BODY:
        -no body in request-%
        ```

      - 登录节点(minikube mac节点）访问: <br/>

        登录到virutalbox控制台（minikube虚拟机）上直接访问：<br/>

        `curl http://10.96.133.160:8080/` <br/>

   6. docker容器

      部署应用，其实就是启动了docker应用

      ```shell
      docker ps
      ```

      默认是没有东西的，执行下面命令

      ```shell
      eval $(minikube docker-env)
      #then 
      docker ps
      ```

      可以看见很多容器启动。

      ```wiki
      k8s_hello-minikube_hello-minikube-64c7df9db-wmhjb_default_de93c335-e2e
      是前面部署的容器对象
      k8s_POD_hello-minikube-64c7df9db-wmhjb_default_de93c335-e2ed-4662-ad2f
      是kubenertes pod里面默认的pause容器
      ```

      kubernetes容器可以使用docker，并在此基础上封装了很多内容

   7. minikube 提供了dashboard可视化界面

      ```shell
      minikube dashboard
      ```

      ![hello-minikube-deployments-pod](../images/hello-minikube-deployments-pod.png)

      ![hello-minikube-services](../images/hello-minikube-services.png)

   8. 删除服务

      ```shell
      kubectl delete services hello-minikube
      kubectl get services
      ------------------------------output-----------------------------
      NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
      kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   64m
      ```

   9. 删除应用

      ```shell
      kubectl delete deployment hello-minikube
      ```

   10. 停止minikube

       ```shell
       minikube stop
       ------------------------------output-----------------------------
       ✋  Stopping "minikube" in virtualbox ...
       🛑  "minikube" stopped
       ```

   ****

   