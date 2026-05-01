import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I'm <span className="gradient-text">Dharun Kumar</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            Computer Science Student | AI Enthusiast | Data Analytics | Software Developer
          </p>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Passionate about solving real-world problems using AI, data analytics, and modern software development. 
          Building intelligent systems that make an impact.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#projects" className="btn-primary flex items-center gap-2">
            View My Work <ArrowDown size={18} />
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
          <a href="https://drive.google.com/file/d/11XQHONB-S9w1q7ob4o1pJEYM6ymfAs93/view?usp=sharing" download className="btn-outline flex items-center gap-2">
            <Download size={18} /> Resume
          </a>
        </div>

        <div className="flex justify-center gap-6 pt-4">
          <a href="https://github.com/DharunKumarS-code" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/dharun-kumar-8504a4290" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110">
            <Linkedin size={24} />
          </a>
          <a href="mailto:sdharun7010@gmail.com" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}
