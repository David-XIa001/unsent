import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom'
import { loadData, saveData, initDataIfEmpty, fetchLocalData, saveLocalData } from './utils/storage'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const theme = {
  primary: '#ff4757',     // 霓虹红 (危险/警示)
  secondary: '#2ed573',   // 霓虹绿 (安全/成功)
  warning: '#ffe66d',     // 柠檬黄 (线索/警告)
  bg: '#0a0b10',          // 深邃背景
  sidebarBg: '#11121b',   // 侧边栏暗色
  mainBg: 'linear-gradient(135deg, #0d0f17 0%, #161925 100%)',
  cardBg: 'rgba(22, 28, 45, 0.65)', // 毛玻璃卡片
  borderColor: 'rgba(255, 255, 255, 0.08)',
  textMain: '#f1f2f6',
  textMuted: '#a4b0be'
}

const cardStyle = {
  background: theme.cardBg,
  borderRadius: 16,
  padding: 24,
  backdropFilter: 'blur(16px)',
  border: '1px solid ' + theme.borderColor,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
  marginBottom: 20,
  color: theme.textMain
}

const inputStyle = {
  padding: '10px 14px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 14,
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'all 0.3s ease'
}

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: theme.textMuted,
  marginBottom: 6
}


function CharactersPage() {
  const [characters, setCharacters] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ id: '', name: '', description: '', chainInput: '' })

  useEffect(() => {
    initDataIfEmpty()
    setCharacters(loadData().characters)
  }, [])

  function refresh() {
    setCharacters(loadData().characters)
  }

  function startAdd() {
    setEditing({ isNew: true })
    setForm({ id: '', name: '', description: '', chainInput: '' })
  }

  function startEdit(char) {
    setEditing({ isNew: false, id: char.id })
    setForm({ id: char.id, name: char.name, description: char.description, chainInput: (char.chains || []).join(', ') })
  }

  function cancelEdit() {
    setEditing(null)
  }

  function saveChar() {
    if (!form.name.trim()) return
    const chains = form.chainInput.split(',').map(s => s.trim()).filter(Boolean)
    const data = loadData()
    if (editing.isNew) {
      const newId = form.id.trim() || 'char_' + Date.now()
      data.characters.push({ id: newId, name: form.name.trim(), description: form.description.trim(), chains })
    } else {
      const idx = data.characters.findIndex(c => c.id === editing.id)
      if (idx !== -1) {
        data.characters[idx] = { id: editing.id, name: form.name.trim(), description: form.description.trim(), chains }
      }
    }
    saveData(data)
    setEditing(null)
    refresh()
  }

  function deleteChar(id) {
    const data = loadData()
    data.characters = data.characters.filter(c => c.id !== id)
    saveData(data)
    refresh()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>👤 角色管理</h1>
        <button onClick={startAdd} style={{ background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, boxShadow: '0 4px 15px rgba(255,71,87,0.3)', transition: 'all 0.3s ease' }}>+ 新增角色</button>
      </div>

      {editing && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10 }}>{editing.isNew ? '✨ 新增角色' : '📝 编辑角色'}</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <div style={labelStyle}>角色ID（英文）</div>
              <input placeholder="例如: student" value={form.id} onChange={e => setForm({...form, id: e.target.value})} disabled={!editing.isNew} style={{ ...inputStyle, opacity: editing.isNew ? 1 : 0.6 }} />
            </div>
            <div>
              <div style={labelStyle}>角色名称</div>
              <input placeholder="例如: 小学生" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <div style={labelStyle}>角色描述</div>
              <textarea placeholder="输入角色的背景和特征描述..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <div style={labelStyle}>关联任务链ID（逗号分隔）</div>
              <input placeholder="例如: go_to_school, go_to_playground" value={form.chainInput} onChange={e => setForm({...form, chainInput: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              <button onClick={saveChar} style={{ background: 'linear-gradient(135deg, #2ed573, #20bf6b)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, boxShadow: '0 4px 12px rgba(46,213,115,0.2)' }}>保存</button>
              <button onClick={cancelEdit} style={{ background: 'rgba(255,255,255,0.08)', color: '#e0e0e0', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 500 }}>取消</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: 14 }}>
        {characters.map(char => (
          <div key={char.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '18px 24px' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', marginBottom: 6 }}>{char.name}</div>
              <div style={{ fontSize: 13, color: theme.textMuted, display: 'flex', gap: 12 }}>
                <span>ID: <code style={{ color: '#ffffe0', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>{char.id}</code></span>
                <span>•</span>
                <span>描述: {char.description ? (char.description.length > 30 ? char.description.substring(0, 30) + '...' : char.description) : '无'}</span>
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 6 }}>
                ⛓️ 任务链: {(char.chains || []).map(c => <span key={c} style={{ background: 'rgba(255,71,87,0.08)', color: '#ff6b6b', padding: '2px 8px', borderRadius: 4, marginRight: 6, border: '1px solid rgba(255,71,87,0.15)', fontSize: 12 }}>{c}</span>) || '未关联'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => startEdit(char)} style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>编辑</button>
              <button onClick={() => deleteChar(char.id)} style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.2)', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChainsPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({ characters: [], chains: {} })
  const [filterChar, setFilterChar] = useState('all')

  useEffect(() => {
    setData(loadData())
  }, [])

  const chainList = Object.entries(data.chains).map(([id, chain]) => ({
    id,
    ...chain,
    charName: (data.characters.find(c => c.id === chain.characterId) || {}).name || '未知'
  })).filter(c => filterChar === 'all' || c.characterId === filterChar)

  function deleteChain(id) {
    if (!confirm('确认删除此任务链？')) return
    const d = loadData()
    delete d.chains[id]
    saveData(d)
    setData(d)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>⛓️ 任务链管理</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select value={filterChar} onChange={e => setFilterChar(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 14, background: 'rgba(255,255,255,0.03)', color: '#fff', outline: 'none', cursor: 'pointer' }}>
            <option value="all" style={{ background: '#1e2439', color: '#fff' }}>全部角色</option>
            {data.characters.map(c => (
              <option key={c.id} value={c.id} style={{ background: '#1e2439', color: '#fff' }}>{c.name}</option>
            ))}
          </select>
          <button onClick={() => navigate('/chains/new')}
            style={{ background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, boxShadow: '0 4px 15px rgba(255,71,87,0.3)', transition: 'all 0.3s' }}>+ 新增任务链</button>
        </div>
      </div>

      {chainList.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 40px', color: theme.textMuted, fontSize: 14, background: theme.cardBg, borderRadius: 16, border: '1px solid ' + theme.borderColor }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛸</div>
          暂无任务链数据
        </div>
      )}

      <div style={{ display: 'grid', gap: 14 }}>
        {chainList.map(chain => (
          <div key={chain.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '18px 24px' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', marginBottom: 6 }}>{chain.name}</div>
              <div style={{ fontSize: 13, color: theme.textMuted, display: 'flex', gap: 12, alignItems: 'center' }}>
                <span>ID: <code style={{ color: '#ffffe0', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>{chain.id}</code></span>
                <span>•</span>
                <span>所属角色: <span style={{ color: '#4ecdc4', fontWeight: 500 }}>{chain.charName}</span></span>
                <span>•</span>
                <span>包含节点: <span style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: 12 }}>{chain.nodes ? Object.keys(chain.nodes).length : 0} 个</span></span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => navigate('/chains/' + chain.id)}
                style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>编辑</button>
              <button onClick={() => deleteChain(chain.id)}
                style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.2)', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// BFS 自动拓扑层级对齐算法
// ==========================================
function computeAutoLayout(startNodeId, originalNodes) {
  const nodes = JSON.parse(JSON.stringify(originalNodes || {}))
  const nodeIds = Object.keys(nodes)
  if (nodeIds.length === 0) return nodes

  const startId = startNodeId && nodes[startNodeId] ? startNodeId : nodeIds[0]

  // 构建邻接表
  const adj = {}
  nodeIds.forEach(id => {
    adj[id] = []
    const choices = nodes[id].choices || []
    choices.forEach(c => {
      if (c.nextNode && nodes[c.nextNode]) {
        adj[id].push(c.nextNode)
      }
    })
  })

  // BFS 遍历计算层级深度
  const depth = {}
  const queue = [startId]
  depth[startId] = 0

  while (queue.length > 0) {
    const curr = queue.shift()
    const currDepth = depth[curr]
    const neighbors = adj[curr] || []
    neighbors.forEach(next => {
      if (depth[next] === undefined) {
        depth[next] = currDepth + 1
        queue.push(next)
      }
    })
  }

  // 找出最大连通深度，未连通的节点放到最后一层
  let maxDepth = 0
  Object.values(depth).forEach(d => {
    if (d > maxDepth) maxDepth = d
  })

  nodeIds.forEach(id => {
    if (depth[id] === undefined) {
      depth[id] = maxDepth + 1
    }
  })

  // 统计每一层节点的数量，用于垂直居中分布
  const levelsCount = {}
  nodeIds.forEach(id => {
    const d = depth[id]
    levelsCount[d] = (levelsCount[d] || 0) + 1
  })

  const levelsOffset = {}
  nodeIds.forEach(id => {
    // 只有节点本没有坐标，或者强行重置时，才计算坐标
    if (!nodes[id].position) {
      const d = depth[id]
      const idx = levelsOffset[d] || 0
      levelsOffset[d] = idx + 1

      const totalInLevel = levelsCount[d]
      const ySpacing = 280
      const xSpacing = 360
      // 垂直居中分布
      const startY = -((totalInLevel - 1) * ySpacing) / 2

      nodes[id].position = {
        x: 100 + d * xSpacing,
        y: startY + idx * ySpacing + 200
      }
    }
  })

  return nodes
}

// ==========================================
// 全局剧情拓扑可达性分析算法（可达性染色）
// ==========================================
function getSuccessfulNodes(rfNodes) {
  const successfulNodes = new Set()
  const adj = {} // 反向邻接表：targetNodeId -> [sourceNodeId]

  // 1. 初始化邻接表并收集所有包含 isSuccess === true 的成功通关终点节点
  rfNodes.forEach(n => {
    const nodeId = n.id
    adj[nodeId] = []
    const choices = n.data?.choices || []
    const hasSuccess = choices.some(c => c.isSuccess === true)
    if (hasSuccess) {
      successfulNodes.add(nodeId)
    }
  })

  // 2. 建立反向图结构
  rfNodes.forEach(n => {
    const sourceId = n.id
    const choices = n.data?.choices || []
    choices.forEach(c => {
      if (c.nextNode) {
        const targetId = c.nextNode
        if (adj[targetId]) {
          adj[targetId].push(sourceId)
        } else {
          adj[targetId] = [sourceId]
        }
      }
    })
  })

  // 3. BFS 反向图遍历，得出所有能连通通关成功的祖先节点集合
  const queue = Array.from(successfulNodes)
  const visited = new Set(successfulNodes)

  while (queue.length > 0) {
    const curr = queue.shift()
    const parents = adj[curr] || []
    parents.forEach(p => {
      if (!visited.has(p)) {
        visited.add(p)
        queue.push(p)
      }
    })
  }

  return visited
}

// ==========================================
// 自定义节点 StoryNode
// ==========================================
function StoryNode({ data }) {
  const { nodeId, description, choices, isStart } = data
  return (
    <div style={{
      background: 'rgba(20, 24, 38, 0.85)',
      borderRadius: 14,
      padding: '14px 18px',
      backdropFilter: 'blur(20px)',
      border: isStart ? `2px solid ${theme.warning}` : `1px solid ${theme.borderColor}`,
      boxShadow: isStart ? `0 0 20px rgba(255, 230, 109, 0.25)` : `0 8px 32px rgba(0, 0, 0, 0.35)`,
      minWidth: 260,
      maxWidth: 300,
      color: theme.textMain,
      position: 'relative',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* 入水口：左侧 */}
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input"
        style={{ 
          background: '#4ecdc4', 
          width: 10, 
          height: 10, 
          borderRadius: '50%', 
          left: -6,
          border: '2px solid #0a0b10',
          boxShadow: '0 0 6px #4ecdc4',
          cursor: 'crosshair'
        }} 
      />

      {/* 卡片头部 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 6 }}>
        <span style={{ fontWeight: 'bold', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: isStart ? theme.warning : '#fff' }}>
          {isStart ? '🚩 起始' : '🎋 剧情节点'}
        </span>
        <code style={{ fontSize: 11, color: theme.textMuted, background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>{nodeId}</code>
      </div>

      {/* 卡片剧情描述 */}
      <div style={{ 
        fontSize: 12, 
        color: theme.textMuted, 
        lineHeight: 1.5, 
        marginBottom: 12, 
        wordBreak: 'break-all', 
        display: '-webkit-box', 
        WebkitLineClamp: 3, 
        WebkitBoxOrient: 'vertical', 
        overflow: 'hidden' 
      }}>
        {description || <em style={{ color: '#555', fontStyle: 'normal' }}>暂无环境描述，双击编辑...</em>}
      </div>

      {/* 选项出水口 */}
      <div style={{ display: 'grid', gap: 8 }}>
        {choices && choices.map((choice, idx) => {
          const isHighRisk = choice.deathRate >= 0.3
          return (
            <div key={idx} style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: 6,
              padding: '6px 10px',
              fontSize: 11,
              border: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#fff', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>
                👉 {choice.text || `选项 ${idx + 1}`}
              </span>
              <span style={{ fontSize: 9, color: isHighRisk ? theme.primary : theme.secondary, fontWeight: 'bold' }}>
                💀 {Math.round((choice.deathRate || 0) * 100)}%
              </span>
              {/* 出水口：右侧，精准定位到具体选项的右边缘 */}
              <Handle
                type="source"
                position={Position.Right}
                id={`${nodeId}-choice-${idx}`}
                style={{
                  background: isHighRisk ? theme.primary : theme.secondary,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  right: -14,
                  border: '1px solid #0a0b10',
                  boxShadow: isHighRisk ? `0 0 6px ${theme.primary}` : `0 0 6px ${theme.secondary}`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'crosshair'
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const nodeTypes = { storyNode: StoryNode }

// ==========================================
// ChainEditorPage 主编辑器组件
// ==========================================
function ChainEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [chain, setChain] = useState(null)
  const [characters, setCharacters] = useState([])
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  
  // React Flow 核心状态
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [activeNodeId, setActiveNodeId] = useState(null)
  const [basicInfoExpanded, setBasicInfoExpanded] = useState(true)

  // 局部抽屉属性报错状态，用于保证 JSON 强稳定性，防止崩溃
  const [jsonErrors, setJsonErrors] = useState({})

  const [previewState, setPreviewState] = useState({
    currentNodeId: '',
    flags: {},
    finished: false,
    success: false,
    result: '',
    history: []
  })

  // 1. 载入原始数据，运行自适应层级分布并组装 ReactFlow 节点
  useEffect(() => {
    const d = loadData()
    setCharacters(d.characters)
    
    let loadedChain = null
    if (id === 'new') {
      loadedChain = {
        id: '', name: '', characterId: '', description: '', startNode: '', flags: [],
        nodes: {}
      }
    } else if (d.chains[id]) {
      loadedChain = JSON.parse(JSON.stringify(d.chains[id]))
    }

    if (loadedChain) {
      setChain(loadedChain)
      
      // 跑自动层级分布，确保初始坐标无误
      const autoLaidOut = computeAutoLayout(loadedChain.startNode, loadedChain.nodes)
      
      // 组装 React Flow nodes
      const rfNodes = Object.entries(autoLaidOut).map(([nodeId, node]) => ({
        id: nodeId,
        type: 'storyNode',
        position: node.position,
        data: {
          nodeId: nodeId,
          description: node.description || '',
          choices: node.choices || [],
          isStart: nodeId === loadedChain.startNode
        }
      }))

      // 组装 React Flow edges
      const rfEdges = []
      const successNodes = getSuccessfulNodes(rfNodes)
      Object.entries(autoLaidOut).forEach(([nodeId, node]) => {
        if (node.choices) {
          node.choices.forEach((choice, idx) => {
            if (choice.nextNode && autoLaidOut[choice.nextNode]) {
              // 流程编排染色：目标节点能通向终点 -> 霓虹绿 🟢（生路），否则 -> 霓虹红 🔴（死路）
              const strokeColor = successNodes.has(choice.nextNode) ? theme.secondary : theme.primary
              rfEdges.push({
                id: `edge-${nodeId}-${nodeId}-choice-${idx}-${choice.nextNode}`,
                source: nodeId,
                target: choice.nextNode,
                sourceHandle: `${nodeId}-choice-${idx}`,
                label: choice.text || `选项 ${idx + 1}`,
                type: 'default',
                animated: true,
                style: {
                  stroke: strokeColor,
                  strokeWidth: 3,
                  filter: `drop-shadow(0px 0px 5px ${strokeColor})`
                },
                labelStyle: {
                  fill: '#fff',
                  fontSize: 11,
                  fontWeight: 600
                },
                labelBgStyle: {
                  fill: '#1a1a2e',
                  fillOpacity: 0.85,
                  rx: 4,
                  ry: 4
                },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: strokeColor
                }
              })
            }
          })
        }
      })

      setNodes(rfNodes)
      setEdges(rfEdges)
    }
  }, [id])

  // 1.5 全局响应式剧情拓扑可达性染色
  // 任何时候只要 nodes 拓扑树状态发生任何增删改，自动重绘全局 edges 的红绿生死路发光属性
  useEffect(() => {
    if (nodes.length === 0) return

    const successNodes = getSuccessfulNodes(nodes)

    setEdges(prevEdges => {
      let changed = false
      const nextEdges = prevEdges.map(edge => {
        // 流程编排染色：根据目标节点是否能最终通向终点，动态决定红/绿
        const strokeColor = successNodes.has(edge.target) ? theme.secondary : theme.primary
        if (edge.style?.stroke !== strokeColor) {
          changed = true
          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: strokeColor,
              filter: `drop-shadow(0px 0px 5px ${strokeColor})`
            },
            markerEnd: {
              ...edge.markerEnd,
              color: strokeColor
            }
          }
        }
        return edge
      })
      return changed ? nextEdges : prevEdges
    })
  }, [nodes])

  // 2. 双向数据保存逻辑 (将 ReactFlow 节点拖拽坐标和 Edge 关系重新组装反写)
  function save() {
    if (!chain.id.trim()) { alert('请输入任务链ID'); return }
    if (!chain.name.trim()) { alert('请输入任务链名称'); return }
    if (Object.keys(jsonErrors).length > 0) {
      alert('⚠️ 请先修正右侧属性面板中的 JSON 格式错误！');
      return
    }

    setSaving(true)

    // 构建更新后的 nodes 对象
    const nextNodes = {}
    nodes.forEach(rfNode => {
      const originalNode = chain.nodes[rfNode.id] || { description: '', hints: [], choices: [] }
      nextNodes[rfNode.id] = {
        ...originalNode,
        // 保存时取整，让 chains.js 保持整洁
        position: { x: Math.round(rfNode.position.x), y: Math.round(rfNode.position.y) }
      }
    })

    // 清空所有 choices 的旧 nextNode 指向，再由 edges 重新映射
    Object.keys(nextNodes).forEach(nodeId => {
      if (nextNodes[nodeId].choices) {
        nextNodes[nodeId].choices = nextNodes[nodeId].choices.map(c => ({
          ...c,
          nextNode: '' 
        }))
      }
    })

    // 根据 edge 重新组装选项的指向
    edges.forEach(edge => {
      const { source, target, sourceHandle } = edge
      if (nextNodes[source] && nextNodes[target]) {
        const match = sourceHandle ? sourceHandle.match(/-choice-(\d+)$/) : null
        if (match) {
          const idx = parseInt(match[1])
          if (nextNodes[source].choices && nextNodes[source].choices[idx]) {
            nextNodes[source].choices[idx].nextNode = target
          }
        }
      }
    })

    const finalChain = {
      ...chain,
      nodes: nextNodes
    }

    const d = loadData()
    d.chains[chain.id] = finalChain
    saveData(d)

    setTimeout(() => {
      setSaving(false)
      alert('保存成功！')
      navigate('/chains')
    }, 200)
  }

  // 3. 画布事件：新增连线（只允许单路，覆盖旧连线）
  const onConnect = (connection) => {
    const { source, target, sourceHandle } = connection
    if (!source || !target || !sourceHandle) return
    if (source === target) return // 避免自环

    // 过滤掉所有以相同 sourceHandle 起始的旧 Edge，实现连线覆盖替换
    setEdges(prev => prev.filter(e => e.sourceHandle !== sourceHandle))

    let edgeLabel = '选项'
    const match = sourceHandle.match(/-choice-(\d+)$/)
    const idx = match ? parseInt(match[1]) : 0
    const rfNode = nodes.find(n => n.id === source)
    
    if (rfNode && rfNode.data.choices && rfNode.data.choices[idx]) {
      const choice = rfNode.data.choices[idx]
      edgeLabel = choice.text || `选项 ${idx + 1}`

      // 同步更新 nodes 状态中对应节点的数据
      setNodes(prev => prev.map(n => {
        if (n.id === source) {
          const nextChoices = [...n.data.choices]
          nextChoices[idx] = { ...nextChoices[idx], nextNode: target }
          return { ...n, data: { ...n.data, choices: nextChoices } }
        }
        return n
      }))

      // 同步更新局部状态 chain 中的 choices 下的 nextNode
      setChain(prev => {
        const nextNodes = { ...prev.nodes }
        if (nextNodes[source] && nextNodes[source].choices && nextNodes[source].choices[idx]) {
          nextNodes[source].choices[idx].nextNode = target
        }
        return { ...prev, nodes: nextNodes }
      })
    }

    const newEdge = {
      ...connection,
      id: `edge-${source}-${sourceHandle}-${target}`,
      label: edgeLabel,
      type: 'default',
      animated: true,
      style: {
        stroke: theme.textMuted,
        strokeWidth: 3,
        filter: `drop-shadow(0px 0px 5px ${theme.textMuted})`
      },
      labelStyle: {
        fill: '#fff',
        fontSize: 11,
        fontWeight: 600
      },
      labelBgStyle: {
        fill: '#1a1a2e',
        fillOpacity: 0.85,
        rx: 4,
        ry: 4
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: theme.textMuted
      }
    }

    setEdges((eds) => addEdge(newEdge, eds))
  }

  // 4. 一键自动重整拓扑排布
  function handleAutoLayout() {
    if (!confirm('确认要自动排列所有剧情节点卡片吗？这会清除当前的所有手动拖拽坐标。')) return

    const currentNodesRaw = {}
    nodes.forEach(n => {
      const originalNode = chain.nodes[n.id] || { description: '', hints: [], choices: [] }
      currentNodesRaw[n.id] = {
        ...originalNode,
        position: null // 强制重新计算
      }
    })

    const laidOut = computeAutoLayout(chain.startNode, currentNodesRaw)

    const nextNodes = nodes.map(n => ({
      ...n,
      position: laidOut[n.id].position
    }))

    setNodes(nextNodes)
  }

  // 5. 新建一个剧情节点
  function handleAddNode() {
    const newNodeId = 'node_' + Date.now()
    
    const newNode = {
      id: newNodeId,
      type: 'storyNode',
      position: { x: 200, y: 200 },
      data: {
        nodeId: newNodeId,
        description: '',
        choices: [],
        isStart: false
      }
    }
    
    setNodes(prev => [...prev, newNode])
    setChain(prev => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [newNodeId]: {
          description: '',
          hints: [],
          choices: [],
          position: { x: 200, y: 200 }
        }
      }
    }))

    // 新增后直接选中，方便策划快捷输入
    setActiveNodeId(newNodeId)
  }

  // 6. 彻底删除节点（含级联删除 Edges）
  function handleDeleteNode(nodeId) {
    if (!confirm(`确认要彻底删除剧情节点 [${nodeId}] 吗？这会断开所有指向它的剧情连线！`)) return

    setNodes(prev => prev.filter(n => n.id !== nodeId))
    setEdges(prev => prev.filter(e => e.source !== nodeId && e.target !== nodeId))
    
    setChain(prev => {
      const nextNodes = { ...prev.nodes }
      delete nextNodes[nodeId]
      
      let startNode = prev.startNode
      if (startNode === nodeId) startNode = ''

      return { ...prev, startNode, nodes: nextNodes }
    })

    if (activeNodeId === nodeId) setActiveNodeId(null)
  }

  // 7. 更新 activeNode 字段的单一真理源
  function updateActiveNodeData(field, value) {
    if (!activeNodeId) return

    // 同步 React Flow nodes
    setNodes(prev => prev.map(n => {
      if (n.id === activeNodeId) {
        return {
          ...n,
          data: { ...n.data, [field]: value }
        }
      }
      return n
    }))

    // 同步局部 chain
    setChain(prev => {
      const nextNodes = { ...prev.nodes }
      if (nextNodes[activeNodeId]) {
        nextNodes[activeNodeId] = {
          ...nextNodes[activeNodeId],
          [field]: value
        }
      }
      return { ...prev, nodes: nextNodes }
    })

    // 特殊：如果是 choices 发生变更，实时重绘 edges 相关文本 label，颜色由全局 useEffect 自动控制
    if (field === 'choices') {
      setEdges(prevEdges => prevEdges.map(edge => {
        if (edge.source === activeNodeId) {
          const match = edge.sourceHandle ? edge.sourceHandle.match(/-choice-(\d+)$/) : null
          if (match) {
            const idx = parseInt(match[1])
            const choice = value[idx]
            if (choice) {
              return {
                ...edge,
                label: choice.text || `选项 ${idx + 1}`
              }
            }
          }
        }
        return edge
      }))
    }
  }

  // 8. 属性面板中，快捷更新选项属性
  function updateChoiceDetail(choiceIdx, key, val) {
    const activeRfNode = nodes.find(n => n.id === activeNodeId)
    if (!activeRfNode) return

    const choices = [...(activeRfNode.data.choices || [])]
    if (!choices[choiceIdx]) return

    choices[choiceIdx] = {
      ...choices[choiceIdx],
      [key]: val
    }

    updateActiveNodeData('choices', choices)
  }

  // 9. 添加选项
  function handleAddChoice() {
    const activeRfNode = nodes.find(n => n.id === activeNodeId)
    if (!activeRfNode) return

    const choices = [...(activeRfNode.data.choices || []), {
      id: 'opt_' + Date.now().toString().slice(-4),
      text: '',
      deathRate: 0,
      deathCause: '',
      nextNode: '',
      isSuccess: false,
      conditions: '',
      effects: '',
      modifiers: ''
    }]

    updateActiveNodeData('choices', choices)
  }

  // 10. 删除选项 (包含级联删除画布连线)
  function handleRemoveChoice(choiceIdx) {
    const activeRfNode = nodes.find(n => n.id === activeNodeId)
    if (!activeRfNode) return

    const choices = (activeRfNode.data.choices || []).filter((_, i) => i !== choiceIdx)
    
    // 从 edges 移除针对该特定选项的旧连线
    setEdges(prev => prev.filter(e => e.sourceHandle !== `${activeNodeId}-choice-${choiceIdx}`))

    updateActiveNodeData('choices', choices)
  }

  // 11. 快捷更改 startNode 并高亮画布
  function handleStartNodeChange(value) {
    setChain(prev => ({ ...prev, startNode: value }))
    setNodes(prev => prev.map(n => ({
      ...n,
      data: {
        ...n.data,
        isStart: n.id === value
      }
    })))
  }

  // 游戏预览判定公式计算器
  function calculateRate(choice, description) {
    let rate = choice.deathRate || 0
    const mods = typeof choice.modifiers === 'string' ? parseField(choice.modifiers) : choice.modifiers || []
    if (Array.isArray(mods)) {
      for (var i = 0; i < mods.length; i++) {
        if (description && description.indexOf(mods[i].word) !== -1) {
          rate += mods[i].adj
        }
      }
    }
    if (rate < 0.05) rate = 0.05
    if (rate > 0.95) rate = 0.95
    return rate
  }

  function startPreview() {
    if (!chain) return
    // 生成临时预览的 nodes，需要和画布上的数据保持一致
    const currentNodesObj = {}
    nodes.forEach(n => {
      currentNodesObj[n.id] = {
        description: n.data.description,
        choices: n.data.choices,
        hints: chain.nodes[n.id]?.hints || []
      }
    })

    setPreviewMode(true)
    setPreviewState({
      currentNodeId: chain.startNode,
      flags: {},
      finished: false,
      success: false,
      result: '',
      history: []
    })
  }

  function parseField(val) {
    if (!val || val === '') return null
    if (typeof val === 'object') return val
    try { return JSON.parse(val) } catch (e) { return null }
  }

  function checkConditions(conditions, flags) {
    const conds = typeof conditions === 'string' ? parseField(conditions) : conditions
    if (!conds || typeof conds !== 'object') return true
    const keys = Object.keys(conds)
    if (keys.length === 0) return true
    for (var i = 0; i < keys.length; i++) {
      if (flags[keys[i]] !== conds[keys[i]]) return false
    }
    return true
  }

  // ==========================================
  // 渲染右侧滑出的半透明毛玻璃属性抽屉
  // ==========================================
  function renderNodeDrawer() {
    if (!activeNodeId) return null
    const activeNode = nodes.find(n => n.id === activeNodeId)
    if (!activeNode) return null

    const data = activeNode.data

    return (
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 380,
        height: '100%',
        background: 'rgba(16, 18, 27, 0.85)',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(24px)',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.4)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, sans-serif',
        color: theme.textMain
      }}>
        {/* 抽屉头部 */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
              🎋 属性配置
            </div>
            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>ID: <code style={{ color: theme.warning }}>{activeNodeId}</code></div>
          </div>
          <button 
            onClick={() => setActiveNodeId(null)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '50%',
              width: 28,
              height: 28,
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14
            }}
          >
            ✕
          </button>
        </div>

        {/* 抽屉滚动编辑区 */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* 环境剧情 */}
          <div>
            <div style={labelStyle}>环境与剧情描述</div>
            <textarea 
              style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} 
              value={data.description} 
              onChange={e => updateActiveNodeData('description', e.target.value)} 
              placeholder="玩家到达此节点时的剧情描述。注意：这里埋藏的“线索词”会与分支的死亡率修饰器互动。" 
            />
          </div>

          {/* 可选提示 (Hints) */}
          <div>
            <div style={labelStyle}>可选提示信息 (Hints，英文逗号分隔)</div>
            <input 
              style={inputStyle} 
              value={chain.nodes[activeNodeId]?.hints ? (Array.isArray(chain.nodes[activeNodeId].hints) ? chain.nodes[activeNodeId].hints.join(', ') : chain.nodes[activeNodeId].hints) : ''} 
              onChange={e => {
                const hints = e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                setChain(prev => {
                  const nextNodes = { ...prev.nodes }
                  if (nextNodes[activeNodeId]) {
                    nextNodes[activeNodeId] = { ...nextNodes[activeNodeId], hints }
                  }
                  return { ...prev, nodes: nextNodes }
                })
              }} 
              placeholder="提示玩家注意的细节，如: 伞, 积水" 
            />
          </div>

          {/* 抉择分支列表 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 'bold', color: theme.textMuted }}>🔀 抉择分支 ({data.choices ? data.choices.length : 0})</span>
              <button 
                onClick={handleAddChoice}
                style={{ 
                  background: 'rgba(46,213,115,0.12)', 
                  color: '#2ed573', 
                  border: '1px solid rgba(46,213,115,0.25)', 
                  padding: '4px 12px', 
                  borderRadius: 6, 
                  cursor: 'pointer', 
                  fontSize: 11, 
                  fontWeight: 600 
                }}
              >
                + 添加选项
              </button>
            </div>

            {(!data.choices || data.choices.length === 0) && (
              <div style={{ fontSize: 12, color: theme.textMuted, padding: '16px 0', textAlign: 'center', background: 'rgba(255,255,255,0.01)', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.05)' }}>
                暂无分支选项，右侧出水口为空。
              </div>
            )}

            <div style={{ display: 'grid', gap: 14 }}>
              {data.choices && data.choices.map((choice, ci) => {
                const isHighRisk = choice.deathRate >= 0.3
                return (
                  <div key={ci} style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 10,
                    padding: 14,
                    border: '1px solid rgba(255,255,255,0.04)',
                    position: 'relative'
                  }}>
                    {/* 选项头部 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 'bold', color: isHighRisk ? theme.primary : theme.secondary }}>选项 #{ci + 1}</span>
                      <button 
                        onClick={() => handleRemoveChoice(ci)}
                        style={{ 
                          background: 'transparent', 
                          color: '#ff4757', 
                          border: '1px solid rgba(255,71,87,0.15)', 
                          padding: '2px 8px', 
                          borderRadius: 4, 
                          cursor: 'pointer', 
                          fontSize: 10 
                        }}
                      >
                        删除
                      </button>
                    </div>

                    {/* 细节输入 */}
                    <div style={{ display: 'grid', gap: 10 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div>
                          <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>选项 ID (英文)</div>
                          <input 
                            style={{ ...inputStyle, fontSize: 12, padding: '6px 8px' }} 
                            value={choice.id || ''} 
                            onChange={e => updateChoiceDetail(ci, 'id', e.target.value)} 
                            placeholder="例如: run" 
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>选项文字</div>
                          <input 
                            style={{ ...inputStyle, fontSize: 12, padding: '6px 8px' }} 
                            value={choice.text || ''} 
                            onChange={e => updateChoiceDetail(ci, 'text', e.target.value)} 
                            placeholder="按钮呈现字" 
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div>
                          <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>基础死亡率 (0 ~ 1)</div>
                          <input 
                            type="number" 
                            min="0" 
                            max="1" 
                            step="0.05" 
                            style={{ ...inputStyle, fontSize: 12, padding: '6px 8px' }} 
                            value={choice.deathRate || 0} 
                            onChange={e => updateChoiceDetail(ci, 'deathRate', parseFloat(e.target.value) || 0)} 
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>是否直接胜利</div>
                          <select 
                            style={{ ...inputStyle, fontSize: 12, padding: '6px 8px', cursor: 'pointer' }} 
                            value={choice.isSuccess ? 'true' : 'false'} 
                            onChange={e => updateChoiceDetail(ci, 'isSuccess', e.target.value === 'true')}
                          >
                            <option value="false" style={{ background: '#1e2439' }}>否</option>
                            <option value="true" style={{ background: '#1e2439' }}>是 (活过今天)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>死亡原因描述</div>
                        <input 
                          style={{ ...inputStyle, fontSize: 12, padding: '6px 8px' }} 
                          value={choice.deathCause || ''} 
                          onChange={e => updateChoiceDetail(ci, 'deathCause', e.target.value)} 
                          placeholder="遭遇意外..." 
                        />
                      </div>

                      <div>
                        <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>跳转目标节点 ID（画布连线自动映射）</div>
                        <input 
                          style={{ ...inputStyle, fontSize: 12, padding: '6px 8px', opacity: 0.85 }} 
                          value={choice.nextNode || ''} 
                          onChange={e => updateChoiceDetail(ci, 'nextNode', e.target.value)} 
                          placeholder="连接出水口，或手动指定节点 ID" 
                        />
                      </div>

                      {/* 条件与修饰器 JSON 高防错校验 */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>前置触发条件 (Conditions JSON)</span>
                          {jsonErrors[`${ci}-cond`] && <span style={{ fontSize: 9, color: theme.primary }}>格式错</span>}
                        </div>
                        <input 
                          style={{ ...inputStyle, fontSize: 12, padding: '6px 8px', borderColor: jsonErrors[`${ci}-cond`] ? theme.primary : 'rgba(255,255,255,0.08)' }} 
                          value={typeof choice.conditions === 'object' ? JSON.stringify(choice.conditions) : choice.conditions || ''} 
                          onChange={e => {
                            const val = e.target.value
                            updateChoiceDetail(ci, 'conditions', val)
                            if (val.trim() === '') {
                              setJsonErrors(prev => { const n = { ...prev }; delete n[`${ci}-cond`]; return n })
                            } else {
                              try {
                                JSON.parse(val)
                                setJsonErrors(prev => { const n = { ...prev }; delete n[`${ci}-cond`]; return n })
                              } catch (err) {
                                setJsonErrors(prev => ({ ...prev, [`${ci}-cond`]: true }))
                              }
                            }
                          }}
                          placeholder='如: {"has_umbrella":true}' 
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>执行效果 (Effects JSON)</span>
                          {jsonErrors[`${ci}-eff`] && <span style={{ fontSize: 9, color: theme.primary }}>格式错</span>}
                        </div>
                        <input 
                          style={{ ...inputStyle, fontSize: 12, padding: '6px 8px', borderColor: jsonErrors[`${ci}-eff`] ? theme.primary : 'rgba(255,255,255,0.08)' }} 
                          value={typeof choice.effects === 'object' ? JSON.stringify(choice.effects) : choice.effects || ''} 
                          onChange={e => {
                            const val = e.target.value
                            updateChoiceDetail(ci, 'effects', val)
                            if (val.trim() === '') {
                              setJsonErrors(prev => { const n = { ...prev }; delete n[`${ci}-eff`]; return n })
                            } else {
                              try {
                                JSON.parse(val)
                                setJsonErrors(prev => { const n = { ...prev }; delete n[`${ci}-eff`]; return n })
                              } catch (err) {
                                setJsonErrors(prev => ({ ...prev, [`${ci}-eff`]: true }))
                              }
                            }
                          }}
                          placeholder='如: {"is_delayed":true}' 
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, color: theme.textMuted, marginBottom: 2 }}>死亡率修饰器 (Modifiers JSON Array)</span>
                          {jsonErrors[`${ci}-mod`] && <span style={{ fontSize: 9, color: theme.primary }}>格式错</span>}
                        </div>
                        <input 
                          style={{ ...inputStyle, fontSize: 12, padding: '6px 8px', borderColor: jsonErrors[`${ci}-mod`] ? theme.primary : 'rgba(255,255,255,0.08)' }} 
                          value={typeof choice.modifiers === 'object' ? JSON.stringify(choice.modifiers) : choice.modifiers || ''} 
                          onChange={e => {
                            const val = e.target.value
                            updateChoiceDetail(ci, 'modifiers', val)
                            if (val.trim() === '') {
                              setJsonErrors(prev => { const n = { ...prev }; delete n[`${ci}-mod`]; return n })
                            } else {
                              try {
                                JSON.parse(val)
                                setJsonErrors(prev => { const n = { ...prev }; delete n[`${ci}-mod`]; return n })
                              } catch (err) {
                                setJsonErrors(prev => ({ ...prev, [`${ci}-mod`]: true }))
                              }
                            }
                          }}
                          placeholder='如: [{"word":"雨伞","adj":-0.1}]' 
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 抽屉底部危险区 */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255, 71, 87, 0.02)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button 
            onClick={() => handleDeleteNode(activeNodeId)}
            style={{
              width: '100%',
              background: 'rgba(255,71,87,0.1)',
              color: '#ff4757',
              border: '1px solid rgba(255,71,87,0.25)',
              padding: '10px 0',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,71,87,0.18)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,71,87,0.1)' }}
          >
            🗑️ 彻底删除该剧情节点
          </button>
        </div>
      </div>
    )
  }

  // 游戏内预览渲染
  function renderPreview() {
    if (!previewMode) return null
    // 组装当前节点
    const currentNodesObj = {}
    nodes.forEach(n => {
      currentNodesObj[n.id] = {
        description: n.data.description,
        choices: n.data.choices,
        hints: chain.nodes[n.id]?.hints || []
      }
    })

    const node = currentNodesObj[previewState.currentNodeId]
    if (!node && !previewState.finished) {
      return (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(10, 11, 16, 0.95)', color: '#e0e0e0', zIndex: 9999,
          padding: 40, overflow: 'auto', fontFamily: 'system-ui, sans-serif',
          backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ textAlign: 'center', padding: 60, fontSize: 18, color: theme.primary }}>⚠️ 数据异常：找不到当前起始节点 [{previewState.currentNodeId}]</div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setPreviewMode(false)} style={{
              background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 36px',
              borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 600
            }}>退出预览</button>
          </div>
        </div>
      )
    }

    function getFilteredChoices(node) {
      if (!node || !node.choices) return []
      return node.choices.filter(c => {
        const conds = typeof c.conditions === 'string' ? parseField(c.conditions) : c.conditions || {}
        return checkConditions(conds, previewState.flags)
      })
    }

    function handlePreviewChoice(choice) {
      const finalRate = calculateRate(choice, node.description)
      const died = Math.random() < finalRate

      if (died) {
        setPreviewState(prev => ({
          ...prev,
          finished: true,
          success: false,
          result: '💀 判定失败: ' + (choice.deathCause || '遭遇未知死亡')
        }))
        return
      }

      const eff = typeof choice.effects === 'string' ? parseField(choice.effects) : choice.effects || {}
      const newFlags = { ...previewState.flags, ...eff }
      const newHistory = [...previewState.history, {
        node: previewState.currentNodeId,
        choice: choice.id,
        flags: newFlags
      }]

      if (choice.isSuccess) {
        setPreviewState(prev => ({
          ...prev,
          finished: true,
          success: true,
          flags: newFlags,
          history: newHistory,
          result: '🎉 任务成功达成！顺利活过了这一天。'
        }))
      } else if (choice.nextNode && currentNodesObj[choice.nextNode]) {
        setPreviewState(prev => ({
          ...prev,
          currentNodeId: choice.nextNode,
          flags: newFlags,
          history: newHistory
        }))
      } else {
        setPreviewState(prev => ({
          ...prev,
          finished: true,
          success: true,
          flags: newFlags,
          history: newHistory,
          result: '🎉 任务通关！顺利活过了这一天。'
        }))
      }
    }

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(10, 11, 16, 0.96)', color: '#e0e0e0', zIndex: 9999,
        padding: '60px 40px', overflow: 'auto', fontFamily: 'system-ui, sans-serif',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ color: theme.primary, marginBottom: 16, fontSize: 24, fontWeight: 'bold', textShadow: '0 0 15px rgba(255,71,87,0.3)' }}>🎮 实时沙盒预览 - {chain.name}</h2>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 13, border: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div>📍 当前节点: <strong style={{ color: '#fff' }}>{previewState.currentNodeId}</strong></div>
            <div>🎒 Flags 状态: <strong style={{ color: theme.warning }}>{JSON.stringify(previewState.flags)}</strong></div>
            <div>⏱️ 已选步骤数: <strong style={{ color: theme.secondary }}>{previewState.history.length}</strong></div>
          </div>

          {!previewState.finished && node ? (
            <>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, marginBottom: 24, fontSize: 16, lineHeight: 1.8, whiteSpace: 'pre-wrap', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                {node.description}
              </div>
              <div>
                <h3 style={{ color: theme.warning, marginBottom: 16, fontSize: 16, fontWeight: 600 }}>👉 请做出抉择：</h3>
                {getFilteredChoices(node).length === 0 && (
                  <div style={{ color: '#a0a0a0', fontSize: 14, padding: 30, textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>没有可用的选项（触发条件未满足）</div>
                )}
                {getFilteredChoices(node).map((c, i) => {
                  const parsedMods = typeof c.modifiers === 'string' ? parseField(c.modifiers) : c.modifiers || []
                  const rate = calculateRate({ ...c, modifiers: parsedMods }, node.description)
                  const rateText = '☠️ 实时死亡率: ' + Math.round(rate * 100) + '%'
                  const isHighRisk = rate >= 0.35
                  return (
                    <div
                      key={c.id || i}
                      onClick={() => handlePreviewChoice(c)}
                      style={{
                        background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px 20px',
                        marginBottom: 12, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.borderColor = isHighRisk ? 'rgba(255,71,87,0.3)' : 'rgba(46,213,115,0.3)'
                        e.currentTarget.style.boxShadow = isHighRisk ? '0 0 12px rgba(255,71,87,0.15)' : '0 0 12px rgba(46,213,115,0.15)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div style={{ fontSize: 16, marginBottom: 6, fontWeight: 500, color: '#fff' }}>{c.text}</div>
                      <div style={{ fontSize: 12, color: isHighRisk ? theme.primary : theme.textMuted, fontWeight: 600 }}>{rateText}</div>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: 40 }}>
                <button onClick={() => setPreviewMode(false)} style={{
                  background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 30px',
                  borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600
                }}>退出预览</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 40px', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: 72, marginBottom: 24, textShadow: previewState.success ? '0 0 20px rgba(46,213,115,0.3)' : '0 0 20px rgba(255,71,87,0.3)' }}>{previewState.success ? '🎉' : '💀'}</div>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: previewState.success ? theme.secondary : theme.primary, marginBottom: 20, letterSpacing: '1px' }}>
                {previewState.success ? '任务顺利达成！' : '不幸惨死...'}
              </div>
              <div style={{ fontSize: 16, color: '#fff', marginBottom: 30, background: 'rgba(255,255,255,0.04)', padding: '14px 20px', borderRadius: 8, display: 'inline-block', border: '1px solid rgba(255,255,255,0.05)' }}>{previewState.result}</div>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 20, marginBottom: 30, fontSize: 13, textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ marginBottom: 12, color: theme.warning, fontWeight: 'bold', fontSize: 14 }}>🎒 Flags 变更历程：</div>
                {previewState.history.length === 0 && (
                  <div style={{ color: '#666' }}>无</div>
                )}
                {previewState.history.map((h, i) => (
                  <div key={i} style={{ marginBottom: 6, paddingBottom: 6, borderBottom: i < previewState.history.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', color: '#ccc' }}>
                    步骤 {i+1}: 选择选项 <code style={{ color: '#ffe66d', background: 'rgba(255,255,255,0.05)', padding: '1px 5px', borderRadius: 4 }}>{h.choice}</code> → 产生 Flags: <code style={{ color: '#4ecdc4' }}>{JSON.stringify(h.flags)}</code>
                  </div>
                ))}
              </div>
              <button onClick={() => setPreviewMode(false)} style={{
                background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', border: 'none', padding: '12px 40px',
                borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 'bold', boxShadow: '0 4px 15px rgba(255,71,87,0.3)'
              }}>退出预览</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!chain) {
    return <div style={{ textAlign: 'center', padding: 60, color: theme.textMuted }}>🛸 加载数据中...</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', position: 'relative', overflow: 'hidden', margin: '-30px' }}>
      
      {/* 顶部控制栏 */}
      <div style={{
        background: 'rgba(17, 18, 27, 0.8)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.1)', margin: 0 }}>
            {id === 'new' ? '✨ 新建剧情画布' : `📝 剧情连线编辑器 - ${chain.name}`}
          </h1>
          <span style={{ fontSize: 12, color: theme.textMuted }}>
            ({nodes.length} 个节点, {edges.length} 条分支连线)
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={handleAddNode}
            style={{ 
              background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', 
              color: '#fff', 
              border: 'none', 
              padding: '8px 18px', 
              borderRadius: 8, 
              cursor: 'pointer', 
              fontSize: 13, 
              fontWeight: 700, 
              boxShadow: '0 4px 12px rgba(255,71,87,0.2)' 
            }}
          >
            ✨ 新增剧情卡片
          </button>
          
          <button 
            onClick={handleAutoLayout}
            style={{ 
              background: 'rgba(255,255,255,0.06)', 
              color: '#e0e0e0', 
              border: '1px solid rgba(255,255,255,0.1)', 
              padding: '8px 16px', 
              borderRadius: 8, 
              cursor: 'pointer', 
              fontSize: 13, 
              fontWeight: 600 
            }}
          >
            🧭 自动排列对齐
          </button>

          <button 
            onClick={startPreview}
            style={{ 
              background: 'linear-gradient(135deg, #ffa502, #ffe66d)', 
              color: '#1a1a2e', 
              border: 'none', 
              padding: '8px 18px', 
              borderRadius: 8, 
              cursor: 'pointer', 
              fontSize: 13, 
              fontWeight: 700, 
              boxShadow: '0 4px 12px rgba(255,165,2,0.2)' 
            }}
          >
            🎮 沙盒预览
          </button>
          
          <button 
            onClick={() => navigate('/chains')}
            style={{ 
              background: 'rgba(255,255,255,0.08)', 
              color: '#e0e0e0', 
              border: 'none', 
              padding: '8px 18px', 
              borderRadius: 8, 
              cursor: 'pointer', 
              fontSize: 13, 
              fontWeight: 500 
            }}
          >
            返回列表
          </button>
          
          <button 
            onClick={save} 
            disabled={saving}
            style={{ 
              background: saving ? '#ccc' : 'linear-gradient(135deg, #2ed573, #20bf6b)', 
              color: '#fff', 
              border: 'none', 
              padding: '8px 24px', 
              borderRadius: 8, 
              cursor: saving ? 'not-allowed' : 'pointer', 
              fontSize: 13, 
              fontWeight: 700, 
              boxShadow: '0 4px 12px rgba(46,213,115,0.2)' 
            }}
          >
            {saving ? '保存中...' : '💾 保存修改'}
          </button>
        </div>
      </div>

      {renderPreview()}

      {/* 主视图区域：左悬浮属性，中画布，右侧详情抽屉 */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', overflow: 'hidden' }}>
        
        {/* 左悬浮：任务链基础属性面板 */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: basicInfoExpanded ? 280 : 48,
          background: 'rgba(16, 20, 31, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: basicInfoExpanded ? '18px 20px' : '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          zIndex: 10,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          color: theme.textMain,
          maxHeight: 'calc(100% - 40px)',
          overflowY: basicInfoExpanded ? 'auto' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: basicInfoExpanded ? 16 : 0 }}>
            <span style={{ fontSize: 14, fontWeight: 'bold', display: basicInfoExpanded ? 'block' : 'none' }}>ℹ️ 任务基本信息</span>
            <button 
              onClick={() => setBasicInfoExpanded(!basicInfoExpanded)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: 4,
                width: '100%',
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12
              }}
            >
              {basicInfoExpanded ? '◀ 收起' : 'ℹ️'}
            </button>
          </div>

          {basicInfoExpanded && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <div style={{ ...labelStyle, fontSize: 11 }}>任务链 ID</div>
                <input 
                  style={{ ...inputStyle, padding: '8px 12px', fontSize: 13 }} 
                  value={chain.id} 
                  onChange={e => setChain({ ...chain, id: e.target.value })}
                  placeholder="例如: go_to_school" 
                  disabled={id !== 'new'} 
                />
              </div>

              <div>
                <div style={{ ...labelStyle, fontSize: 11 }}>名称</div>
                <input 
                  style={{ ...inputStyle, padding: '8px 12px', fontSize: 13 }} 
                  value={chain.name} 
                  onChange={e => setChain({ ...chain, name: e.target.value })} 
                  placeholder="剧情线名称" 
                />
              </div>

              <div>
                <div style={{ ...labelStyle, fontSize: 11 }}>描述</div>
                <textarea 
                  style={{ ...inputStyle, padding: '8px 12px', fontSize: 13, resize: 'vertical', minHeight: 48 }} 
                  value={chain.description} 
                  onChange={e => setChain({ ...chain, description: e.target.value })} 
                  placeholder="详细发生背景" 
                />
              </div>

              <div>
                <div style={{ ...labelStyle, fontSize: 11 }}>所属角色</div>
                <select 
                  style={{ ...inputStyle, padding: '8px 12px', fontSize: 13, cursor: 'pointer' }} 
                  value={chain.characterId} 
                  onChange={e => setChain({ ...chain, characterId: e.target.value })}
                >
                  <option value="" style={{ background: '#1e2439' }}>请选择角色</option>
                  {characters.map(c => <option key={c.id} value={c.id} style={{ background: '#1e2439' }}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <div style={{ ...labelStyle, fontSize: 11 }}>🚩 起始节点 ID</div>
                <select 
                  style={{ ...inputStyle, padding: '8px 12px', fontSize: 13, cursor: 'pointer' }} 
                  value={chain.startNode} 
                  onChange={e => handleStartNodeChange(e.target.value)}
                >
                  <option value="" style={{ background: '#1e2439' }}>未设置</option>
                  {nodes.map(n => <option key={n.id} value={n.id} style={{ background: '#1e2439' }}>{n.id}</option>)}
                </select>
              </div>

              <div>
                <div style={{ ...labelStyle, fontSize: 11 }}>初始化 Flags (逗号隔开)</div>
                <input 
                  style={{ ...inputStyle, padding: '8px 12px', fontSize: 13 }} 
                  value={(chain.flags || []).join(', ')} 
                  onChange={e => setChain({ ...chain, flags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
                  placeholder="如: has_umbrella" 
                />
              </div>
            </div>
          )}
        </div>

        {/* 中央 React Flow 剧情画布 */}
        <div style={{ flex: 1, height: '100%' }} id="cyberflow-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onPaneClick={() => setActiveNodeId(null)}
            onNodeClick={(e, node) => setActiveNodeId(node.id)}
            fitView
            style={{ background: '#090a0f' }}
          >
            <Background color="#ff4757" gap={18} size={1} variant="dots" style={{ opacity: 0.12 }} />
            <Controls style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fill: '#fff' }} />
          </ReactFlow>
        </div>

        {/* 右侧悬浮毛玻璃属性编辑抽屉 */}
        {renderNodeDrawer()}

      </div>
    </div>
  )
}

function App() {
  const [syncStatus, setSyncStatus] = useState('checking') // 'synced', 'dirty', 'checking', 'error'

  useEffect(() => {
    initDataIfEmpty()
    checkSyncStatus()
  }, [])

  async function checkSyncStatus() {
    setSyncStatus('checking')
    const local = await fetchLocalData()
    if (!local) {
      setSyncStatus('error')
      return
    }
    const current = loadData()
    // 对比 localStorage 中的数据与本地文件是否一致
    const isMatch = JSON.stringify(local.characters) === JSON.stringify(current.characters) &&
                    JSON.stringify(local.chains) === JSON.stringify(current.chains)
    setSyncStatus(isMatch ? 'synced' : 'dirty')
  }

  async function handlePull() {
    if (!confirm('【警告】从本地项目拉取最新数据将覆盖当前浏览器中的未发布修改（草稿）。是否确认拉取？')) return
    setSyncStatus('checking')
    const data = await fetchLocalData()
    if (data) {
      saveData(data)
      alert('🎉 已成功拉取小程序本地数据，并覆盖浏览器草稿！')
      window.location.reload()
    } else {
      alert('❌ 拉取本地数据失败，请确认 Vite 服务器是否正常运行。')
      setSyncStatus('error')
    }
  }

  async function handlePush() {
    if (!confirm('【发布】确定将浏览器当前的修改一键保存到小程序本地文件中吗？这将直接改变游戏数据。')) return
    setSyncStatus('checking')
    const current = loadData()
    const success = await saveLocalData(current)
    if (success) {
      alert('🚀 数据已成功同步并发布到本地小程序 data 目录！')
      setSyncStatus('synced')
      window.location.reload()
    } else {
      alert('❌ 发布失败，请确认后端 API 运行状况。')
      setSyncStatus('error')
    }
  }

  function renderStatusBadge() {
    switch (syncStatus) {
      case 'synced':
        return <span style={{ color: '#4ecdc4', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, background: '#4ecdc4', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #4ecdc4' }}></span> 双端已同步</span>
      case 'dirty':
        return <span style={{ color: '#ffe66d', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, background: '#ffe66d', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #ffe66d' }}></span> 草稿未发布</span>
      case 'error':
        return <span style={{ color: '#ff6b6b', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, background: '#ff6b6b', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #ff6b6b' }}></span> 连接失败</span>
      case 'checking':
      default:
        return <span style={{ color: '#a0a0a0', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, background: '#a0a0a0', borderRadius: '50%', display: 'inline-block' }}></span> 检查状态中...</span>
    }
  }

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
        <nav style={{ width: 220, background: '#1a1a2e', color: '#e0e0e0', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box' }}>
          <div>
            <h2 style={{ color: '#ff6b6b', marginBottom: 30, textShadow: '0 0 10px rgba(255,107,107,0.3)', fontSize: 20, fontWeight: 'bold' }}>活过今天 后台</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <NavLink to="/characters" style={({ isActive }) => ({ color: isActive ? '#ff6b6b' : '#a0a0a0', textDecoration: 'none', padding: '10px 14px', borderRadius: 8, background: isActive ? 'rgba(255,107,107,0.1)' : 'transparent', fontWeight: 500, fontSize: 14 })}>角色管理</NavLink>
              <NavLink to="/chains" style={({ isActive }) => ({ color: isActive ? '#ff6b6b' : '#a0a0a0', textDecoration: 'none', padding: '10px 14px', borderRadius: 8, background: isActive ? 'rgba(255,107,107,0.1)' : 'transparent', fontWeight: 500, fontSize: 14 })}>任务链管理</NavLink>
            </div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 14, border: '1px solid rgba(255,255,255,0.06)', marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>数据同步中枢</div>
            <div style={{ marginBottom: 12 }}>{renderStatusBadge()}</div>
            <div style={{ display: 'grid', gap: 8 }}>
              <button onClick={handlePull} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', padding: '8px', borderRadius: 6, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 500 }}>
                🔄 从小程序加载
              </button>
              <button onClick={handlePush} style={{ background: 'linear-gradient(135deg, #ff6b6b, #ee5a5a)', color: '#fff', border: 'none', padding: '8px', borderRadius: 6, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 'bold', boxShadow: '0 4px 12px rgba(255,107,107,0.2)' }}>
                💾 一键发布项目
              </button>
            </div>
          </div>
        </nav>
        <main style={{ flex: 1, background: theme.mainBg, padding: 30, boxSizing: 'border-box', overflowY: 'auto' }}>
          <Routes>
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/chains" element={<ChainsPage />} />
            <Route path="/chains/:id" element={<ChainEditorPage />} />
            <Route path="*" element={<CharactersPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

