import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// 解析 module.exports 文件的沙箱函数
function loadModuleExports(filePath) {
  if (!fs.existsSync(filePath)) {
    return null
  }
  const content = fs.readFileSync(filePath, 'utf8')
  try {
    // 构造容器执行 CommonJS 的 module.exports 赋值语句并返回
    const sandbox = new Function('const module = { exports: {} }; ' + content + '; return module.exports;')
    return sandbox()
  } catch (e) {
    console.error('加载文件失败:', filePath, e)
    return null
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sync-game-data-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const charPath = path.resolve(process.cwd(), '../data/characters.js')
          const chainsPath = path.resolve(process.cwd(), '../data/chains.js')

          if (req.url === '/api/load' && req.method === 'GET') {
            try {
              const characters = loadModuleExports(charPath) || []
              const chains = loadModuleExports(chainsPath) || {}
              
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
              res.end(JSON.stringify({ success: true, data: { characters, chains } }))
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          } else if (req.url === '/api/save' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                const { characters, chains } = JSON.parse(body)

                if (characters) {
                  const content = `module.exports = ${JSON.stringify(characters, null, 2)}\n`
                  fs.writeFileSync(charPath, content, 'utf8')
                }

                if (chains) {
                  const content = `module.exports = ${JSON.stringify(chains, null, 2)}\n`
                  fs.writeFileSync(chainsPath, content, 'utf8')
                }

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
                res.end(JSON.stringify({ success: true, message: '同步至本地小程序 data 目录成功！' }))
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: false, error: err.message }))
              }
            })
          } else {
            next()
          }
        })
      }
    }
  ],
})
