# Claude Code 开发指南

本项目使用 Claude Code 进行开发，配置了多个专业 skills 以提升开发效率和代码质量。

## 项目技术栈

- **框架**: Next.js 15+ (App Router)
- **UI**: React 19 + Tailwind CSS v4
- **语言**: TypeScript
- **样式**: CSS-first configuration (Tailwind v4)

## 开发规范

### 自动使用的 Skills

以下 skills 会在相关开发场景中自动触发，无需手动调用：

#### 1. Next.js 最佳实践 (`next-best-practices`)
**触发场景**: 编写或审查 Next.js 代码时自动应用

涵盖内容：
- 文件约定与项目结构
- RSC (React Server Components) 边界检测
- 异步 API 模式 (Next.js 15+)
- 数据获取模式与性能优化
- 错误处理与路由处理
- 图片、字体、元数据优化
- 打包与自托管配置

#### 2. React 组合模式 (`vercel-composition-patterns`)
**触发场景**: 重构组件、构建组件库、设计组件 API 时

核心原则：
- 避免布尔属性泛滥，使用组合模式
- 复合组件 (Compound Components) 架构
- 状态提升与上下文接口设计
- React 19 API 变更 (不使用 `forwardRef`，使用 `use()` 替代 `useContext()`)

#### 3. Tailwind 设计系统 (`tailwind-design-system`)
**触发场景**: 创建组件库、实现设计系统、标准化 UI 模式时

关键特性：
- Tailwind CSS v4 CSS-first 配置
- 设计令牌 (Design Tokens) 与主题化
- 使用 OKLCH 色彩空间
- CVA (Class Variance Authority) 组件变体
- 原生 CSS 动画与暗黑模式
- 响应式网格系统

#### 4. 前端设计 (`frontend-design`)
**触发场景**: 构建 Web 组件、页面、应用或美化 UI 时

设计原则：
- 避免通用 AI 美学 (不使用 Inter、Roboto、Arial 等常见字体)
- 选择独特的字体组合
- 大胆的美学方向 (极简、极繁、复古未来、有机自然等)
- 创意布局与空间构图
- 高质量动画与微交互
- 背景纹理与视觉细节

#### 5. Web 界面指南审查 (`web-design-guidelines`)
**触发场景**: 审查 UI 代码、检查可访问性、审计设计时

功能：
- 从 Vercel Web Interface Guidelines 获取最新规范
- 检查文件是否符合最佳实践
- 输出 `file:line` 格式的发现

#### 6. MCP 服务器构建 (`mcp-builder`)
**触发场景**: 构建 MCP (Model Context Protocol) 服务器时

适用于：
- 创建 LLM 与外部服务的集成
- TypeScript (推荐) 或 Python 实现
- 工具设计、错误处理、评估创建

## 开发工作流

### 功能开发流程

1. **规划阶段**: 使用 `superpowers:brainstorming` 探索需求
2. **计划编写**: 使用 `superpowers:writing-plans` 制定实现计划
3. **TDD 开发**: 使用 `superpowers:test-driven-development` 先写测试
4. **执行计划**: 使用 `superpowers:executing-plans` 执行实现
5. **验证完成**: 使用 `superpowers:verification-before-completion` 验证
6. **代码审查**: 使用 `superpowers:requesting-code-review` 请求审查

### Bug 修复流程

1. **系统化调试**: 使用 `superpowers:systematic-debugging`
2. **修复实现**: 遵循 Next.js 和 React 最佳实践
3. **验证修复**: 运行测试并验证

### 并行任务处理

当有 2 个以上独立任务时：
- 使用 `superpowers:dispatching-parallel-agents` 并行派发
- 或使用 `superpowers:subagent-driven-development` 在当前会话中执行

## 代码规范

### Next.js 15+ 特定规范

```typescript
// ✅ 正确: 异步 params 和 searchParams (Next.js 15+)
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ query?: string }>
}) {
  const { id } = await params
  const { query } = await searchParams
  // ...
}

// ✅ 正确: 异步 cookies 和 headers
import { cookies, headers } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const headersList = await headers()
  // ...
}
```

### React 19 特定规范

```typescript
// ✅ 正确: ref 作为普通 prop (React 19)
export function Button({
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return <button ref={ref} {...props} />
}

// ❌ 错误: 不要使用 forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} {...props} />
})

// ✅ 正确: 使用 use() 替代 useContext()
import { use } from 'react'

function Component() {
  const theme = use(ThemeContext)
  // ...
}
```

### Tailwind v4 规范

```css
/* ✅ 正确: 使用 @theme 定义设计令牌 */
@import "tailwindcss";

@theme {
  --color-primary: oklch(45% 0.2 260);
  --color-secondary: oklch(65% 0.15 200);

  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}

/* ✅ 正确: 使用 @custom-variant 定义暗黑模式 */
@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-primary: oklch(98% 0.01 264);
}
```

```typescript
// ✅ 正确: 使用 size-* 简写
<div className="size-10" /> // 替代 w-10 h-10

// ✅ 正确: 使用语义化令牌
<div className="bg-primary text-primary-foreground" />

// ❌ 错误: 不要硬编码颜色
<div className="bg-blue-500 text-white" />
```

### 组合模式规范

```typescript
// ✅ 正确: 使用组合而非布尔属性
<Button variant="destructive" size="lg">Delete</Button>

// ❌ 错误: 避免布尔属性泛滥
<Button isDestructive isLarge>Delete</Button>

// ✅ 正确: 复合组件模式
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ 错误: 通过 props 传递所有内容
<Card title="Title" content="Content" />
```

## 设计原则

### 字体选择
- **避免**: Inter, Roboto, Arial, Space Grotesk (过度使用)
- **推荐**: 独特的展示字体 + 精致的正文字体组合
- 每个项目选择不同的字体，避免收敛到常见选择

### 色彩系统
- 使用 OKLCH 色彩空间以获得更好的感知均匀性
- 定义语义化令牌: `primary`, `secondary`, `muted`, `accent`, `destructive`
- 支持暗黑模式，测试两种主题

### 动画与交互
- 优先使用 CSS 动画
- React 项目使用 Motion 库
- 关注高影响时刻: 页面加载、悬停状态、滚动触发
- 使用 `animation-delay` 创建交错显示效果

### 布局与构图
- 尝试非对称布局
- 使用重叠、对角线流动、打破网格的元素
- 慷慨的负空间或受控的密度

## 工具与命令

### 常用 Skills 调用

```bash
# 审查 UI 代码
/web-design-guidelines src/components/**/*.tsx

# 简化代码
/simplify

# 配置更新
/update-config

# 循环执行任务
/loop 5m /check-build
```

### 开发命令

```bash
# 开发服务器
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# Lint
npm run lint
```

## 注意事项

1. **不要过度工程化**: 只做直接请求或明确必要的更改
2. **保持简单**: 三行相似代码优于过早抽象
3. **避免向后兼容性 hack**: 如果确定未使用，直接删除
4. **安全优先**: 注意命令注入、XSS、SQL 注入等 OWASP Top 10 漏洞
5. **可访问性**: 添加 ARIA 属性、焦点状态、键盘导航支持

## 资源链接

- [Next.js 文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev)
- [Tailwind CSS v4 文档](https://tailwindcss.com/docs)
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)
- [MCP 协议文档](https://modelcontextprotocol.io)
