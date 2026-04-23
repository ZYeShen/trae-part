import React, { useState } from 'react';
import { CheckCircle2, Target, Heart } from 'lucide-react';

// 模拟 AI 计划生成
const generateAIPlan = (_goal: string) => {
  const plans = [
    {
      level: 1,
      tasks: [
        '每天早上起床后喝一杯水',
        '每天运动 10 分钟',
        '每天阅读 15 分钟'
      ],
      duration: '7 天'
    },
    {
      level: 2,
      tasks: [
        '每天早上起床后喝一杯水',
        '每天运动 20 分钟',
        '每天阅读 30 分钟',
        '每天写一篇日记'
      ],
      duration: '14 天'
    },
    {
      level: 3,
      tasks: [
        '每天早上起床后喝一杯水',
        '每天运动 30 分钟',
        '每天阅读 45 分钟',
        '每天写一篇日记',
        '每天冥想 10 分钟'
      ],
      duration: '21 天'
    }
  ];
  return plans;
};

// 模拟 AI 安慰语
const generateAIComfort = (task: string) => {
  const comforts = [
    `没关系，${task} 今天没完成也没关系，明天再试试，你已经很棒了！`,
    `不要自责，偶尔的休息是为了更好地前进，明天继续加油！`,
    `每一次尝试都是进步，今天的你已经比昨天更接近目标了！`,
    `休息一下，调整状态，明天你会做得更好的！`,
    `完成不是最重要的，重要的是你一直在努力，这就足够了！`
  ];
  return comforts[Math.floor(Math.random() * comforts.length)];
};

const App: React.FC = () => {
  // 状态管理
  const [activeTab, setActiveTab] = useState<'checkin' | 'plan' | 'comfort'>('checkin');
  const [tasks, setTasks] = useState<{ id: string; name: string; completed: boolean }[]>([
    { id: '1', name: '早上起床后喝一杯水', completed: false },
    { id: '2', name: '每天运动 10 分钟', completed: false },
    { id: '3', name: '每天阅读 15 分钟', completed: false }
  ]);
  const [mood, setMood] = useState('');
  const [goal, setGoal] = useState('');
  const [aiPlan, setAiPlan] = useState<any[]>([]);
  const [showComfort, setShowComfort] = useState(false);
  const [comfortMessage, setComfortMessage] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  // 处理任务完成状态切换
  const handleTaskToggle = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 处理提交打卡
  const handleCheckinSubmit = () => {
    // 这里可以添加打卡逻辑，比如保存到本地存储或发送到服务器
    console.log('打卡提交:', { tasks, mood });
    // 重置状态
    setMood('');
  };

  // 处理生成 AI 计划
  const handleGeneratePlan = () => {
    if (goal) {
      const plan = generateAIPlan(goal);
      setAiPlan(plan);
    }
  };

  // 处理触发 AI 安慰
  const handleTriggerComfort = (taskName: string) => {
    const message = generateAIComfort(taskName);
    setComfortMessage(message);
    setSelectedTask(taskName);
    setShowComfort(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 头部导航 */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="nav-logo">命书</div>
            <div className="nav-links">
              <a href="#" className="nav-link" onClick={() => setActiveTab('checkin')}>打卡</a>
              <a href="#" className="nav-link" onClick={() => setActiveTab('plan')}>AI 计划</a>
              <a href="#" className="nav-link" onClick={() => setActiveTab('comfort')}>AI 安慰</a>
            </div>
          </nav>
        </div>
      </header>

      {/* 主内容 */}
      <main className="container section">
        {/* 打卡页面 */}
        {activeTab === 'checkin' && (
          <div className="animate-fade-in">
            <h1 className="section-title text-center">每日打卡</h1>
            <div className="card">
              <h2 className="section-subtitle mb-4">今日任务</h2>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id={`task-${task.id}`}
                        className="checkbox"
                        checked={task.completed}
                        onChange={() => handleTaskToggle(task.id)}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`${task.completed ? 'line-through text-muted' : ''}`}
                      >
                        {task.name}
                      </label>
                    </div>
                    {!task.completed && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleTriggerComfort(task.name)}
                      >
                        没完成？
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <label htmlFor="mood" className="block mb-2 font-medium">今日心情</label>
                <textarea
                  id="mood"
                  className="textarea"
                  placeholder="分享一下今天的心情..."
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                ></textarea>
              </div>
              
              <button
                className="btn btn-primary w-full mt-6"
                onClick={handleCheckinSubmit}
              >
                提交打卡
              </button>
            </div>
          </div>
        )}

        {/* AI 计划生成页面 */}
        {activeTab === 'plan' && (
          <div className="animate-fade-in">
            <h1 className="section-title text-center">AI 计划生成</h1>
            <div className="card">
              <div className="mb-6">
                <label htmlFor="goal" className="block mb-2 font-medium">你的目标</label>
                <input
                  id="goal"
                  className="input"
                  placeholder="例如：坚持运动、养成阅读习惯..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>
              
              <button
                className="btn btn-primary w-full"
                onClick={handleGeneratePlan}
              >
                生成计划
              </button>
              
              {aiPlan.length > 0 && (
                <div className="mt-6">
                  <h2 className="section-subtitle mb-4">你的专属计划</h2>
                  <div className="space-y-4">
                    {aiPlan.map((plan, index) => (
                      <div key={index} className="card">
                        <h3 className="font-medium mb-2">Level {plan.level} ({plan.duration})</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {plan.tasks.map((task: string, taskIndex: number) => (
                            <li key={taskIndex}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI 安慰页面 */}
        {activeTab === 'comfort' && (
          <div className="animate-fade-in">
            <h1 className="section-title text-center">AI 安慰</h1>
            <div className="card text-center">
              <div className="mb-6">
                <Heart className="w-16 h-16 mx-auto text-primary mb-4" />
                <p className="text-lg">当你没完成任务时，这里有温暖的安慰</p>
              </div>
              
              <div className="space-y-4">
                {tasks.map(task => (
                  <button
                    key={task.id}
                    className="btn btn-secondary w-full"
                    onClick={() => handleTriggerComfort(task.name)}
                  >
                    我没完成：{task.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI 安慰弹窗 */}
      {showComfort && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card w-full max-w-md animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">AI 安慰</h3>
              <button
                onClick={() => setShowComfort(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <div className="mb-6">
              <p className="text-lg mb-4">关于任务：{selectedTask}</p>
              <p className="text-center text-lg italic">{comfortMessage}</p>
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={() => setShowComfort(false)}
            >
              我明白了
            </button>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card shadow-md py-4">
        <div className="container">
          <div className="flex justify-around">
            <button
              className={`flex flex-col items-center gap-1 ${activeTab === 'checkin' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('checkin')}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-sm">打卡</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 ${activeTab === 'plan' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('plan')}
            >
              <Target className="w-6 h-6" />
              <span className="text-sm">计划</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 ${activeTab === 'comfort' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('comfort')}
            >
              <Heart className="w-6 h-6" />
              <span className="text-sm">安慰</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;