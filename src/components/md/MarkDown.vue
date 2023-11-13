<template>
  <v-md-editor v-model="str" height="500px"></v-md-editor>
  <button style="width: 200px;height: 100px;background-color: aqua" @click="console.log(str)"></button>
  <v-md-preview :text=str></v-md-preview>
</template>

<style scoped>

</style>
<script lang="ts">
import {computed, defineComponent} from 'vue';
export default defineComponent({
  name:'MarkDown',
  setup(){
    const str='##  Go语言实现常见的负载均衡算法\n' +
        '\n' +
        '### 简介\n' +
        '\n' +
        '​\t负载均衡建立在现有网络结构之上，它提供了一种廉价有效透明的方法扩展网络设备和服务器的带宽、增加吞吐量、加强网络数据处理能力、提高网络的灵活性和可用性。\n' +
        '\n' +
        '​\t负载均衡*（Load Balance）*其意思就是分摊到多个操作单元上进行执行，例如Web服务器、FTP服务器、企业关键应用服务器和其它关键任务服务器等，从而共同完成工作任务。\n' +
        '\n' +
        '负载均衡的常见算法有\n' +
        '\n' +
        '- 随机负载均衡\n' +
        '- 加权随机负载均衡\n' +
        '- 轮询负载均衡\n' +
        '- 加权负载均衡\n' +
        '- 加权平滑轮询负载均衡\n' +
        '- 一致性hash负载均衡\n' +
        '\n' +
        '### 随机负载均衡\n' +
        '\n' +
        '#### 概述\n' +
        '\n' +
        '在客户端发送请求到路由服务器时随机选取后台服务器进行响应\n' +
        '\n' +
        '```go\n' +
        'package banlance\n' +
        '\n' +
        'import (\n' +
        '\t"errors"\n' +
        '\t"math/rand"\n' +
        ')\n' +
        '\n' +
        'type RandomBanlance struct {\n' +
        '\tcurIndex int\n' +
        '\tmacList  []string\n' +
        '}\n' +
        '\n' +
        'var randomtest RandomBanlance\n' +
        '\n' +
        '// 添加后台机器\n' +
        'func (r *RandomBanlance) Add(params ...string) error {\n' +
        '\tif len(params) == 0 {\n' +
        '\t\treturn errors.New("params len 1 at least")\n' +
        '\t}\n' +
        '\t//可以在赋值之前加一个输入参数正确性判断\n' +
        '\tr.macList = append(r.macList, params...)\n' +
        '\treturn nil\n' +
        '}\n' +
        '\n' +
        '// 随机化负载均衡\n' +
        'func (r *RandomBanlance) Next() string {\n' +
        '\tif len(r.macList) == 0 {\n' +
        '\t\treturn ""\n' +
        '\t}\n' +
        '\tr.curIndex = rand.Intn(len(r.macList))\n' +
        '\treturn r.macList[r.curIndex]\n' +
        '}\n' +
        '\n' +
        '// 提供随机化接口\n' +
        'func (r *RandomBanlance) Get() (res string, error error) {\n' +
        '\tmac := r.Next()\n' +
        '\tif mac == "" {\n' +
        '\t\treturn "", errors.New("no machine backend")\n' +
        '\t}\n' +
        '\treturn mac, nil\n' +
        '}\n' +
        '\n' +
        '```\n' +
        '\n' +
        '### 加权随机负载均衡\n' +
        '\n' +
        '#### 概述\n' +
        '\n' +
        '在随机负载均衡的基础上为每个节点赋予权重，让不同负载能力的节点响应请求的概率呈现处差异。\n' +
        '\n' +
        '#### 加权随机负载均衡\n' +
        '\n' +
        '实现方法有两种：\n' +
        '\n' +
        '- 简单加权随机：将所有的节点放入一个List中，根据权重来选择装入几次节点信息，比如"121.0.0.1"这个节点的权重是2，那么就装入两次该IP。这个方法的问题在于当节点数量和权重值相对大的时候List会非常大，耗费很大的空间。\n' +
        '- 优化简单加权随机：为了解决简单加权随机的问题，我们可以采用坐标映射。假设A,B,C分别代表3个IP，权重分别为2，3，5，映射到坐标轴为：0—2—5—10 ，我们随意取在区间内的一个整数7，那么对应的就是C这台服务器，具体代码如下。\n' +
        '\n' +
        '```go\n' +
        'package banlance\n' +
        '\n' +
        'import (\n' +
        '\t"errors"\n' +
        '\t"math/rand"\n' +
        '\t"sort"\n' +
        ')\n' +
        '\n' +
        'type WeightRandomBanlance struct {\n' +
        '\taddrs   []WeightRandomNode\n' +
        '\tweights []int //记录排序后的权重前缀和\n' +
        '\tmax     int   //记录权重的总和\n' +
        '}\n' +
        'type WeightRandomNode struct {\n' +
        '\taddr   string\n' +
        '\tweight int\n' +
        '}\n' +
        '\n' +
        'func NewWeightRandomBanlance(w ...WeightRandomNode) WeightRandomBanlance {\n' +
        '\t//将节点按权重从小到大排序\n' +
        '\tsort.Slice(w, func(i, j int) bool {\n' +
        '\t\treturn w[i].weight < w[j].weight\n' +
        '\t})\n' +
        '\tweights := make([]int, 0)\n' +
        '\ttotal := 0\n' +
        '\tfor i := 0; i < len(w); i++ {\n' +
        '\t\ttotal += w[i].weight\n' +
        '\t\tweights = append(weights, total)\n' +
        '\t}\n' +
        '\treturn WeightRandomBanlance{\n' +
        '\t\taddrs:   w,\n' +
        '\t\tweights: weights,\n' +
        '\t\tmax:     total,\n' +
        '\t}\n' +
        '}\n' +
        'func NewWeightRandomNode(addr string, weight int) WeightRandomNode {\n' +
        '\treturn WeightRandomNode{\n' +
        '\t\taddr:   addr,\n' +
        '\t\tweight: weight,\n' +
        '\t}\n' +
        '}\n' +
        '\n' +
        '// 添加节点\n' +
        'func (w *WeightRandomBanlance) Add(wn ...WeightRandomNode) {\n' +
        '\tnodes := append(w.addrs, wn...)\n' +
        '\tsort.Slice(nodes, func(i, j int) bool {\n' +
        '\t\treturn nodes[i].weight < nodes[j].weight\n' +
        '\t})\n' +
        '\tweights := make([]int, 0)\n' +
        '\ttotal := 0\n' +
        '\tfor i := 0; i < len(nodes); i++ {\n' +
        '\t\ttotal += nodes[i].weight\n' +
        '\t\tweights = append(weights, total)\n' +
        '\t}\n' +
        '\tw.addrs = nodes\n' +
        '\tw.max = total\n' +
        '\tw.weights = weights\n' +
        '}\n' +
        'func (w *WeightRandomBanlance) Next() string {\n' +
        '\tif len(w.weights) == 0 {\n' +
        '\t\treturn ""\n' +
        '\t}\n' +
        '\tr := rand.Intn(w.max) + 1 //从1开始计数\n' +
        '\tindex := sort.SearchInts(w.weights, r)\n' +
        '\treturn w.addrs[index].addr\n' +
        '}\n' +
        'func (w *WeightRandomBanlance) Get() (string, error) {\n' +
        '\tmac := w.Next()\n' +
        '\tif mac == "" {\n' +
        '\t\treturn mac, errors.New("no node backend")\n' +
        '\t}\n' +
        '\treturn mac, nil\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '\n' +
        '\n' +
        '### 轮询负载均衡\n' +
        '\n' +
        '#### 概述\n' +
        '\n' +
        '在client发送请求到路由服务器时轮询后台服务器进行响应\n' +
        '\n' +
        '```go\n' +
        'package banlance\n' +
        '\n' +
        'import "errors"\n' +
        '\n' +
        '//轮询负载均衡\n' +
        'type PollingBanlance struct {\n' +
        '\tcurIndex int\n' +
        '\tmacList  []string\n' +
        '}\n' +
        '\n' +
        'func (p *PollingBanlance) Add(params ...string) error {\n' +
        '\tif len(params) == 0 {\n' +
        '\t\treturn errors.New("params len 1 at least")\n' +
        '\t}\n' +
        '\tp.macList = append(p.macList, params...)\n' +
        '\treturn nil\n' +
        '}\n' +
        'func (p *PollingBanlance) Next() string {\n' +
        '\tif len(p.macList) == 0 {\n' +
        '\t\treturn ""\n' +
        '\t}\n' +
        '\tlens := len(p.macList)\n' +
        '\tif p.curIndex >= lens {\n' +
        '\t\tp.curIndex = 0\n' +
        '\t}\n' +
        '\tmac := p.macList[p.curIndex]\n' +
        '\tp.curIndex = (p.curIndex + 1) % lens\n' +
        '\treturn mac\n' +
        '}\n' +
        'func (p *PollingBanlance) Get() (string, error) {\n' +
        '\tmac := p.Next()\n' +
        '\tif mac == "" {\n' +
        '\t\treturn mac, errors.New("no machine backend")\n' +
        '\t}\n' +
        '\treturn mac, nil\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '\n' +
        '### 加权平滑轮询负载均衡\n' +
        '\n' +
        '#### 概述\n' +
        '\n' +
        '在轮询负载均衡的基础上为每个服务器节点加入了权重，client的请求会根据权重平滑的分散在不同的服务器节点。\n' +
        '\n' +
        '#### 加权轮询\n' +
        '\n' +
        '实现方法有两种\n' +
        '\n' +
        '- 加权轮询：加权轮询在轮询的基础上赋予了每个节点权重，算法的思想和优化可以参照加权随机负载均衡，只不过加权轮询在转发下一个请求的时候是curindex+1而不是随机的获取\n' +
        '- 加权平滑轮询：平滑轮询有一个缺点就是在某一时刻连续的几个client请求会被发送大同一个服务器上就行处理，而其它机器则处于空闲状态，加权平滑轮询在加权轮询的基础上提高的请求发往服务器的离散型。算法举例：假设由A,B,C三台机器，权重分别是2，3，5\n' +
        '\n' +
        '| 轮次      | (A,B,C)当前权重 | 选择当前权重最大的节点 | 修改权重  |\n' +
        '| --------- | --------------- | ---------------------- | --------- |\n' +
        '| 0(初始化) | (0,0,0)         |                        |           |\n' +
        '| 1         | (2,3,5)         | C                      | (2,3,-5)  |\n' +
        '| 2         | (4,6,0)         | B                      | (4,-4,0)  |\n' +
        '| 3         | (6,-1,5)        | A                      | (-4,-1,5) |\n' +
        '| 4         | (-2,2,10)       | C                      | (-2,2,0)  |\n' +
        '| 5         | (0,5,5)         | B                      | (0,-5,5)  |\n' +
        '| 6         | (2,-2,10)       | C                      | (2,-2,0)  |\n' +
        '| 7         | (4,1,5)         | C                      | (4,1,-5)  |\n' +
        '| 8         | (6,4,0)         | A                      | (-4,4,0)  |\n' +
        '| 9         | (-2,7,5)        | B                      | (-2,-3,5) |\n' +
        '| 10        | (0,0,10)        | C                      | (0,0,0)   |\n' +
        '\n' +
        '上述表格描述了A,B,C三个节点在一轮下来当前权重的变化过程，代码如下\n' +
        '\n' +
        '```go\n' +
        'package banlance\n' +
        '\n' +
        'import (\n' +
        '\t"errors"\n' +
        '\t"strconv"\n' +
        ')\n' +
        '\n' +
        'type WeightPollingBanlance struct {\n' +
        '\tcurIndex int\n' +
        '\tmacList  []*weightNode\n' +
        '}\n' +
        'type weightNode struct {\n' +
        '\taddr            string\n' +
        '\tweight          int //初始化的权重\n' +
        '\tcurWeight       int //更新的临时权重\n' +
        '\teffectiveWeight int //节点有效权重\n' +
        '}\n' +
        '\n' +
        'func (r *WeightPollingBanlance) Add(params ...string) error {\n' +
        '\tif len(params) != 2 {\n' +
        '\t\treturn errors.New("params len need 2")\n' +
        '\t}\n' +
        '\tweight, err := strconv.ParseInt(params[1], 10, 64)\n' +
        '\tif err != nil {\n' +
        '\t\treturn err\n' +
        '\t}\n' +
        '\tnode := &weightNode{\n' +
        '\t\taddr:   params[0],\n' +
        '\t\tweight: int(weight),\n' +
        '\t}\n' +
        '\tnode.effectiveWeight = node.weight\n' +
        '\tr.macList = append(r.macList, node)\n' +
        '\treturn nil\n' +
        '}\n' +
        'func (r *WeightPollingBanlance) Next() string {\n' +
        '\tif len(r.macList) == 0 {\n' +
        '\t\treturn ""\n' +
        '\t}\n' +
        '\tvar best *weightNode\n' +
        '\ttotal := 0\n' +
        '\tfor i := 0; i < len(r.macList); i++ {\n' +
        '\t\tw := r.macList[i]\n' +
        '\t\t//1,获取权重总和\n' +
        '\t\ttotal += w.effectiveWeight\n' +
        '\t\t//2,更新curWeight\n' +
        '\t\tw.curWeight += w.effectiveWeight\n' +
        '\t\t//3,\n' +
        '\t\tif w.effectiveWeight < w.weight {\n' +
        '\t\t\tw.effectiveWeight++\n' +
        '\t\t}\n' +
        '\t\t//4,选中临时权重最大的节点\n' +
        '\t\tif best == nil || best.curWeight < w.curWeight {\n' +
        '\t\t\tbest = w\n' +
        '\t\t\tr.curIndex = i\n' +
        '\t\t}\n' +
        '\t}\n' +
        '\tif best == nil {\n' +
        '\t\treturn ""\n' +
        '\t}\n' +
        '\t//5,修改临时权重为临时权重-total\n' +
        '\tbest.curWeight = best.curWeight - total\n' +
        '\treturn best.addr\n' +
        '}\n' +
        'func (r *WeightPollingBanlance) Get() (string, error) {\n' +
        '\tmac := r.Next()\n' +
        '\tif mac == "" {\n' +
        '\t\treturn mac, errors.New("no machine backend")\n' +
        '\t}\n' +
        '\treturn mac, nil\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '\n' +
        '\n';
    const text="";
    const log=computed(()=>{
      return console.log(text)
    })
    return {
      str,
      text,
      log
    };
  },
})
</script>